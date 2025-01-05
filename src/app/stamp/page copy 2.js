'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import StampCard from '@/components/stamp/StampCard';
import FacilityMap from '@/components/stamp/FacilityMap';
import StatsPanel from '@/components/stamp/StatsPanel';
import { facilities, visitedFacilities } from '@/lib/testData';
import { getCurrentUser, isGuestUser } from '@/lib/user';
import { isWithinRange, GEOLOCATION_OPTIONS, getLocationErrorMessage } from '@/lib/location';

function StampPage() {
  const [stamps, setStamps] = useState(visitedFacilities);
  const [activeTab, setActiveTab] = useState('stampCard');
  const [selectedStatsTab, setSelectedStatsTab] = useState('map');
  const [guestMode, setGuestMode] = useState(false);
  const [error, setError] = useState(null);
  const [detectedFacility, setDetectedFacility] = useState(null); // 追加
  const [showModal, setShowModal] = useState(false);
  const [stampData, setStampData] = useState(null);

  const handleStampObtain = useCallback(async (newStamp) => {
    try {
      setStamps(prevStamps => {
        // 既存のスタンプと固定データの確認
        const existingNormalStamp = prevStamps.find(s => s.facilityId === newStamp.facilityId);
        const existingFixedStamp = visitedFacilities.find(s => s.facilityId === newStamp.facilityId);

        // ゲストモードで固定データがある場合は追加しない
        if (guestMode && existingFixedStamp) {
          return prevStamps;
        }

        // 通常のスタンプの更新または追加
        if (existingNormalStamp) {
          return prevStamps.map(s =>
            s.facilityId === newStamp.facilityId ? newStamp : s
          );
        }

        return [...prevStamps, newStamp];
      });

      console.log(`スタンプを更新しました: ${newStamp.location}`);
    } catch (err) {
      console.error('Error updating stamps:', err);
      setError('スタンプの更新に失敗しました');
    }
  }, [guestMode]);

  const visitedPrefectures = useMemo(() => {
    return [...new Set(
      visitedFacilities
        .map(stamp => {
          const facility = facilities.find(f => f.id === stamp.facilityId);
          return facility ? facility.prefecture : null;
        })
        .filter(Boolean)
    )];
  }, []);

  const handleFacilitySelect = useCallback(async (facility) => {
    try {
      setError(null);

      // ゲストモードで既に固定データにある場合はスキップ
      const existingFixedStamp = visitedFacilities.find(s => s.facilityId === facility.id);
      if (guestMode && existingFixedStamp) {
        console.log('固定スタンプが存在するためスキップします');
        return;
      }

      // 既に検出済みの施設と選択された施設が一致するか確認
      if (!detectedFacility || detectedFacility.id !== facility.id) {
        throw new Error(`施設「${facility.name}」の近くまで移動してください`);
      }

      const newStamp = {
        id: `stamp-${Date.now()}`,
        userId: guestMode ? 'guest' : getCurrentUser().id,
        facilityId: facility.id,
        obtainedAt: new Date().toISOString(),
        latitude: detectedFacility.latitude,  // 検出済みの位置情報を使用
        longitude: detectedFacility.longitude, // 検出済みの位置情報を使用
        imageUrl: facility.stampImage,
        location: facility.name,
        position: stamps.length,
      };

      await handleStampObtain(newStamp);
      console.log(`${facility.name}のスタンプを取得しました！`);

      setShowModal(true);
      setStampData(newStamp);
      setError(null);
      setDetectedFacility(null);

    } catch (error) {
      console.error('Stamp obtaining error:', {
        message: error.message,
        code: error.code,
        facility: facility.name
      });

      setError(error.message);
      setTimeout(() => setError(null), 5000);
    }
  }, [guestMode, stamps.length, handleStampObtain, detectedFacility]);

  useEffect(() => {
    const isGuest = isGuestUser();
    console.log('ゲストモード:', isGuest);
    setGuestMode(isGuest);
  }, []);

  if (guestMode === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-screen-xl mx-auto space-y-4">
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
          showModal={showModal}
          stampData={stampData}
          onModalClose={() => {
            setShowModal(false);
            setStampData(null);
          }}

        />

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