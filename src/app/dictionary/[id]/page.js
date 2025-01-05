// app/dictionary/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

const testData = {
  1: {
    name: '生き物1',
    imageUrl: 'https://tomorinengineeroffice.com/data/1.png',
    category: '哺乳類',
    description: 'この生き物は...',
    habitat: '北海道の海域に生息',
    story: '昔々あるところに...',
    isCollected: true
  },
  2: {
    name: '生き物2',
    imageUrl: 'https://tomorinengineeroffice.com/data/2.png',
    category: '魚類',
    description: 'この生き物は...',
    habitat: '沖縄の海域に生息',
    story: '昔々あるところに...',
    isCollected: false
  }
  // 必要な数だけ追加
};

function DictionaryDetailPage(props) {
  const params = use(props.params);  // paramsをuseでラップ
  const router = useRouter();
  const [creature, setCreature] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCreature(testData[params.id] || testData[1]); // 存在しないIDの場合は1番を表示
    setLoading(false);
  }, [params.id]);

  if (loading || !creature) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-gray-800 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="ml-1">戻る</span>
      </button>

      <div className="max-w-md mx-auto aspect-[9/16] bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="relative h-full flex flex-col">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">{creature.name}</h1>
              <span className="text-sm">No.{String(creature.id).padStart(3, '0')}</span>
            </div>
            <div className="text-sm mt-1">{creature.category}</div>
          </div>

          <div className="relative w-full" style={{ height: '40%' }}>
            <div className={`absolute inset-0 ${creature.isCollected ? '' : 'grayscale'}`}>
              <img
                src={creature.imageUrl}
                alt={creature.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold mb-2">生息地</h2>
              <p className="text-gray-700">{creature.habitat}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">説明</h2>
              <p className="text-gray-700">{creature.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">ストーリー</h2>
              <p className="text-gray-700">{creature.story}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-100 border-t">
            <div className="flex items-center justify-between">
              <span className="font-medium">取得状況</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                creature.isCollected 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-200 text-gray-800'
              }`}>
                {creature.isCollected ? '取得済み' : '未取得'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DictionaryDetailPage;