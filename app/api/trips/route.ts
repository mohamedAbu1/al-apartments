import { NextResponse } from 'next/server';
import { getTravelTaxonomy, getTravelTrips } from '../../lib/travel-data';

export async function GET(request: Request) {
  try {
    const language = new URL(request.url).searchParams.get('lang') || 'en';
    const trips = await getTravelTrips(language);
    const taxonomy = await getTravelTaxonomy(language);
    const reviewedTrips = trips.filter((trip) => (trip.reviewCount || 0) > 0).sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0) || Number(b.rating) - Number(a.rating));
    const featuredTrips = (reviewedTrips.length ? reviewedTrips : trips).slice(0, 6);
    return NextResponse.json({ trips, featuredTrips, ...taxonomy }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[api/trips] Failed to load travel catalog', error);
    return NextResponse.json({ message: 'Travel catalog unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
