const fs = require('fs');
const path = require('path');

// バックアップディレクトリの作成
const backupDir = path.join(__dirname, 'backup_src');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// .gitignoreに追記
const gitignorePath = path.join(__dirname, '.gitignore');
const gitignoreContent = fs.existsSync(gitignorePath) 
  ? fs.readFileSync(gitignorePath, 'utf8') 
  : '';

if (!gitignoreContent.includes('backup_src')) {
  fs.appendFileSync(gitignorePath, '\n# Backup directory\nbackup_src/\n');
}

// 色の変更マッピング - 包括的なバージョン
const colorMappings = {
  // 基本テキストカラー
  'text-gray-500': 'text-gray-700',
  'text-gray-600': 'text-gray-800',
  'text-gray-400': 'text-gray-600',
  'text-gray-300': 'text-gray-500',
  'text-gray-200': 'text-gray-400',
  
  // ボーダーカラー
  'border-gray-300': 'border-gray-400',
  'border-gray-200': 'border-gray-300',
  
  // バックグラウンドカラー
  'bg-gray-100': 'bg-gray-200',
  'bg-gray-50': 'bg-gray-100',
  
  // ホバー状態
  'hover:bg-gray-200': 'hover:bg-gray-300',
  'hover:bg-gray-100': 'hover:bg-gray-200',
  'hover:text-gray-700': 'hover:text-gray-900',
  
  // プレースホルダー
  'placeholder-gray-400': 'placeholder-gray-500',
  'placeholder-gray-500': 'placeholder-gray-600',
};

// 透明度の調整マッピング
const opacityMappings = {
  'bg-black/50': 'bg-black/70',
  'bg-white/80': 'bg-white/90',
  'text-white/80': 'text-white/90',
};

// コンポーネント固有の変更パターン
const componentSpecificPatterns = {
  'DictionaryDetailPage.js': [
    {
      from: 'text-gray-700">{creature.description}</p>',
      to: 'text-gray-900 leading-relaxed">{creature.description}</p>'
    },
    {
      from: 'text-gray-700">{creature.habitat}</p>',
      to: 'text-gray-900 leading-relaxed">{creature.habitat}</p>'
    },
    {
      from: 'text-gray-700">{creature.story}</p>',
      to: 'text-gray-900 leading-relaxed">{creature.story}</p>'
    }
  ],
  'StatsPanel.js': [
    {
      from: 'text-sm text-gray-500',
      to: 'text-sm text-gray-700 font-medium'
    },
    {
      from: 'text-xs text-gray-600',
      to: 'text-sm text-gray-700'
    }
  ],
  'Navigation.js': [
    {
      from: 'className="text-xs"',
      to: 'className="text-sm font-medium"'
    }
  ],
  'StampCard.js': [
    {
      from: 'text-gray-400 text-sm',
      to: 'text-gray-600 text-base font-medium'
    }
  ],
  'CreatureCard.js': [
    {
      from: 'text-white/80 text-xs',
      to: 'text-white text-sm font-medium'
    }
  ],
  'RankingView.js': [
    {
      from: 'text-sm text-gray-500',
      to: 'text-sm text-gray-700 font-medium'
    },
    {
      from: 'text-sm text-blue-600',
      to: 'text-sm text-blue-700 font-medium'
    }
  ],
  'Header.js': [
    {
      from: 'className="w-6 h-6"',
      to: 'className="w-6 h-6 text-gray-700"'
    }
  ]
};

// ファイルを再帰的に処理する関数
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(__dirname, fullPath);
    const backupPath = path.join(backupDir, relativePath);
    
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== 'backup_src') {
        if (!fs.existsSync(path.join(backupDir, relativePath))) {
          fs.mkdirSync(path.join(backupDir, relativePath), { recursive: true });
        }
        processDirectory(fullPath);
      }
    } else if (entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      try {
        // ファイルのバックアップ
        fs.copyFileSync(fullPath, backupPath);
        
        // ファイルの内容を読み込み
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        
        // 基本的な色の置換
        for (const [oldColor, newColor] of Object.entries(colorMappings)) {
          if (content.includes(oldColor)) {
            content = content.replace(new RegExp(oldColor, 'g'), newColor);
            modified = true;
          }
        }
        
        // opacity値の調整
        for (const [oldValue, newValue] of Object.entries(opacityMappings)) {
          if (content.includes(oldValue)) {
            content = content.replace(new RegExp(oldValue, 'g'), newValue);
            modified = true;
          }
        }
        
        // コンポーネント固有の変更を適用
        if (componentSpecificPatterns[entry.name]) {
          for (const pattern of componentSpecificPatterns[entry.name]) {
            if (content.includes(pattern.from)) {
              content = content.replace(new RegExp(pattern.from, 'g'), pattern.to);
              modified = true;
            }
          }
        }
        
        // 変更があった場合のみ書き込み
        if (modified) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated colors in: ${relativePath}`);
        }
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
      }
    }
  }
}

// 実行
console.log('Starting comprehensive color update process...');
console.log('Creating backup in backup_src directory...');
processDirectory(path.join(__dirname, 'src'));
console.log('Color update process completed.');
console.log('Backup created in backup_src directory.');
console.log('To revert changes, copy files from backup_src back to src.');