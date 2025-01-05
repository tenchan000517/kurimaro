import { useState, useEffect } from 'react';
import { isWithinRange } from '@/lib/location';

const LocationVerifier = ({ facility, onSuccess, onError }) => {
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const verifyLocation = async () => {
      console.log('Location verification started for facility:', facility);
      setVerifying(true);

      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by this browser');
        onError('このブラウザは位置情報をサポートしていません');
        setVerifying(false);
        return;
      }

      try {
        console.log('Requesting position with options:', {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              console.log('Position obtained:', {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                accuracy: pos.coords.accuracy,
                timestamp: new Date(pos.timestamp).toISOString()
              });
              resolve(pos);
            },
            (err) => {
              console.error('Geolocation error:', {
                code: err.code,
                message: err.message
              });
              reject(err);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            }
          );
        });

        const { latitude, longitude } = position.coords;
        
        console.log('Checking if within range:', {
          userLat: latitude,
          userLng: longitude,
          facilityLat: facility.latitude,
          facilityLng: facility.longitude,
          radius: facility.stampRadius
        });
        
        const withinRange = isWithinRange(latitude, longitude, facility);
        console.log('Within range result:', withinRange);

        if (withinRange) {
          console.log('Location verified successfully');
          onSuccess({
            latitude,
            longitude,
            timestamp: new Date().toISOString()
          });
        } else {
          console.log('Location verification failed: Not within range');
          onError('施設の近くまで移動してください');
        }
      } catch (error) {
        console.error('Location verification error:', error);
        
        // エラーコードに基づいたより詳細なエラーメッセージ
        let errorMessage = '位置情報の取得に失敗しました';
        if (error.code) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = '位置情報の利用が許可されていません';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = '位置情報を取得できませんでした';
              break;
            case error.TIMEOUT:
              errorMessage = '位置情報の取得がタイムアウトしました。再度お試しください';
              break;
          }
        }
        
        onError(errorMessage);
      } finally {
        console.log('Location verification completed');
        setVerifying(false);
      }
    };

    verifyLocation();
  }, [facility, onSuccess, onError]);

  return verifying ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p>位置情報を確認中...</p>
      </div>
    </div>
  ) : null;
};

export default LocationVerifier;