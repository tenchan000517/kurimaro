// app/news/page.js
'use client';

import { useState } from 'react';
import NewsCard from '@/components/news/NewsCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// テストデータ
const newsItems = [
  {
    id: 1,
    title: "新商品「ホッキョクグマクッキー」発売開始！",
    content: `
      <p>人気の生き物クッキーシリーズに、新しい仲間が登場！</p>
      <h3>商品詳細</h3>
      <ul>
        <li>発売日: 2024年1月15日</li>
        <li>価格: 380円（税込）</li>
        <li>取扱店舗: 全店舗</li>
      </ul>
      <p>真っ白なホッキョクグマの形をしたクッキーは、ホワイトチョコレートでコーティングされており、
      食べると口の中でほんのり溶けていく新食感。ぜひお試しください！</p>
    `,
    date: new Date(2024, 0, 15).toISOString(),
    image: "/news/1.jpg"
  },
  {
    id: 2,
    title: "冬の生き物クッキーフェア開催！",
    content: `
      <p>冬の期間限定で、人気の生き物クッキーが大集合！</p>
      <h3>フェア詳細</h3>
      <ul>
        <li>期間: 2024年1月20日〜2月29日</li>
        <li>場所: 全店舗</li>
        <li>特典: 3個以上お買い上げで1個プレゼント！</li>
      </ul>
      <p>期間中は、普段手に入りにくいレアな生き物クッキーも登場します。この機会をお見逃しなく！</p>
    `,
    date: new Date(2024, 0, 20).toISOString(),
    image: "/news/2.jpg"
  },
  // 必要に応じてさらにデータを追加
];

const ITEMS_PER_PAGE = 10;

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleNews = newsItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-4 max-w-screen-xl mx-auto space-y-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">お知らせ</h1>
      
      <div className="space-y-4">
        {visibleNews.map((news) => (
          <NewsCard key={news.id} {...news} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            <ChevronLeft size={20} className="text-gray-900" />
          </button>
          
          <span className="text-base font-medium text-gray-900">
            {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            <ChevronRight size={20} className="text-gray-900" />
          </button>
        </div>
      )}
      
      {visibleNews.length === 0 && (
        <div className="text-center py-12 text-gray-900">
          お知らせはありません
        </div>
      )}
    </div>
  );
}