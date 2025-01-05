import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import LocationVerifier from './LocationVerifier';
import StampObtainModal from './StampObtainModal';
import FacilityDetailModal from './FacilityDetailModal';
import LocationDetector from './LocationDetector';
import { visitedFacilities } from '@/lib/testData';

function StampCard({
  stamps = [],
  totalStamps = 12,
  onStampObtain,
  facilities,
  isGuestUser = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [stampData, setStampData] = useState(null);
  const [error, setError] = useState(null);
  const [currentFacility, setCurrentFacility] = useState(null);
  const [detectedFacility, setDetectedFacility] = useState(null);
  const [showFacilityDetail, setShowFacilityDetail] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const getStampForFacility = (facility) => {

    console.log('Getting stamp for facility:', { 
      facilityId: facility?.id, 
      stampImage: facility?.stampImage 
    });

    if (!facility) return null;
    
    // 1. まず通常のスタンプを確認
    const normalStamp = stamps.find(s => s.facilityId === facility.id);
    if (normalStamp) return normalStamp;
  
    // 2. ゲストモードの場合は固定データも確認
    if (isGuestUser) {
      const fixedStamp = visitedFacilities.find(s => s.facilityId === facility.id);
      if (fixedStamp) return fixedStamp;
    }
  
    return null;
  };

  const handleStampClick = (index) => {
    const facility = facilities[index];
    if (!facility) return;

    const existingStamp = getStampForFacility(facility);
    setSelectedFacility(facility);
    setStampData(existingStamp);
    setShowFacilityDetail(true);
  };

  const handleLocationSuccess = useCallback(async (facility) => {
    try {
      // スタンプ取得処理
      const newStamp = {
        userId: isGuestUser ? 'guest' : 'user',
        facilityId: facility.id,
        obtainedAt: new Date().toISOString(),
        imageUrl: facility.stampImage,
        location: facility.name,
        position: stamps.length,
      };

      await onStampObtain(newStamp);
      setCurrentFacility(null);
      setError(null);
    } catch (err) {
      setError('スタンプの取得に失敗しました');
      console.error('Error in handleLocationSuccess:', err);
    }
  }, [isGuestUser, stamps.length, onStampObtain]);

  const handleDetectedFacilityStamp = useCallback(async (facility) => {
    try {
      const newStamp = {
        userId: isGuestUser ? 'guest' : 'user',
        facilityId: facility.id,
        obtainedAt: new Date().toISOString(),
        imageUrl: facility.stampImage,
        location: facility.name,
        position: stamps.length,
      };

      await onStampObtain(newStamp);
      setError(null);
    } catch (err) {
      setError('スタンプの取得に失敗しました');
      console.error('Error in handleDetectedFacilityStamp:', err);
    }
  }, [isGuestUser, stamps.length, onStampObtain]);

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <LocationDetector
        facilities={facilities}
        onFacilityDetected={setDetectedFacility}
      />

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: totalStamps }).map((_, index) => {
          const facility = facilities[index];
          const stamp = getStampForFacility(facility);

          return (
            <div
              key={index}
              onClick={() => facility && handleStampClick(index)}
              className="relative aspect-square cursor-pointer group"
            >
              {stamp ? (
                // 取得済みスタンプ
                <div className="w-full h-full relative">
                  <img
                    src={stamp.imageUrl}
                    alt={`${facility?.name}のスタンプ`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* オーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 rounded-lg opacity-90 group-hover:opacity-100 transition-opacity" />
                  {/* テキストコンテンツ */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                    <p className="text-xs font-medium truncate">
                      {facility?.name}
                    </p>
                    <p className="text-xs text-neutral-300">
                      {new Date(stamp.obtainedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : facility ? (
                // 未取得スタンプ
                <div className="w-full h-full relative bg-sky-50 rounded-lg overflow-hidden group-hover:bg-violet-100 transition-colors">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <span className="text-lg font-medium text-neutral-500 group-hover:text-violet-500 mb-1">
                      {index + 1}
                    </span>
                    <p className="text-xs text-neutral-400 group-hover:text-violet-500 text-center truncate w-full">
                      {facility.name}
                    </p>
                  </div>
                </div>
              ) : (
                // 未開放スロット
                <div className="w-full h-full bg-neutral-800/50 rounded-lg flex items-center justify-center">
                  <span className="text-lg text-neutral-600">
                    {index + 1}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 位置検出メッセージ */}
      {detectedFacility && !stamps.find(s => s.facilityId === detectedFacility.id) && (
        <div className="mt-4 p-3 bg-indigo-900/20 border border-indigo-800/30 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-white flex items-center justify-between">
            <span>{detectedFacility.name}の近くにいます</span>
            <button
              onClick={() => handleDetectedFacilityStamp(detectedFacility)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs transition-colors"
            >
              スタンプを取得
            </button>
          </p>
        </div>
      )}

      {/* エラーメッセージ */}
      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-800/30 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-white">{error}</p>
        </div>
      )}

      {currentFacility && (
        <LocationVerifier
          facility={currentFacility}
          onSuccess={handleLocationSuccess}
          onError={setError}
        />
      )}

      <StampObtainModal
        isOpen={showModal}
        stampData={stampData}
        onClose={() => {
          setShowModal(false);
          setStampData(null);
        }}
      />

      <FacilityDetailModal
        isOpen={showFacilityDetail}
        facility={selectedFacility}
        visitedStamp={stampData}
        onClose={() => {
          setShowFacilityDetail(false);
          setSelectedFacility(null);
          setStampData(null);
        }}
      />
    </div>
  );
}

StampCard.propTypes = {
  stamps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      obtainedAt: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
      facilityId: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalStamps: PropTypes.number,
  onStampObtain: PropTypes.func.isRequired,
  facilities: PropTypes.array.isRequired,
  isGuestUser: PropTypes.bool,
};

export default StampCard;