// src/lib/testData.js
export const facilities = [
    {
        id: "nagoya-port-aquarium",
        name: "名古屋港水族館",
        prefecture: "aichi",
        placeId: "ChIJN8spAQxwA18R4R6nvYZcWW4",
        address: "愛知県名古屋市港区港町1-3",
        stampRadius: 100,
        stampImage: "/stamps/nagoya-aquarium.png",
        grayStampImage: "/stamps/nagoya-aquarium-gray.png",
        latitude: 35.0891,
        longitude: 136.8825
    },
    {
        id: "higashiyama-zoo",
        name: "東山動植物園",
        prefecture: "aichi",
        placeId: "ChIJU8Zp3RyEAmARhL2nHGxpxjY",
        address: "愛知県名古屋市千種区東山元町3-70",
        stampRadius: 100,
        stampImage: "/stamps/higashiyama-zoo.png",
        grayStampImage: "/stamps/higashiyama-zoo-gray.png",
        latitude: 35.1471,
        longitude: 136.9837
    },
    {
        id: "toba-aquarium",
        name: "鳥羽水族館",
        prefecture: "mie",
        placeId: "ChIJ_U0MjJUWAmARqapD2xKothY",
        address: "三重県鳥羽市鳥羽3-3-6",
        stampRadius: 100,
        stampImage: "/stamps/toba-aquarium.png",
        grayStampImage: "/stamps/toba-aquarium-gray.png",
        latitude: 34.4823,
        longitude: 136.8436
    },
    {
        id: "irago-melon",
        name: "伊良湖メロン狩りセンター",
        prefecture: "aichi",
        placeId: "ChIJ_____________________________",
        address: "愛知県田原市伊良湖町宮下3000-65",
        stampRadius: 100,
        stampImage: "/stamps/irago-melon.png",
        grayStampImage: "/stamps/irago-melon-gray.png",
        latitude: 34.6307,
        longitude: 137.0114
    },
    {
        id: "japan-monkey-park",
        name: "日本モンキーパーク",
        prefecture: "aichi",
        placeId: "ChIJ7WXvF9xEAmARJ_F4yv2xtz0",
        address: "愛知県犬山市大字犬山字官林26",
        stampRadius: 100,
        stampImage: "/stamps/monkey-park.png",
        grayStampImage: "/stamps/monkey-park-gray.png",
        latitude: 35.3286,
        longitude: 136.9129
    },
    {
        id: "izu-cactus-park",
        name: "伊豆シャボテン公園",
        prefecture: "shizuoka",
        placeId: "ChIJ_____________________________",
        address: "静岡県伊東市富戸1317-13",
        stampRadius: 100,
        stampImage: "/stamps/izu-cactus.png",
        grayStampImage: "/stamps/izu-cactus-gray.png",
        latitude: 34.9115,
        longitude: 139.1449
    },
    {
        id: "fuji-safari",
        name: "富士サファリパーク",
        prefecture: "shizuoka",
        placeId: "ChIJ_____________________________",
        address: "静岡県裾野市須山字藤原2255-27",
        stampRadius: 100,
        stampImage: "/stamps/fuji-safari.png",
        grayStampImage: "/stamps/fuji-safari-gray.png",
        latitude: 35.2437,
        longitude: 138.8266
    },
    {
        id: "aquatotto-gifu",
        name: "アクアトトぎふ",
        prefecture: "gifu",
        placeId: "ChIJ_____________________________",
        address: "岐阜県各務原市川島笠田町1453",
        stampRadius: 100,
        stampImage: "/stamps/aquatotto.png",
        grayStampImage: "/stamps/aquatotto-gray.png",
        latitude: 35.4089,
        longitude: 136.8389
    },
    {
        id: "centrair",
        name: "中部国際空港セントレア",
        prefecture: "aichi",
        placeId: "ChIJ_____________________________",
        address: "愛知県常滑市セントレア1-1",
        stampRadius: 100,
        stampImage: "/stamps/centrair.png",
        grayStampImage: "/stamps/centrair-gray.png",
        latitude: 34.8588,
        longitude: 136.8099
    },
    {
        id: "shimoda-aquarium",
        name: "下田海中水族館",
        prefecture: "shizuoka",
        placeId: "ChIJ_____________________________",
        address: "静岡県下田市3-22-31",
        stampRadius: 100,
        stampImage: "/stamps/shimoda-aquarium.png",
        grayStampImage: "/stamps/shimoda-aquarium-gray.png",
        latitude: 34.6697,
        longitude: 138.9675
    },
    {
        id: "test-location-shidami",
        name: "テストロケーション（下志段味）",
        prefecture: "aichi",
        placeId: "ChIJ_____________________________",
        address: "愛知県名古屋市守山区下志段味3丁目1101",
        stampRadius: 100,  // 半径100mの範囲で取得可能
        stampImage: "/stamps/higashiyama-zoo.png",
        grayStampImage: "/stamps/higashiyama-zoo-gray.png",
        latitude: 35.2343,  // 下志段味の緯度
        longitude: 136.9852 // 下志段味の経度
    }
];

export const visitedFacilities = [
    {
        id: "nagoya-port-aquarium",
        userId: "guest",
        facilityId: "nagoya-port-aquarium",
        obtainedAt: "2024-01-15",
        latitude: 35.0891,
        longitude: 136.8825,
        imageUrl: '/stamps/penguin-stamp.png',
        location: '名古屋港水族館',
        position: 0
    },
    {
        id: "higashiyama-zoo",
        userId: "guest",
        facilityId: "higashiyama-zoo",
        obtainedAt: "2024-01-20",
        latitude: 35.1471,
        longitude: 136.9837,
        imageUrl: '/stamps/lion-stamp.png',
        location: '東山動植物園',
        position: 1
    },
    {
        id: "toba-aquarium",
        userId: "guest",
        facilityId: "toba-aquarium",
        obtainedAt: "2024-02-01",
        latitude: 34.4823,
        longitude: 136.8436,
        imageUrl: '/stamps/dolphin-stamp.png',
        location: '鳥羽水族館',
        position: 2
    },
    {
        id: "irago-melon",
        userId: "guest",
        facilityId: "irago-melon",
        obtainedAt: "2024-02-15",
        latitude: 34.6307,
        longitude: 137.0114,
        imageUrl: '/stamps/butterfly-stamp.png',
        location: '伊良湖メロン狩りセンター',
        position: 3
    },
    {
        id: "japan-monkey-park",
        userId: "guest",
        facilityId: "japan-monkey-park",
        obtainedAt: "2024-03-01",
        latitude: 35.3286,
        longitude: 136.9129,
        imageUrl: '/stamps/deer-stamp.png',
        location: '日本モンキーパーク',
        position: 4
    }
];