// src/app/api/stamps/verify/route.js
import { NextResponse } from 'next/server';
import { getFacility } from '@/lib/dynamodb';
import { isWithinRange } from '@/lib/location';

export async function POST(request) {
  try {
    const body = await request.json();
    const { facilityId, latitude, longitude } = body;

    // 施設情報の取得
    const facility = await getFacility(facilityId);
    if (!facility) {
      return NextResponse.json({ 
        success: false, 
        error: '施設が見つかりません' 
      }, { status: 404 });
    }

    // 位置情報の検証
    const withinRange = isWithinRange(latitude, longitude, facility);

    return NextResponse.json({
      success: true,
      isValid: withinRange,
      facility: {
        id: facility.id,
        name: facility.name,
        distance: calculateDistance(latitude, longitude, facility.latitude, facility.longitude)
      }
    });
  } catch (error) {
    console.error('Location verification error:', error);
    return NextResponse.json({ 
      success: false, 
      error: '位置情報の検証に失敗しました' 
    }, { status: 500 });
  }
}