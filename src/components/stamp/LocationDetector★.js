import { useState, useEffect, useCallback } from 'react';
import { isWithinRange } from '@/lib/location';

const LocationDetector = ({ facilities, onFacilityDetected }) => {
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const handlePositionSuccess = useCallback((position) => {
    const { latitude, longitude } = position.coords;
    setRetryCount(0); // 成功したらリトライカウントをリセット

    // 近くの施設を検出
    const nearbyFacility = facilities.find(facility =>
      isWithinRange(latitude, longitude, facility)
    );
    
    onFacilityDetected(nearbyFacility || null);
  }, [facilities, onFacilityDetected]);

  const handlePositionError = useCallback((error) => {
    console.error('Location detection error:', {
      code: error.code,
      message: error.message,
      retryCount
    });

    if (error.code === error.TIMEOUT && retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      // エラーメッセージをより詳細に
      console.log(`Retrying location detection... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
    } else {
      onFacilityDetected(null);
    }
  }, [retryCount, onFacilityDetected]);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,        // タイムアウトを10秒に延長
      maximumAge: 5000       // キャッシュの有効期限を5秒に設定
    };

    const watchId = navigator.geolocation.watchPosition(
      handlePositionSuccess,
      handlePositionError,
      options
    );

    // クリーンアップ関数
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [handlePositionSuccess, handlePositionError]);

  return null;
};

export default LocationDetector;