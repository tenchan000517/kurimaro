import { useState, useEffect } from 'react';
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
  isGuestUser = false, // ゲストユーザー判定を追加
}) {
  const [showModal, setShowModal] = useState(false);
  const [stampData, setStampData] = useState(null);
  const [error, setError] = useState(null);
  const [currentFacility, setCurrentFacility] = useState(null);
  const [detectedFacility, setDetectedFacility] = useState(null);
  const [showFacilityDetail, setShowFacilityDetail] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  console.log('Props.stamps:', stamps);
  console.log('Props.facilities:', facilities);
  console.log('Props.isGuestUser:', isGuestUser);

  useEffect(() => {
    const obtainedStamps = facilities.filter(facility =>
      stamps.some(stamp => stamp.facilityId === facility.id)
    );
    console.log('Obtained stamps:', obtainedStamps);
  }, [facilities, stamps, isGuestUser]);

  // スタンプ判定
  const getStampForFacility = (facility) => {
    if (isGuestUser) {
      // ゲストユーザーの場合、visitedFacilitiesを使用
      return visitedFacilities.find(s => s.facilityId === facility?.id);
    }
    // 通常ユーザーの場合、propsから渡されたstampsを使用
    return stamps.find(s => s.facilityId === facility?.id);
  };

  // コンソールに取得済み施設をログ出力
  useEffect(() => {
    if (isGuestUser) {
      const obtainedStamps = facilities.filter(facility =>
        visitedFacilities.some(stamp => stamp.facilityId === facility.id)
      );
      console.log('ゲストユーザー取得済み施設:', obtainedStamps);
    } else {
      const obtainedStamps = facilities.filter(facility =>
        stamps.some(stamp => stamp.facilityId === facility.id)
      );
      console.log('通常ユーザー取得済み施設:', obtainedStamps);
    }
  }, [facilities, stamps, isGuestUser]);

  const handleStampClick = (index) => {
    const facility = facilities[index];
    if (!facility) return;

    const existingStamp = getStampForFacility(facility);
    setSelectedFacility(facility);
    setStampData(existingStamp);
    setShowFacilityDetail(true);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <LocationDetector
        facilities={facilities}
        onFacilityDetected={setDetectedFacility}
      />

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: totalStamps }).map((_, index) => {
          const facility = facilities[index];
          const stamp = getStampForFacility(facility); // ゲストと通常ユーザーで動作を切り替え

          return (
            <div
              key={index}
              onClick={() => facility && handleStampClick(index)}
              className={`aspect-square rounded-lg border-2 ${
                stamp ? 'bg-green-50 border-green-500' : 'bg-gray-100 border-gray-300'
              } flex items-center justify-center cursor-pointer transition-all duration-200`}
            >
              {stamp ? (
                <div className="text-center">
                  <img
                    src={stamp.imageUrl}
                    alt={`${facility?.name}のスタンプ`}
                    className="w-16 h-16 mx-auto object-contain"
                  />
                  <p className="text-sm font-bold mt-2">{facility?.name}</p>
                  <p className="text-xs text-gray-500">取得日: {stamp.obtainedAt}</p>
                </div>
              ) : facility ? (
                <div className="text-center">
                  <p className="text-gray-600">{facility.name}</p>
                  <p className="text-xs text-gray-400">訪問してください</p>
                </div>
              ) : (
                <span className="text-gray-400">{index + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      {currentFacility && (
        <LocationVerifier
          facility={currentFacility}
          onSuccess={handleLocationSuccess}
          onError={setError}
        />
      )}

      {detectedFacility && !stamps.find(s => s.facilityId === detectedFacility.id) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            {detectedFacility.name}の近くにいます
            <button
              onClick={() => handleStampObtain(detectedFacility)}
              className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-full text-xs"
            >
              スタンプを取得
            </button>
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
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
  isGuestUser: PropTypes.bool, // ゲスト判定用プロパティを追加
};

export default StampCard;
