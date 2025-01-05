// app/api/facilities/route.js
import { getFacilitiesByPrefecture } from '@/lib/dynamodb';
import { testFacilities } from '@/lib/testData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const prefecture = searchParams.get('prefecture');

  try {
    let facilities;
    if (process.env.DYNAMODB_FACILITIES_TABLE) {
      facilities = await getFacilitiesByPrefecture(prefecture);
    } else {
      facilities = prefecture 
        ? testFacilities.filter(f => f.prefecture === prefecture)
        : testFacilities;
    }
    return Response.json({ facilities });
  } catch (error) {
    console.error('Error fetching facilities:', error);
    return Response.json({ 
      error: 'Failed to fetch facilities' 
    }, { status: 500 });
  }
}