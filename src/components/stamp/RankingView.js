// components/stamp/RankingView.js
import { useState } from 'react';
import { Trophy, Calendar } from 'lucide-react';

function RankingView() {
  const [periodType, setPeriodType] = useState('all'); // 'all' or 'monthly'

  // テストデータ
  const rankings = {
    all: [
      { rank: 1, name: "クッキーラバー", count: 42, avatar: "/avatar1.png" },
      { rank: 2, name: "スイーツハンター", count: 38, avatar: "/avatar2.png" },
      { rank: 3, name: "お菓子の魔術師", count: 35, avatar: "/avatar3.png" },
      // ... 他のランキングデータ
    ],
    monthly: [
      { rank: 1, name: "パティシエ見習い", count: 12, avatar: "/avatar4.png" },
      { rank: 2, name: "クッキーマスター", count: 10, avatar: "/avatar5.png" },
      { rank: 3, name: "スイーツエクスプローラー", count: 8, avatar: "/avatar6.png" },
      // ... 他のランキングデータ
    ]
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-yellow-400';
      case 2: return 'bg-gray-300';
      case 3: return 'bg-amber-600';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* 期間切り替えタブ */}
      <div className="flex gap-2">
        <button
          onClick={() => setPeriodType('all')}
          className={`flex items-center px-4 py-2 rounded-full text-sm
            ${periodType === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <Trophy size={16} className="mr-1" />
          総合ランキング
        </button>
        <button
          onClick={() => setPeriodType('monthly')}
          className={`flex items-center px-4 py-2 rounded-full text-sm
            ${periodType === 'monthly'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <Calendar size={16} className="mr-1" />
          月間ランキング
        </button>
      </div>

      {/* ランキングリスト */}
      <div className="space-y-2">
        {rankings[periodType].map((item) => (
          <div
            key={item.rank}
            className="bg-white rounded-lg p-4 flex items-center space-x-3 shadow-sm"
          >
            {/* ランク表示 */}
            <div className={`w-8 h-8 ${getRankColor(item.rank)} rounded-full 
              flex items-center justify-center font-bold text-white`}>
              {item.rank}
            </div>
            
            {/* アバター */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* ユーザー情報 */}
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-700">
                {periodType === 'all' ? '総獲得数' : '今月の獲得数'}: {item.count}個
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 自分の順位 */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <div className="text-sm text-blue-700 font-medium mb-2">あなたの順位</div>
        <div className="flex items-center justify-between">
          <div className="font-medium">
            {periodType === 'all' ? '42位 / 283人中' : '15位 / 89人中'}
          </div>
          <div className="text-sm text-gray-700">
            獲得数: {periodType === 'all' ? '15個' : '5個'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingView;