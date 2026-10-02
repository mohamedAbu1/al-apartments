import { NextResponse } from 'next/server';
import { getTravelTrips } from '../../lib/travel-data';

export async function GET() {
  try {
    return NextResponse.json({ trips: await getTravelTrips() }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[api/trips] Failed to load travel catalog', error);
    return NextResponse.json({ message: 'Travel catalog unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
