// src/components/stamp/LocationDetector.js
import { useState, useEffect, useCallback } from 'react';
import { isWithinRange, GEOLOCATION_OPTIONS, getLocationErrorMessage, calculateDistance } from '@/lib/location';

const LocationDetector = ({ facilities, onFacilityDetected }) => {
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 3;
    const NEARBY_THRESHOLD = 5000; // 5km

    const handlePositionSuccess = useCallback((position) => {
        const { latitude, longitude } = position.coords;
        console.log('[LocationDetector] Current position:', { latitude, longitude });

        setRetryCount(0);

        // 近くの施設を探す
        const facility = facilities.find(f =>
            isWithinRange(latitude, longitude, f)
        );

        if (facility) {
            console.log('[LocationDetector] Found facility with current position:', {  // 追加
                facilityName: facility.name,
                userLatitude: latitude,
                userLongitude: longitude
            });

            // ここにonFacilityDetectedの呼び出し直前のデータをログ
            console.log('[LocationDetector] Calling onFacilityDetected with:', {
                ...facility,
                currentLatitude: latitude,
                currentLongitude: longitude,
                id: facility.id  // この値が特に重要
            });

            // 施設情報と現在位置を一緒に渡す
            onFacilityDetected({
                ...facility,
                currentLatitude: latitude,
                currentLongitude: longitude
            });
        } else {
            onFacilityDetected(null);
        }
    }, [facilities, onFacilityDetected]);

    const handlePositionError = useCallback((error) => {
        console.error('Location detection error:', {
            code: error.code,
            message: getLocationErrorMessage(error),
            retryCount
        });

        if (error.code === error.TIMEOUT && retryCount < MAX_RETRIES) {
            setRetryCount(prev => prev + 1);
            console.log(`Retrying location detection... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
        } else {
            onFacilityDetected(null);
        }
    }, [retryCount, onFacilityDetected]);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            handlePositionSuccess,
            handlePositionError,
            GEOLOCATION_OPTIONS
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [handlePositionSuccess, handlePositionError]);

    return null;
};

export default LocationDetector;