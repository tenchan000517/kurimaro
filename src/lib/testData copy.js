// src/lib/testData.js
export const testFacilities = [
    {
      id: 1,
      name: '名古屋港水族館',
      imageUrl: '/stamps/penguin-stamp.png',
      prefecture: 'aichi',
      latitude: 35.0891,
      longitude: 136.8825,
      position: 0,
      radius: 50
    },
    {
      id: 2,
      name: '東山動植物園',
      imageUrl: '/stamps/lion-stamp.png',
      prefecture: 'aichi',
      latitude: 35.1471,
      longitude: 136.9837,
      position: 1,
      radius: 50
    },
    {
      id: 3,
      name: '鳥羽水族館',
      imageUrl: '/stamps/dolphin-stamp.png',
      prefecture: 'mie',
      latitude: 34.4823,
      longitude: 136.8436,
      position: 2,
      radius: 50
    },
    {
      id: 4,
      name: '伊良湖メロン狩りセンター',
      imageUrl: '/stamps/butterfly-stamp.png',
      prefecture: 'aichi',
      latitude: 34.6307,
      longitude: 137.0114,
      position: 3,
      radius: 50
    },
    {
      id: 5,
      name: '日本モンキーパーク',
      imageUrl: '/stamps/deer-stamp.png',
      prefecture: 'aichi',
      latitude: 34.9589,
      longitude: 137.0817,
      position: 4,
      radius: 50
    },
    {
      id: 6,
      name: '岐阜城',
      prefecture: 'gifu',
      latitude: 35.4338,
      longitude: 136.7851,
      position: 5,
      radius: 50
    },
    {
      id: 7,
      name: '伊豆シャボテン動物公園',
      prefecture: 'shizuoka',
      latitude: 34.9119,
      longitude: 139.1281,
      position: 6,
      radius: 50
    },
    {
      id: 8,
      name: '竹島水族館',
      prefecture: 'aichi',
      latitude: 34.7169,
      longitude: 137.3906,
      position: 7,
      radius: 50
    },
    {
      id: 9,
      name: '富士サファリパーク',
      prefecture: 'shizuoka',
      latitude: 35.2467,
      longitude: 138.6867,
      position: 8,
      radius: 50
    },
    {
      id: 10,
      name: 'アクアトトぎふ',
      prefecture: 'gifu',
      latitude: 35.4233,
      longitude: 136.7597,
      position: 9,
      radius: 50
    },
    {
      id: 11,
      name: '中部国際空港セントレア',
      prefecture: 'aichi',
      latitude: 34.8588,
      longitude: 136.8099,
      position: 10,
      radius: 50
    },
    {
      id: 12,
      name: '下田海中水族館',
      prefecture: 'shizuoka',
      latitude: 34.6717,
      longitude: 138.9717,
      position: 11,
      radius: 50
    }
  ];
  
  export const testUserStamps = [
    {
      id: 1,
      userId: "guest",
      facilityId: 1,
      obtainedAt: "2024-01-15",
      latitude: 35.0891,
      longitude: 136.8825,
      imageUrl: '/stamps/penguin-stamp.png',
      location: '名古屋港水族館',
      position: 0
    },
    {
      id: 2,
      userId: "guest",
      facilityId: 2,
      obtainedAt: "2024-01-20",
      latitude: 35.1471,
      longitude: 136.9837,
      imageUrl: '/stamps/lion-stamp.png',
      location: '東山動植物園',
      position: 1
    },
    {
      id: 3,
      userId: "guest",
      facilityId: 3,
      obtainedAt: "2024-02-01",
      latitude: 34.4823,
      longitude: 136.8436,
      imageUrl: '/stamps/dolphin-stamp.png',
      location: '鳥羽水族館',
      position: 2
    },
    {
      id: 4,
      userId: "guest",
      facilityId: 4,
      obtainedAt: "2024-02-15",
      latitude: 34.6307,
      longitude: 137.0114,
      imageUrl: '/stamps/butterfly-stamp.png',
      location: '伊良湖メロン狩りセンター',
      position: 3
    },
    {
      id: 5,
      userId: "guest",
      facilityId: 5,
      obtainedAt: "2024-03-01",
      latitude: 34.9589,
      longitude: 137.0817,
      imageUrl: '/stamps/deer-stamp.png',
      location: '日本モンキーパーク',
      position: 4
    }
  ];