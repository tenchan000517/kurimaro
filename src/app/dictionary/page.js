'use client';

import { useState } from 'react';
import CreatureCard from '@/components/dictionary/CreatureCard';

const categories = ['すべて', '哺乳類', '魚類', '爬虫類', '両生類', '鳥類', '昆虫'];

// 特定のIDを「持ってる」設定にする
const collectedIds = [1, 5, 10, 15, 20, 25, 30]; // 例：これらのIDを持っているとする

const creatures = Array.from({ length: 219 }, (_, i) => ({
  id: i + 1,
  name: `生き物${i + 1}`,
  imageUrl: `https://tomorinengineeroffice.com/data/${i + 1}.png`, // 元のURLに戻す
  category: categories[Math.floor((i % (categories.length - 1)) + 1)], // ランダムではなく順番に割り当て
  isCollected: collectedIds.includes(i + 1) // 指定したIDのみ持っている設定
}));

function DictionaryPage() {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCreatures = creatures.filter(creature =>

    (selectedCategory === 'すべて' || creature.category === selectedCategory) &&
    (searchQuery === '' || creature.name.includes(searchQuery))
  );

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="生き物を検索..."
          className="w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4 overflow-x-auto">
        <div className="flex space-x-2 min-w-min">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
               ${selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCreatures.map(creature => (
          <CreatureCard
            key={creature.id}
            {...creature}
          />
        ))}
      </div>
    </div>
  );
}

export default DictionaryPage;