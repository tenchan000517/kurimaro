// src/lib/utils.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateImageUrl(id) {
  return `https://tomorinengineeroffice.com/data/${id}.png`;
}

// 日本語の都道府県名を取得する関数を追加
export function getPrefectureName(prefCode) {
  const prefectures = {
    'aichi': '愛知県',
    'gifu': '岐阜県',
    'mie': '三重県',
    'shizuoka': '静岡県'
  };
  return prefectures[prefCode] || prefCode;
}

// スタンプ取得可能かどうかを判定する関数
export function isStampAvailable(facility, userLocation) {
  if (!facility || !userLocation) return false;
  
  const distance = calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    facility.latitude,
    facility.longitude
  );
  
  return distance <= (facility.stampRadius || 100); // デフォルト100m
}

// 日付のフォーマットをより詳細に
export function formatDateTime(date) {
  return new Date(date).toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}