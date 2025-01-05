'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const guestUser = {
      id: `guest-${Date.now()}`,
      nickname: 'ゲストユーザー',
      type: 'guest',
    };
    localStorage.setItem('user', JSON.stringify(guestUser));

    router.push('/menu');
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-start bg-gray-50 overflow-hidden">
      {/* ロゴ */}
      <div className="relative w-80 h-28 sm:w-96 sm:h-32 lg:w-120 lg:h-40 mt-4 lg:mt-8">
        <Image
          src="/logo.svg"
          alt="KURIMARO COLLECTIONS"
          fill
          priority
          className="object-contain"
        />
      </div>
      {/* アイコン */}
      <div className="relative w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] mt-6 lg:mt-12">
        <Image
          src="/icon.svg"
          alt="アイコン"
          fill
          priority
          className="object-contain"
        />
      </div>
      {/* ボタン */}
      <button
        onClick={handleGuestLogin}
        disabled={loading}
        className="w-full max-w-xs py-3 bg-orange-200 text-gray-900 rounded-lg font-medium 
                     hover:bg-orange-300 disabled:opacity-50 transition-all mt-8"
      >
        {loading ? 'ログイン中...' : 'はじめる'}
      </button>
    </div>
  );
}
