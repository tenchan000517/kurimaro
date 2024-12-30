// components/stamp/QRScanner.js
import { useState, useEffect } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';

function QRScanner({ onScan }) {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // カメラ権限の確認
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  const handleScan = (data) => {
    if (data) {
      onScan(data);
    }
  };

  if (!hasPermission) {
    return (
      <div className="text-center p-4">
        <p>カメラへのアクセスが必要です</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => window.location.reload()}
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className="relative aspect-square max-w-sm mx-auto">
      <QrScanner
        onDecode={handleScan}
        className="w-full h-full rounded-lg overflow-hidden"
      />
      <div className="absolute inset-0 border-2 border-white/50 rounded-lg">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 border-blue-500"></div>
      </div>
    </div>
  );
}