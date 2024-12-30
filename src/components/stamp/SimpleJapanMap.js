// components/stamp/SimpleJapanMap.js
function SimpleJapanMap({ visitedPrefectures = [] }) {
    // クッキーっぽい色合いのカラーパレット
    const colors = {
      base: '#F4D03F',  // 薄いクッキー色
      visited: '#D4AC0D', // 焼きこんだクッキー色
      stroke: '#BA8816', // 縁取り色
      hover: '#F5B041',  // ホバー時の色
      text: '#784212'    // テキスト色
    };
  
  // 簡略化した都道府県データ（一部抜粋）
  const prefectures = {
    hokkaido: {
      path: 'M 80 20 L 120 20 L 130 40 L 110 60 L 70 50 Z',
      name: '北海道',
      position: { x: 75, y: 35 }
    },
    tohoku: {
      path: 'M 90 70 L 110 70 L 115 100 L 85 100 Z',
      name: '東北',
      position: { x: 85, y: 85 }
    },
    kanto: {
      path: 'M 85 105 L 115 105 L 110 125 L 90 125 Z',
      name: '関東',
      position: { x: 85, y: 115 }
    },
    chubu: {
      path: 'M 70 125 L 95 125 L 100 145 L 85 155 L 65 145 Z',
      name: '中部',
      position: { x: 80, y: 140 }
    },
    kansai: {
      path: 'M 60 145 L 85 155 L 80 175 L 55 170 Z',
      name: '関西',
      position: { x: 70, y: 160 }
    },
    chugoku: {
      path: 'M 30 155 L 55 160 L 50 175 L 25 170 Z',
      name: '中国',
      position: { x: 40, y: 165 }
    },
    shikoku: {
      path: 'M 45 175 L 65 175 L 60 185 L 40 185 Z',
      name: '四国',
      position: { x: 52, y: 180 }
    },
    kyushu: {
      path: 'M 15 170 L 35 170 L 40 190 L 30 200 L 10 190 Z',
      name: '九州',
      position: { x: 25, y: 185 }
    },
    okinawa: {
      path: 'M 10 230 L 25 230 L 20 245 L 5 245 Z',
      name: '沖縄',
      position: { x: 15, y: 238 }
    }
  };
  
    return (
      <div className="relative w-full aspect-[3/4] bg-amber-50 rounded-xl p-4 overflow-hidden">
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))' }}
        >
          {/* 背景のドット模様 */}
          <pattern
            id="dots"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill={colors.stroke} opacity="0.1" />
          </pattern>
          <rect width="200" height="300" fill="url(#dots)" />
  
          {/* 都道府県の描画 */}
          {Object.entries(prefectures).map(([id, prefecture]) => {
            const isVisited = visitedPrefectures.includes(id);
            
            return (
              <g key={id}>
                <path
                  d={prefecture.path}
                  fill={isVisited ? colors.visited : colors.base}
                  stroke={colors.stroke}
                  strokeWidth="2"
                  className="transition-all duration-300 hover:brightness-110 cursor-pointer"
                />
                <text
                  x={prefecture.position.x}
                  y={prefecture.position.y}
                  textAnchor="middle"
                  fill={colors.text}
                  className="text-[8px] font-medium pointer-events-none"
                >
                  {prefecture.name}
                </text>
                {isVisited && (
                  <circle
                    cx={prefecture.position.x}
                    cy={prefecture.position.y - 15}
                    r="5"
                    fill="#E74C3C"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}
  
          {/* 地図の装飾 */}
          <path
            d="M 20 20 C 50 10, 150 10, 180 20"
            fill="none"
            stroke={colors.stroke}
            strokeWidth="1"
            strokeDasharray="4 2"
            opacity="0.5"
          />
        </svg>
  
        {/* 凡例 */}
        <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-2 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: colors.base }}></div>
            <span className="text-xs">未訪問</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: colors.visited }}></div>
            <span className="text-xs">訪問済み</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default SimpleJapanMap;