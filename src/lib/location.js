// src/lib/location.js

// 既存の計算関数を保持
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // 地球の半径（メートル）
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
};

export const isWithinRange = (userLat, userLon, facility) => {
    const expandedRadius = facility.stampRadius * 50;

    console.log('[isWithinRange] Checking:', {  // 追加
        facilityName: facility.name,
        stampRadius: facility.stampRadius,
        expandedRadius: expandedRadius
    });
    
    const distance = calculateDistance(
        userLat,
        userLon,
        facility.latitude,
        facility.longitude
    );
    
    const result = {
        distance,
        withinRange: distance <= expandedRadius,
        userLocation: { lat: userLat, lon: userLon },
        facilityLocation: { lat: facility.latitude, lon: facility.longitude },
        originalRadius: facility.stampRadius,
        expandedRadius
    };

    // デバッグ用のログ出力を整理
    console.log('Distance check:', result);

    if (distance < 5000) {
        console.log('Nearby facility:', {
            name: facility.name,
            distance: Math.round(distance),
            withinRange: result.withinRange
        });
    }
    
    return result.withinRange;
};

// 位置情報の取得オプション
export const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 5000
};

// エラーメッセージの統一
export const getLocationErrorMessage = (error) => {
    if (!error) return '位置情報の取得に失敗しました';

    switch (error.code) {
        case 1: // PERMISSION_DENIED
            return '位置情報の使用が許可されていません。ブラウザの設定をご確認ください。';
        case 2: // POSITION_UNAVAILABLE
            return '位置情報を取得できません。電波の良い場所で再度お試しください。';
        case 3: // TIMEOUT
            return '位置情報の取得がタイムアウトしました。再度お試しください。';
        default:
            return `位置情報の取得に失敗しました: ${error.message || '不明なエラー'}`;
    }
};

// 位置情報取得のPromiseラッパー
export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('このブラウザは位置情報をサポートしていません'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                console.log('Position obtained:', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
                resolve(position);
            },
            error => {
                console.error('Geolocation error:', {
                    code: error.code,
                    message: error.message
                });
                reject(error);
            },
            GEOLOCATION_OPTIONS
        );
    });
};

// 近くの施設を検索
export const findNearbyFacilities = (latitude, longitude, facilities, maxDistance = 5000) => {
    return facilities
        .map(facility => ({
            ...facility,
            distance: calculateDistance(latitude, longitude, facility.latitude, facility.longitude)
        }))
        .filter(facility => facility.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);
};