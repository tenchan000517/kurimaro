// app/stamp/page.js
'use client';

import { useState } from 'react';
import StampCard from '@/components/stamp/StampCard';
import SimpleJapanMap from '@/components/stamp/SimpleJapanMap';
import StatsPanel from '@/components/stamp/StatsPanel';
import RankingView from '@/components/stamp/RankingView';

// テストデータ
const testStamps = [
  {
    id: 1,
    imageUrl: '/stamps/penguin-stamp.png', // 実際の画像パスに変更が必要
    location: '名古屋港水族館',
    date: '2024-01-15',
    position: 0,
    coordinates: { lat: 35.0891, lng: 136.8825 }
  },
  {
    id: 2,
    imageUrl: '/stamps/lion-stamp.png',
    location: '東山動植物園',
    date: '2024-01-20',
    position: 1,
    coordinates: { lat: 35.1471, lng: 136.9837 }
  },
  {
    id: 3,
    imageUrl: '/stamps/dolphin-stamp.png',
    location: '鳥羽水族館',
    date: '2024-02-01',
    position: 2,
    coordinates: { lat: 34.4823, lng: 136.8436 }
  },
  {
    id: 4,
    imageUrl: '/stamps/butterfly-stamp.png',
    location: '伊良湖メロン狩りセンター',
    date: '2024-02-15',
    position: 3,
    coordinates: { lat: 34.6307, lng: 137.0114 }
  },
  {
    id: 5,
    imageUrl: '/stamps/deer-stamp.png',
    location: '日本モンキーパーク',
    date: '2024-03-01',
    position: 4,
    coordinates: { lat: 34.9589, lng: 137.0817 }
  }
];

// 訪問可能な全施設データ
const allLocations = [
  ...testStamps,
  {
    id: 6,
    location: '岐阜城',
    coordinates: { lat: 35.4338, lng: 136.7851 },
    position: 5
  },
  {
    id: 7,
    location: '伊豆シャボテン動物公園',
    coordinates: { lat: 34.9119, lng: 139.1281 },
    position: 6
  },
  {
    id: 8,
    location: '竹島水族館',
    coordinates: { lat: 34.7169, lng: 137.3906 },
    position: 7
  },
  {
    id: 9,
    location: '富士サファリパーク',
    coordinates: { lat: 35.2467, lng: 138.6867 },
    position: 8
  },
  {
    id: 10,
    location: 'アクアトトぎふ',
    coordinates: { lat: 35.4233, lng: 136.7597 },
    position: 9
  },
  {
    id: 11,
    location: '中部国際空港セントレア',
    coordinates: { lat: 34.8588, lng: 136.8099 },
    position: 10
  },
  {
    id: 12,
    location: '下田海中水族館',
    coordinates: { lat: 34.6717, lng: 138.9717 },
    position: 11
  }
];

function StampPage() {
  const [activeTab, setActiveTab] = useState('stampCard');
  const [selectedStatsTab, setSelectedStatsTab] = useState('map');

  // 訪問済みの県を計算（テスト用）
  const visitedPrefectures = ['aichi', 'mie']; // 愛知県と三重県を訪問済みに

  const mainTabs = [
    { id: 'stampCard', label: 'スタンプカード' },
    // { id: 'ranking', label: 'ランキング' }
  ];

  const statsTabs = [
    { id: 'map', label: 'スタンプラリーマップ' },
    { id: 'stats', label: '来店・達成状況' }
  ];

  return (
    <div className="p-4 max-w-screen-xl mx-auto space-y-4">
      {/* メインタブ */}
      <div className="flex space-x-2 border-b">
        {mainTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors
              ${activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-700 hover:text-gray-900'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* メインコンテンツ */}
      {activeTab === 'stampCard' ? (
        <div className="space-y-4">
          <StampCard 
            stamps={testStamps} 
            totalStamps={12} 
          />

          {/* 統計タブ */}
          <div className="flex space-x-2 mt-6 mb-4">
            {statsTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatsTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors
                  ${selectedStatsTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 統計コンテンツ */}
          {selectedStatsTab === 'map' ? (
            <SimpleJapanMap visitedPrefectures={visitedPrefectures} />
          ) : (
            <StatsPanel 
              visitCount={testStamps.length} 
              completionRate={Math.round((testStamps.length / allLocations.length) * 100)} 
            />
          )}
        </div>
      ) : (
        <RankingView />
      )}

      {/* 施設一覧（開発用） */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-medium mb-2">訪問可能な施設一覧</h3>
        <div className="space-y-2 text-sm">
          {allLocations.map(location => (
            <div key={location.id} className="flex justify-between">
              <span>{location.location}</span>
              <span className="text-gray-700">
                {`${location.coordinates.lat.toFixed(4)}, ${location.coordinates.lng.toFixed(4)}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StampPage;