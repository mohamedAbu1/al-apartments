import { NextResponse } from 'next/server';
import { getTravelTrips } from '../../lib/travel-data';

export async function GET() {
  try {
    return NextResponse.json({ trips: await getTravelTrips() }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ message: 'Travel catalog unavailable.' }, { status: 503 });
  }
}
