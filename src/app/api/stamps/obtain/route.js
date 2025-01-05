// src/app/api/stamps/obtain/route.js
import { NextResponse } from 'next/server';
import { saveStamp, getFacility } from '@/lib/dynamodb';
import { isWithinRange } from '@/lib/location';

export async function POST(request) {
  try {
    const body = await request.json();
    const { facilityId, latitude, longitude, userId } = body;

    // 施設情報の取得
    const facility = await getFacility(facilityId);
    if (!facility) {
      return NextResponse.json({ success: false, error: '施設が見つかりません' }, { status: 404 });
    }

    // 位置情報の検証
    if (!isWithinRange(latitude, longitude, facility)) {
      return NextResponse.json({ success: false, error: '施設の近くにいません' }, { status: 400 });
    }

    // スタンプデータの作成
    const stampData = {
      userId,
      facilityId,
      obtainedAt: new Date().toISOString(),
      latitude,
      longitude
    };

    // データの保存
    await saveStamp(stampData);

    return NextResponse.json({ 
      success: true, 
      stamp: {
        ...stampData,
        imageUrl: facility.stampImage,
        location: facility.name,
        position: facility.position
      }
    });
  } catch (error) {
    console.error('Stamp obtain error:', error);
    return NextResponse.json({ success: false, error: 'スタンプの取得に失敗しました' }, { status: 500 });
  }
}