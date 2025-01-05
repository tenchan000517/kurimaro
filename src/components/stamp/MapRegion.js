// src/components/stamp/MapRegion.js
import React from 'react';
import { REGION_PATHS, getPrefectureColor } from '@/lib/map-utils';

const MapRegion = ({ prefecture, isVisited }) => {
  const regionData = REGION_PATHS[prefecture];
  if (!regionData) return null;

  return (
    <path
      d={regionData.path}
      fill={getPrefectureColor(prefecture, isVisited)}
      stroke="#000"
      strokeWidth="1"
    />
  );
};

export default MapRegion;