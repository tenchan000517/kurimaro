// components/stamp/StampMap.js
function StampMap() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="h-64 bg-gray-200 rounded-lg mb-4">
        {/* Google Maps APIを使用してマップを表示 */}
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-700">マップを読み込み中...</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm">訪問済みの場所</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
          <span className="text-sm">未訪問の場所</span>
        </div>
      </div>
    </div>
  );
}

export default StampMap;