// app/stamp/page.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import StampCard from '@/components/stamp/StampCard';
import FacilityMap from '@/components/stamp/FacilityMap';
import StatsPanel from '@/components/stamp/StatsPanel';
import { facilities, visitedFacilities } from '@/lib/testData';
import { isWithinRange } from '@/lib/location';
import { getCurrentUser, isGuestUser } from '@/lib/user';

function StampPage() {
  const [stamps, setStamps] = useState(visitedFacilities);
  const [activeTab, setActiveTab] = useState('stampCard');
  const [selectedStatsTab, setSelectedStatsTab] = useState('map');
  const [guestMode, setGuestMode] = useState(false);
  const [error, setError] = useState(null);  // エラー状態の追加

  useEffect(() => {
    const isGuest = isGuestUser();
    console.log('ゲストモード:', isGuest);
    setGuestMode(isGuest);
  }, []);

  if (guestMode === null) {
    return <div>Loading...</div>;
  }

  const visitedPrefectures = [...new Set(
    visitedFacilities
      .map(stamp => {
        const facility = facilities.find(f => f.id === stamp.facilityId);
        return facility ? facility.prefecture : null;
      })
      .filter(Boolean)
  )];

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

  const handleFacilitySelect = useCallback(async (facility) => {
    try {
      setError(null); // エラー状態をリセット

      // 位置情報が利用可能かチェック
      if (!navigator.geolocation) {
        throw new Error('このブラウザは位置情報をサポートしていません');
      }

      // Promise化した位置情報取得
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error('位置情報の使用が許可されていません'));
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error('位置情報を取得できません'));
                break;
              case error.TIMEOUT:
                reject(new Error('位置情報の取得がタイムアウトしました'));
                break;
              default:
                reject(error);
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000, // タイムアウトを10秒に延長
            maximumAge: 5000
          }
        );
      });

      const { latitude, longitude } = position.coords;

      // 詳細な位置情報のログ
      console.log('Current position:', {
        latitude,
        longitude,
        facility: {
          name: facility.name,
          lat: facility.latitude,
          lon: facility.longitude
        }
      });

      if (!isWithinRange(latitude, longitude, facility)) {
        throw new Error(`施設「${facility.name}」の近くまで移動してください`);
      }

      const newStamp = {
        userId: guestMode ? 'guest' : getCurrentUser().id,
        facilityId: facility.id,
        obtainedAt: new Date().toISOString(),
        latitude,
        longitude,
        imageUrl: facility.stampImage,
        location: facility.name,
        position: stamps.length,
      };

      await handleStampObtain(newStamp);

      // 成功メッセージ（任意）
      console.log(`${facility.name}のスタンプを取得しました！`);

    } catch (error) {
      console.error('Stamp obtaining error:', {
        message: error.message,
        code: error.code,
        facility: facility.name
      });

      // エラー状態を更新
      setError(error.message);

      // エラーメッセージの表示（alertの代わりに状態管理を使用）
      setTimeout(() => setError(null), 5000); // 5秒後にエラーメッセージを消去
    }
  }, [guestMode, stamps.length]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto space-y-4">
      {/* エラーメッセージの表示 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="space-y-4">
        <StampCard
          stamps={stamps}
          facilities={facilities}
          totalStamps={facilities.length}
          onStampObtain={handleStampObtain}
          isGuestUser={guestMode}
        />

        {/* 統計タブ - スタイル修正箇所 */}
        <div className="flex gap-2 mb-4 bg-gray-100 p-0 rounded-lg">
          {['スタンプラリーマップ', '来店・達成状況'].map((label, index) => (
            <button
              key={index}
              onClick={() => setSelectedStatsTab(index === 0 ? 'map' : 'stats')}
              className={`
                flex-1
                px-4 
                py-2 
                text-sm 
                font-medium
                rounded-md 
                transition-colors 
                duration-200
                ${selectedStatsTab === (index === 0 ? 'map' : 'stats')
                  ? 'bg-[#F5E6D3] text-gray-800 shadow-sm'
                  : 'bg-gray-200 text-gray-600 hover:bg-[#F5E6D3] hover:bg-opacity-50'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>

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
            visitedFacilities={stamps}
            visitedPrefectures={visitedPrefectures}
          />
        )}
      </div>
    </div>
  );
}

export default StampPage;