// src/components/stamp/StampObtainModal.js
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';

const StampObtainModal = ({ isOpen, stampData, onClose }) => {
  if (!isOpen || !stampData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="p-6 max-w-sm w-full bg-white">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4">
            {stampData.location}のスタンプを獲得しました！
          </h3>
          <div className="mb-4">
            <img
              src={stampData.imageUrl}
              alt={`${stampData.location}のスタンプ`}
              className="w-32 h-32 mx-auto object-contain"
            />
          </div>
          <p className="mb-4 text-sm text-gray-600">
            {new Date(stampData.obtainedAt).toLocaleDateString()} に取得
          </p>
          <Button onClick={onClose} className="w-full">
            閉じる
          </Button>
        </div>
      </Card>
    </div>
  );
};

// default exportを使用
export default StampObtainModal;