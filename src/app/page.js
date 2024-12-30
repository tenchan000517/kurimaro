'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const guestUser = {
      id: `guest-${Date.now()}`,
      nickname: 'ゲストユーザー',
      type: 'guest'
    };
    localStorage.setItem('user', JSON.stringify(guestUser));
    
    router.push('/menu');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          KURIMARO COLLECTIONS
        </h1>
        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className="w-full py-4 bg-gray-900 text-white rounded-lg font-medium 
                   disabled:opacity-50 transition-opacity"
        >
          {loading ? 'ログイン中...' : 'はじめる'}
        </button>
      </div>
    </div>
  );
}