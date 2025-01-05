// src/lib/location.js
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // 地球の半径（メートル）
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // メートル単位での距離
  };
  
  export const isWithinRange = (userLat, userLon, facility) => {
    const distance = calculateDistance(
      userLat,
      userLon,
      facility.latitude,
      facility.longitude
    );
    return distance <= facility.radius;
  };