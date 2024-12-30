'use client';

import { Book, Map, Trophy, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MenuPage() {
  const router = useRouter();
  
  const menuItems = [
    { icon: <Book className="w-8 h-8" />, label: '図鑑', path: '/dictionary' },
    { icon: <Map className="w-8 h-8" />, label: 'スタンプ', path: '/stamp' },
    { icon: <Trophy className="w-8 h-8" />, label: 'ランキング', path: '/ranking' },
    { icon: <Bell className="w-8 h-8" />, label: 'お知らせ', path: '/news' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(item.path)}
          className="aspect-square bg-white rounded-lg shadow-sm p-6
                   flex flex-col items-center justify-center gap-3
                   text-gray-900 hover:bg-gray-50 transition-colors"
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
}