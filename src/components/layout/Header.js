'use client';

import { Menu, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (pathname === '/' || pathname === '/menu') return null;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between px-4 h-full">
        <h1 className="text-xl font-bold text-gray-900">生き物クッキー図鑑</h1>
        {user && (
          <div className="flex items-center gap-4">
            <User className="w-6 h-6 text-gray-900" />
            <span className="text-gray-900">{user.nickname}</span>
            <Menu className="w-6 h-6 text-gray-900" />
          </div>
        )}
      </div>
    </header>
  );
}