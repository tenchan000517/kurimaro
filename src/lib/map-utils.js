// src/lib/map-utils.js

// 地図の領域定義
export const REGION_PATHS = {
    aichi: {
      path: `M661.24 847.55 h52.68 v58.7 h-52.68 Z`,
      viewBox: "0 0 1200 1200"
    },
    gifu: {
      path: `M661.24 704.36 h45.1 v143.19 h-45.1 Z`,
      viewBox: "0 0 1200 1200"
    },
    mie: {
      path: `M610.41,815.51v112.1h36.11c8.13,0,14.71-6.59,14.71-14.71v-97.39h-50.82Z`,
      viewBox: "0 0 1200 1200"
    },
    shizuoka: {
      path: `M713.92 847.55 h47.5 v58.7 h-47.5 Z`,
      viewBox: "0 0 1200 1200"
    }
  };
  
  // SVG座標に変換する関数
  export const convertToMapCoordinates = (latitude, longitude, bounds) => {
    // 東海地方の緯度経度範囲
    const mapBounds = bounds || {
      minLat: 34.4, // 三重県南部
      maxLat: 35.9, // 岐阜県北部
      minLng: 136.5, // 三重県西部
      maxLng: 139.2  // 静岡県東部
    };
  
    // SVGのサイズ
    const svgWidth = 1200;
    const svgHeight = 1200;
  
    // 座標変換
    const x = ((longitude - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * svgWidth;
    const y = svgHeight - ((latitude - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * svgHeight;
  
    return { x, y };
  };
  
  // 県名から色を取得する関数
  export const getPrefectureColor = (prefecture, isVisited) => {
    const colors = {
      aichi: { default: '#E5E5E5', visited: '#84bb60' },
      gifu: { default: '#E5E5E5', visited: '#84bb60' },
      mie: { default: '#E5E5E5', visited: '#84bb60' },
      shizuoka: { default: '#E5E5E5', visited: '#84bb60' }
    };
  
    return isVisited ? colors[prefecture].visited : colors[prefecture].default;
  };