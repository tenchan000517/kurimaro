// app/api/stamps/verify.js
import { testFacilities } from '@/lib/testData';
import { isWithinRange } from '@/lib/location';

export async function POST(request) {
  const { facilityId, latitude, longitude } = await request.json();
  
  let facility;
  
  // DBが存在する場合はDBから、なければテストデータから施設を取得
  try {
    // DynamoDB実装時のために準備
    facility = await getFacilityFromDB(facilityId);
  } catch (error) {
    // フォールバック
    facility = testFacilities.find(f => f.id === facilityId);
  }

  if (!facility) {
    return Response.json({ canObtain: false, error: 'Facility not found' });
  }

  const canObtain = isWithinRange(latitude, longitude, facility);
  
  return Response.json({ canObtain });
}