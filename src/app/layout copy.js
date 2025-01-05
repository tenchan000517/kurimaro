// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '生き物クッキー図鑑',
  description: '生き物クッキーを集めて図鑑を完成させよう！',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        {/* <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geometry&loading=async&callback=Function.prototype`}
          strategy="afterInteractive"
        /> */}
        <Header />
        <main className="pt-16 pb-16 min-h-screen bg-gray-100">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}