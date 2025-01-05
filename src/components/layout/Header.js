'use client';

import { Menu, User, Book, Map, Trophy, Bell, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: <Book className="w-8 h-8" />, label: '図鑑', path: '/dictionary' },
    { icon: <Map className="w-8 h-8" />, label: 'スタンプ', path: '/stamp' },
    { icon: <Trophy className="w-8 h-8" />, label: 'ランキング', path: '/ranking' },
    { icon: <Bell className="w-8 h-8" />, label: 'お知らせ', path: '/news' },
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (pathname === '/') return null;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between px-4 h-full">
        <Link href="/menu" className="flex items-center">
          <img
            src="/logo.svg"
            alt="生き物クッキー図鑑のロゴ"
            className="h-14"
          />
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <User className="w-6 h-6 text-gray-900" />
            <span className="text-gray-900">{user.nickname}</span>
            {isMenuOpen ? (
              <X
                className="w-6 h-6 text-gray-900 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <Menu
                className="w-6 h-6 text-gray-900 cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </div>
        )}
      </div>
      {/* メニュー */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-40">
          <ul className="flex flex-col">
            {menuItems.map((item) => (
              <li key={item.label} className="border-b border-gray-200">
                <Link
                  href={item.path}
                  className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)} // メニュークリックで閉じる
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
