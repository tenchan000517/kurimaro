// components/stamp/StampVerification.js
function StampVerification({ location, onVerify, onCancel }) {
    const [verifying, setVerifying] = useState(false);
  
    const handleVerify = async () => {
      setVerifying(true);
      try {
        // 位置情報の取得
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        // 位置情報の検証（実際のロジックはバックエンドで実装）
        const isValid = true; // 仮の実装
  
        if (isValid) {
          onVerify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString()
          });
        } else {
          alert('現在地が対象店舗の位置と一致しません');
        }
      } catch (error) {
        alert('位置情報の取得に失敗しました');
      } finally {
        setVerifying(false);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
          <h3 className="text-lg font-bold mb-4">スタンプ取得の確認</h3>
          <p className="mb-4">
            {location}でスタンプを取得しますか？
            <br />
            <span className="text-sm text-gray-700">※位置情報の確認を行います</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleVerify}
              disabled={verifying}
              className={`flex-1 py-2 rounded-lg ${
                verifying
                  ? 'bg-gray-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {verifying ? '確認中...' : '取得する'}
            </button>
            <button
              onClick={onCancel}
              disabled={verifying}
              className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export { SimpleJapanMap, QRScanner, StampVerification };