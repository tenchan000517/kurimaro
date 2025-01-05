// app/stamp/page.js
'use client';

import { useState } from 'react';
import StampCard from '@/components/stamp/StampCard';
import SimpleJapanMap from '@/components/stamp/SimpleJapanMap';
import StatsPanel from '@/components/stamp/StatsPanel';
import FacilityMap from '@/components/stamp/FacilityMap';
import { facilities, visitedFacilities } from '@/lib/testData';
import { isWithinRange } from '@/lib/location';

function StampPage() {
  const [stamps, setStamps] = useState(visitedFacilities);
  const [activeTab, setActiveTab] = useState('stampCard');
  const [selectedStatsTab, setSelectedStatsTab] = useState('map');

  // 訪問済みの県を計算
  const visitedPrefectures = [...new Set(
    visitedFacilities
      .map(stamp => {
        const facility = facilities.find(f => f.id === stamp.facilityId);
        return facility ? facility.prefecture : null;
      })
      .filter(Boolean)
  )];

  const mainTabs = [
    { id: 'stampCard', label: 'スタンプカード' },
    { id: 'facilityMap', label: '施設マップ' }
  ];

  const statsTabs = [
    { id: 'map', label: 'スタンプラリーマップ' },
    { id: 'stats', label: '来店・達成状況' }
  ];

  // 新しいスタンプを取得したときの処理
  const handleStampObtain = async (newStamp) => {
    setStamps(prevStamps => {
      const existingIndex = prevStamps.findIndex(s => s.facilityId === newStamp.facilityId);
      if (existingIndex >= 0) {
        const updatedStamps = [...prevStamps];
        updatedStamps[existingIndex] = newStamp;
        return updatedStamps;
      }
      return [...prevStamps, newStamp];
    });
  };

  // 施設が選択されたときの処理
  const handleFacilitySelect = async (facility) => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      if (!isWithinRange(latitude, longitude, facility)) {
        alert('施設の近くまで移動してください');
        return;
      }

      const newStamp = {
        userId: "guest",
        facilityId: facility.id,
        obtainedAt: new Date().toISOString(),
        latitude,
        longitude,
        imageUrl: facility.stampImage,
        location: facility.name,
        position: stamps.length
      };

      handleStampObtain(newStamp);
    } catch (error) {
      console.error('Error obtaining stamp:', error);
      alert('スタンプの取得に失敗しました');
    }
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto space-y-4">
      {/* メインコンテンツ */}
      <div className="space-y-4">
        <StampCard 
          stamps={stamps}
          facilities={facilities}
          totalStamps={facilities.length}
          onStampObtain={handleStampObtain}
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
          <FacilityMap 
            facilities={facilities}
            visitedFacilities={stamps}
            onFacilitySelect={handleFacilitySelect}
          />
        ) : (
          <StatsPanel 
            visitCount={stamps.length} 
            completionRate={Math.round((stamps.length / facilities.length) * 100)} 
          />
        )}
      </div>
          </div>

  );
}

export default StampPage;