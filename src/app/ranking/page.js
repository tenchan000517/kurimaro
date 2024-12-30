// app/ranking/page.js
'use client';

import { useState } from 'react';
import { Trophy, Calendar, Star, MapPin } from 'lucide-react';

const categories = [
  { id: 'total', label: '総合', icon: Trophy },
  { id: 'monthly', label: '月間', icon: Calendar },
  { id: 'collection', label: 'コレクション', icon: Star },
  { id: 'visits', label: '訪問回数', icon: MapPin }
];

// テストデータ
const rankings = {
  total: [
    { rank: 1, name: "クッキーハンター", points: 1250, visits: 42, collected: 180 },
    { rank: 2, name: "スイーツマスター", points: 1180, visits: 38, collected: 165 },
    { rank: 3, name: "お菓子の達人", points: 1120, visits: 35, collected: 155 },
    { rank: 4, name: "クッキー探検家", points: 1050, visits: 32, collected: 145 },
    { rank: 5, name: "スイーツコレクター", points: 980, visits: 30, collected: 135 }
  ],
  monthly: [
    { rank: 1, name: "月間チャンピオン", points: 320, visits: 12, collected: 45 },
    { rank: 2, name: "頑張り屋さん", points: 280, visits: 10, collected: 40 },
    { rank: 3, name: "新人コレクター", points: 250, visits: 8, collected: 35 },
    { rank: 4, name: "ルーキー", points: 220, visits: 7, collected: 30 },
    { rank: 5, name: "期待の新星", points: 200, visits: 6, collected: 25 }
  ],
  collection: [
    { rank: 1, name: "図鑑マスター", points: 950, visits: 30, collected: 200 },
    { rank: 2, name: "収集家", points: 900, visits: 28, collected: 190 },
    { rank: 3, name: "探検家", points: 850, visits: 26, collected: 180 },
    { rank: 4, name: "図鑑愛好家", points: 800, visits: 24, collected: 170 },
    { rank: 5, name: "熱心な収集家", points: 750, visits: 22, collected: 160 }
  ],
  visits: [
    { rank: 1, name: "常連さん", points: 800, visits: 50, collected: 150 },
    { rank: 2, name: "お店の友達", points: 750, visits: 45, collected: 140 },
    { rank: 3, name: "熱心なファン", points: 700, visits: 40, collected: 130 },
    { rank: 4, name: "定期訪問者", points: 650, visits: 35, collected: 120 },
    { rank: 5, name: "ロイヤルカスタマー", points: 600, visits: 30, collected: 110 }
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

const getStatValue = (category, item) => {
  switch (category) {
    case 'total': return `${item.points}pt`;
    case 'monthly': return `${item.points}pt`;
    case 'collection': return `${item.collected}個`;
    case 'visits': return `${item.visits}回`;
    default: return `${item.points}pt`;
  }
};

export default function RankingPage() {
  const [activeCategory, setActiveCategory] = useState('total');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* カテゴリータブ */}
      <div className="mb-6 grid grid-cols-4 gap-2">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`flex flex-col items-center p-3 rounded-lg transition-colors shadow-sm
              ${activeCategory === id
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>

      {/* ランキングリスト */}
      <div className="space-y-3">
        {rankings[activeCategory].map((item) => (
          <div
            key={item.rank}
            className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4"
          >
            <div className={`${getRankColor(item.rank)} w-12 h-12 rounded-full 
              flex items-center justify-center text-white font-bold text-lg`}>
              {item.rank}
            </div>

            <div className="flex-1">
              <div className="font-bold text-lg text-gray-900">{item.name}</div>
              <div className="text-sm text-gray-700 mt-1">
                {activeCategory === 'collection' && `図鑑完成度: ${Math.round(item.collected / 219 * 100)}%`}
                {activeCategory === 'visits' && `平均訪問: 月${Math.round(item.visits / 12)}回`}
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {getStatValue(activeCategory, item)}
              </div>
              <div className="text-xs text-gray-500">
                {activeCategory === 'total' && '累計ポイント'}
                {activeCategory === 'monthly' && '今月のポイント'}
                {activeCategory === 'collection' && 'コレクション数'}
                {activeCategory === 'visits' && '訪問回数'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 自分のランキング */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4 shadow-sm">
        <div className="text-sm text-blue-700 font-medium mb-3">あなたの順位</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center text-blue-700 font-bold">
              {42}
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900">ゲストユーザー</div>
              <div className="text-sm text-gray-600">全体の上位45%</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">
              {activeCategory === 'collection' ? '85個' : '520pt'}
            </div>
            <div className="text-xs text-gray-500">現在のスコア</div>
          </div>
        </div>
      </div>
    </div>
  );
}