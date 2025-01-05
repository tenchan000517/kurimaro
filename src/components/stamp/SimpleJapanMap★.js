import React, { useEffect, useRef, useState, useMemo } from 'react';

function SimpleJapanMap({
  visitedPrefectures = [],
  facilities = [],
  currentLocation = null,
  selectedFacility = null,
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  // 安定した参照を作成
  const stableVisitedPrefectures = useMemo(() => visitedPrefectures, [visitedPrefectures]);
  const stableFacilities = useMemo(() => facilities, [facilities]);

  useEffect(() => {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleMapsLoaded(true);
      script.onerror = () => setLoadingError('Google Maps APIの読み込みに失敗しました。');
      document.head.appendChild(script);
    } else {
      setIsGoogleMapsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isGoogleMapsLoaded) {
      console.warn('Google Maps API is not loaded yet.');
      return;
    }

    if (!mapRef.current) {
      console.error('mapRef.current is not available.');
      return;
    }

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 36.2048, lng: 138.2529 }, // 日本の中心座標
        zoom: 5,
      });
      mapInstance.current = map;

      // 訪問済み都道府県のオーバーレイ表示
      stableVisitedPrefectures.forEach((prefCode) => {
        console.log('Highlight visited prefecture:', prefCode);
        // 都道府県のハイライトロジックを追加
      });

      // 施設のマーカー表示
      stableFacilities.forEach((facility) => {
        if (!facility || typeof facility.latitude !== 'number' || typeof facility.longitude !== 'number') return;

        const marker = new window.google.maps.Marker({
          position: { lat: facility.latitude, lng: facility.longitude },
          map: map,
          title: facility.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 6,
            fillColor: '#E74C3C',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${facility.name}</strong><br>${facility.description || ''}</div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      // 現在地のマーカー
      if (currentLocation) {
        new window.google.maps.Marker({
          position: { lat: currentLocation.latitude, lng: currentLocation.longitude },
          map: map,
          title: '現在地',
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#2ECC71',
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
          },
        });
      }
    } catch (error) {
      console.error('Error during map initialization:', error);
      setLoadingError('地図の初期化中にエラーが発生しました。');
    }
  }, [isGoogleMapsLoaded, stableVisitedPrefectures, stableFacilities, currentLocation]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {loadingError ? (
        <div className="text-red-500 text-center p-4">{loadingError}</div>
      ) : !isGoogleMapsLoaded ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-blue-500">地図を読み込んでいます...</p>
        </div>
      ) : (
        <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
      )}
    </div>
  );
}

export default SimpleJapanMap;
