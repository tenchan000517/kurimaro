import Link from 'next/link';
import { Book, Stamp, Trophy, Bell } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around z-50">
      <Link href="/dictionary" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
        <Book className="w-6 h-6" />
        <span className="text-sm font-medium">図鑑</span>
      </Link>
      <Link href="/stamp" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
        <Stamp className="w-6 h-6" />
        <span className="text-sm font-medium">スタンプ</span>
      </Link>
      <Link href="/ranking" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
        <Trophy className="w-6 h-6" />
        <span className="text-sm font-medium">ランキング</span>
      </Link>
      <Link href="/news" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
        <Bell className="w-6 h-6" />
        <span className="text-sm font-medium">お知らせ</span>
      </Link>
    </nav>
  );
}