はい、DynamoDB実装のための手順を作成します。



# DynamoDB実装手順書

## 1. AWS設定
1. AWSコンソールでの作業
```
1. IAMユーザーの作成
   - ユーザー名: stamp-rally-app
   - アクセス種類: プログラムによるアクセス
   - 権限: AmazonDynamoDBFullAccess

2. 認証情報の保存
   - Access key ID
   - Secret access key
```

2. DynamoDBテーブルの作成
```
1. FacilitiesTable
   - テーブル名: stamp-rally-facilities
   - パーティションキー: id (String)
   - GSI (グローバルセカンダリインデックス):
     - インデックス名: prefecture-index
     - パーティションキー: prefecture (String)

2. UserStampsTable
   - テーブル名: stamp-rally-user-stamps
   - パーティションキー: userId (String)
   - ソートキー: facilityId (String)
```

## 2. 環境変数の設定
`.env.local`ファイルの作成：
```env
# AWS Configuration
AWS_REGION=ap-northeast-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key

# DynamoDB
DYNAMODB_FACILITIES_TABLE=stamp-rally-facilities
DYNAMODB_USER_STAMPS_TABLE=stamp-rally-user-stamps

# Application Settings
NEXT_PUBLIC_DEFAULT_RADIUS=50
```

## 3. 必要なパッケージのインストール
```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

## 4. DynamoDBクライアントの実装
`src/lib/dynamodb.js`:
```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { 
  DynamoDBDocumentClient, 
  GetCommand, 
  PutCommand, 
  QueryCommand,
  ScanCommand 
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const docClient = DynamoDBDocumentClient.from(client);

// 施設関連
export async function getFacility(facilityId) {
  const command = new GetCommand({
    TableName: process.env.DYNAMODB_FACILITIES_TABLE,
    Key: { id: facilityId }
  });
  const response = await docClient.send(command);
  return response.Item;
}

export async function getFacilities() {
  const command = new ScanCommand({
    TableName: process.env.DYNAMODB_FACILITIES_TABLE
  });
  const response = await docClient.send(command);
  return response.Items;
}

export async function getFacilitiesByPrefecture(prefecture) {
  const command = new QueryCommand({
    TableName: process.env.DYNAMODB_FACILITIES_TABLE,
    IndexName: "prefecture-index",
    KeyConditionExpression: "prefecture = :prefecture",
    ExpressionAttributeValues: {
      ":prefecture": prefecture
    }
  });
  const response = await docClient.send(command);
  return response.Items;
}

// スタンプ関連
export async function getUserStamps(userId) {
  const command = new QueryCommand({
    TableName: process.env.DYNAMODB_USER_STAMPS_TABLE,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    }
  });
  const response = await docClient.send(command);
  return response.Items;
}

export async function saveStamp(stampData) {
  const command = new PutCommand({
    TableName: process.env.DYNAMODB_USER_STAMPS_TABLE,
    Item: stampData
  });
  return docClient.send(command);
}
```

## 5. テストデータの移行
1. データ移行スクリプト作成
`scripts/migrate-data.js`:
```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { testFacilities, testUserStamps } from '../src/lib/testData';

async function migrateData() {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });

  const docClient = DynamoDBDocumentClient.from(client);

  // Facilities移行
  for (const facility of testFacilities) {
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_FACILITIES_TABLE,
      Item: facility
    });
    await docClient.send(command);
    console.log(`Migrated facility: ${facility.name}`);
  }

  // UserStamps移行
  for (const stamp of testUserStamps) {
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_USER_STAMPS_TABLE,
      Item: stamp
    });
    await docClient.send(command);
    console.log(`Migrated stamp: ${stamp.location}`);
  }
}

migrateData().catch(console.error);
```

## 6. APIエンドポイントの更新

1. `/api/stamps/verify.js`の更新
```javascript
import { getFacility } from '@/lib/dynamodb';
import { isWithinRange } from '@/lib/location';

export async function POST(request) {
  const { facilityId, latitude, longitude } = await request.json();
  
  try {
    const facility = await getFacility(facilityId);
    if (!facility) {
      return Response.json({ canObtain: false, error: 'Facility not found' });
    }
    
    const canObtain = isWithinRange(latitude, longitude, facility);
    return Response.json({ canObtain });
    
  } catch (error) {
    console.error('Error verifying location:', error);
    return Response.json({ 
      canObtain: false, 
      error: 'Failed to verify location' 
    }, { status: 500 });
  }
}
```

2. `/api/stamps/obtain.js`の更新
```javascript
import { getFacility, saveStamp } from '@/lib/dynamodb';
import { isWithinRange } from '@/lib/location';

export async function POST(request) {
  const { facilityId, latitude, longitude } = await request.json();
  
  try {
    const facility = await getFacility(facilityId);
    if (!facility) {
      return Response.json({ success: false, error: 'Facility not found' });
    }
    
    if (!isWithinRange(latitude, longitude, facility)) {
      return Response.json({ success: false, error: 'Not within range' });
    }
    
    const stampData = {
      userId: "guest", // TODO: 認証実装後に実際のユーザーIDを使用
      facilityId,
      obtainedAt: new Date().toISOString(),
      latitude,
      longitude,
      imageUrl: facility.imageUrl,
      location: facility.name,
      position: facility.position
    };
    
    await saveStamp(stampData);
    
    return Response.json({ success: true, stamp: stampData });
    
  } catch (error) {
    console.error('Error obtaining stamp:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to obtain stamp' 
    }, { status: 500 });
  }
}
```

## 7. 動作確認手順

1. 環境変数の設定確認
```bash
cat .env.local
```

2. データ移行の実行
```bash
node scripts/migrate-data.js
```

3. アプリケーションの起動と確認
```bash
npm run dev
```

4. 動作確認項目
- [ ] 施設一覧の取得
- [ ] 県別施設フィルタリング
- [ ] スタンプ取得の位置情報確認
- [ ] スタンプデータの保存
- [ ] 保存したスタンプの表示

## 注意点
1. エラーハンドリング
   - DB接続エラー時の適切なフォールバック
   - クライアントへのエラー通知

2. パフォーマンス
   - クエリの最適化
   - インデックスの適切な使用

3. セキュリティ
   - IAMポリシーの最小権限原則
   - 環境変数の適切な管理

