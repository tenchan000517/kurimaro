import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const FacilityMap = ({
    facilities = [],
    visitedFacilities = [],
    onFacilitySelect
}) => {
    const mapRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
    const markersRef = useRef(new Map());
    const mapInstance = useRef(null);

    // Google Maps APIの読み込み
    useEffect(() => {
        if (typeof window.google === 'undefined') {
            // window.googleMapLoaded がない場合のみスクリプトを追加
            if (!window.googleMapLoaded) {
                window.googleMapLoaded = true;
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
                script.async = true;
                script.defer = true;
                script.onload = () => setIsGoogleMapsLoaded(true);
                script.onerror = () => setError('Google Maps APIの読み込みに失敗しました。');
                document.head.appendChild(script);
            }
        } else {
            setIsGoogleMapsLoaded(true);
        }
    }, []);

    // 現在地の監視
    useEffect(() => {
        if (!navigator.geolocation) {
            setError('お使いのブラウザは位置情報をサポートしていません');
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                setError(null);

                // 現在地マーカーの更新
                if (mapInstance.current && isGoogleMapsLoaded) {
                    const currentLocationMarker = markersRef.current.get('currentLocation');
                    const newPosition = new window.google.maps.LatLng(latitude, longitude);

                    if (currentLocationMarker) {
                        currentLocationMarker.setPosition(newPosition);
                    } else {
                        const marker = new window.google.maps.Marker({
                            position: newPosition,
                            map: mapInstance.current,
                            icon: {
                                path: window.google.maps.SymbolPath.CIRCLE,
                                scale: 8,
                                fillColor: '#ef4444',
                                fillOpacity: 0.8,
                                strokeWeight: 2,
                                strokeColor: '#FFFFFF',
                            },
                            title: '現在地'
                        });
                        markersRef.current.set('currentLocation', marker);
                    }
                }
            },
            (error) => {
                console.error('位置情報エラー:', {
                    code: error.code,
                    message: error.message,
                    timestamp: new Date().toISOString()
                });

                let errorMessage = '位置情報の取得に失敗しました';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = '位置情報の使用が許可されていません。ブラウザの設定をご確認ください。';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = '位置情報を取得できません。電波の良い場所で再度お試しください。';
                        break;
                    case error.TIMEOUT:
                        errorMessage = '位置情報の取得がタイムアウトしました。再度お試しください。';
                        break;
                }
                setError(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000, // タイムアウトを10秒に延長
                maximumAge: 5000
            }
        );

        // クリーンアップ関数
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [isGoogleMapsLoaded]);

    // 地図の初期化と施設マーカーの設置
    useEffect(() => {
        if (!isGoogleMapsLoaded || !mapRef.current) return;

        try {
            // カスタムマップスタイル
            const customMapStyle = [
                {
                    // すべての要素をデフォルトで非表示
                    featureType: "all",
                    elementType: "all",
                    stylers: [{ visibility: "off" }]
                },
                {
                    // 都道府県境界線の表示
                    featureType: "administrative.province",
                    elementType: "geometry.stroke",
                    stylers: [
                        { visibility: "on" },
                        { color: "#000000" },
                        { weight: 3 }
                    ]
                },
                {
                    // すべてのテキストラベルを非表示
                    featureType: "all",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    // 河川を非表示
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{ visibility: "off" }]
                },
                {
                    // 海域の表示（日本の外周線用）
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [
                        { visibility: "on" },
                        { color: "#a5bfdd" }
                    ]
                },
                {
                    // 背景色を白に
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [{ visibility: "on" }, { color: "#ffffff" }]
                }
            ];

            // 東海地方の中心付近（名古屋）を初期表示
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 35.1815, lng: 136.9066 },
                zoom: 8,
                mapTypeControl: false,
                streetViewControl: false,
                styles: customMapStyle,
            });
            mapInstance.current = map;

            // 施設マーカーの設置
            facilities.forEach((facility) => {
                const visited = visitedFacilities.some(vf => vf.facilityId === facility.id);
                const marker = new window.google.maps.Marker({
                    position: { lat: facility.latitude, lng: facility.longitude },
                    map: map,
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: visited ? '#22c55e' : '#3b82f6',
                        fillOpacity: 0.8,
                        strokeWeight: 2,
                        strokeColor: '#FFFFFF',
                    },
                    label: {
                        text: facility.name,
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: "bold"
                    },
                    title: facility.name
                });

                marker.addListener('click', () => {
                    setSelectedFacility(facility);
                });

                markersRef.current.set(facility.id, marker);
            });
        } catch (error) {
            console.error('Error during map initialization:', error);
            setError('地図の初期化中にエラーが発生しました。');
        }
    }, [isGoogleMapsLoaded, facilities, visitedFacilities]);

    const isVisited = (facilityId) => {
        return visitedFacilities.some(vf => vf.facilityId === facilityId);
    };

    return (
        <>
            <Card className="w-full max-w-2xl mx-auto">
                <CardContent className="p-4">
                    <div className="relative aspect-square w-full bg-gray-50 rounded-lg overflow-hidden">
                        <div ref={mapRef} className="w-full h-full" />
                    </div>

                    {error && (
                        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    {currentLocation && (
                        <div className="mt-4 text-sm text-gray-600">
                            現在地: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                        </div>
                    )}

                    {/* 凡例 */}
                    <div className="mt-4 flex gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Navigation className="w-4 h-4 text-red-500" />
                            <span>現在地</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span>未訪問</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-500" />
                            <span>訪問済み</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 施設詳細モーダル */}
            <Dialog open={!!selectedFacility} onOpenChange={() => setSelectedFacility(null)}>
                <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200">
                    <DialogHeader>
                        <DialogTitle>{selectedFacility?.name}</DialogTitle>
                    </DialogHeader>
                    {selectedFacility && (
                        <div className="grid gap-4 py-4">
                            <div className="flex justify-center">
                                <div className="relative w-32 h-32">
                                    <Image
                                        src={isVisited(selectedFacility.id) ? selectedFacility.stampImage : selectedFacility.grayStampImage}
                                        alt={selectedFacility.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className="text-sm space-y-2">
                                <p><strong>住所:</strong> {selectedFacility.address}</p>
                                <p><strong>スタンプ取得範囲:</strong> {selectedFacility.stampRadius}m</p>
                                <p><strong>ステータス:</strong> {
                                    isVisited(selectedFacility.id) ? "訪問済み" : "未訪問"
                                }</p>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => {
                                        onFacilitySelect(selectedFacility);
                                        setSelectedFacility(null);
                                    }}
                                >
                                    スタンプを取得する
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FacilityMap;