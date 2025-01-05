// src/components/stamp/LocationVerifier.js
import { useState, useEffect } from 'react';
import { isWithinRange, getCurrentPosition, getLocationErrorMessage } from '@/lib/location';

const LocationVerifier = ({ facility, onSuccess, onError }) => {
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const verifyLocation = async () => {
      console.log('Starting location verification for:', facility.name);
      setVerifying(true);

      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const withinRange = isWithinRange(latitude, longitude, facility);
        
        if (withinRange) {
          console.log('Location verified successfully for:', facility.name);
          onSuccess({
            latitude,
            longitude,
            timestamp: new Date().toISOString()
          });
        } else {
          console.log('Location verification failed: Not within range of', facility.name);
          onError(`${facility.name}の近くまで移動してください`);
        }
      } catch (error) {
        console.error('Location verification error:', {
          facility: facility.name,
          error: error.message
        });
        onError(getLocationErrorMessage(error));
      } finally {
        setVerifying(false);
      }
    };

    verifyLocation();
  }, [facility, onSuccess, onError]);

  if (!verifying) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg font-medium">位置情報を確認中...</p>
        <p className="text-sm text-gray-500 mt-2">{facility.name}までの距離を計測しています</p>
      </div>
    </div>
  );
};

export default LocationVerifier;