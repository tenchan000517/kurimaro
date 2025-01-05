// app/api/stamps/obtain.js
import { testFacilities, testUserStamps } from '@/lib/testData';
import { isWithinRange } from '@/lib/location';

export async function POST(request) {
  const { facilityId, latitude, longitude } = await request.json();
  
  let facility;
  
  // DBが存在する場合はDBから、なければテストデータから施設を取得
  try {
    // DynamoDB実装時のために準備
    facility = await getFacilityFromDB(facilityId);
  } catch (error) {
    // フォールバック
    facility = testFacilities.find(f => f.id === facilityId);
  }

  if (!facility) {
    return Response.json({ success: false, error: 'Facility not found' });
  }

  if (!isWithinRange(latitude, longitude, facility)) {
    return Response.json({ success: false, error: 'Not within range' });
  }

  const newStamp = {
    userId: "guest",
    facilityId,
    obtainedAt: new Date().toISOString(),
    latitude,
    longitude,
    imageUrl: facility.imageUrl,
    location: facility.name,
    position: facility.position
  };

  // DBが存在する場合はDBに保存
  try {
    // TODO: ここにDB保存時のコードを追加
    testUserStamps.push(newStamp);
  } catch (error) {
    testUserStamps.push(newStamp);
  }

  return Response.json({ 
    success: true, 
    stamp: newStamp 
  });
}