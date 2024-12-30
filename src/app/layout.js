// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="pt-16 pb-16 min-h-screen bg-gray-100">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}

export const metadata = {
  title: '生き物クッキー図鑑',
  description: '生き物クッキーを集めて図鑑を完成させよう！',
};