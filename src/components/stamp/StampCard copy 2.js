// src/components/stamp/StampCard.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import LocationVerifier from './LocationVerifier';
import StampObtainModal from './StampObtainModal';
import FacilityDetailModal from './FacilityDetailModal';
import LocationDetector from './LocationDetector';

function StampCard({ 
  stamps = [], 
  totalStamps = 12, 
  onStampObtain,
  allLocations = []
}) {
  const [showModal, setShowModal] = useState(false);
  const [stampData, setStampData] = useState(null);
  const [error, setError] = useState(null);
  const [currentFacility, setCurrentFacility] = useState(null);
  const [detectedFacility, setDetectedFacility] = useState(null);
  const [showFacilityDetail, setShowFacilityDetail] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleStampClick = (index) => {
    const facility = allLocations.find(f => f.position === index);
    if (!facility) return;

    // 施設情報を設定し、モーダルを表示
    const existingStamp = stamps.find(s => s.facilityId === facility.id);
    setSelectedFacility(facility);
    setStampData(existingStamp);
    setShowFacilityDetail(true);
  };

  const handleLocationSuccess = async (locationData) => {
    if (!currentFacility) return;

    try {
      const response = await fetch('/api/stamps/obtain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facilityId: currentFacility.id,
          ...locationData
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setStampData(data.stamp);
        setShowModal(true);
        onStampObtain(data.stamp);
      } else {
        setError(data.error || 'スタンプの取得に失敗しました');
      }
    } catch (error) {
      console.error('Stamp obtain error:', error);
      setError('スタンプの取得に失敗しました');
    } finally {
      setCurrentFacility(null);
    }
  };

  const handleStampObtain = (facility) => {
    if (!facility) return;
    setCurrentFacility(facility);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <LocationDetector
        facilities={allLocations}
        onFacilityDetected={setDetectedFacility}
      />

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: totalStamps }).map((_, index) => {
          const facility = allLocations[index];
          const stamp = stamps.find(s => s.facilityId === facility?.id);
          
          return (
            <div
              key={index}
              onClick={() => facility && handleStampClick(index)}
              className={`
                aspect-square rounded-lg border-2 
                ${stamp ? 'border-none' : 'border-dashed border-gray-400'}
                ${facility ? 'cursor-pointer hover:shadow-lg' : ''}
                flex items-center justify-center transition-all duration-200
              `}
            >
              {stamp ? (
                <img
                  src={stamp.imageUrl}
                  alt={`${facility.name}のスタンプ`}
                  className="w-full h-full object-contain p-2"
                />
              ) : facility ? (
                <div className="text-center p-2">
                  <span className="text-sm text-gray-600">{facility.name}</span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">{index + 1}</span>
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
  allLocations: PropTypes.array.isRequired
};

export default StampCard;