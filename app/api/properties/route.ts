import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET() {
  try {
    const rows = await prisma.property.findMany({ orderBy: { createdAt: 'desc' } });
    const properties = rows.map((property) => ({
      id: String(property.id),
      title: property.title,
      type: property.type[0] + property.type.slice(1).toLowerCase(),
      section: property.type === 'LAND' ? 'land' : property.purpose === 'RENT' ? 'stay' : 'buy-home',
      operation: property.purpose === 'RENT' ? 'For rent' : 'For sale',
      location: property.city,
      price: `EGP ${Number(property.price).toLocaleString('en-US')}`,
      priceValue: Number(property.price),
      area: 0,
      rooms: property.beds,
      baths: 0,
      image: property.imageUrl || '/images/ai/luxury-stay-ai.png',
      status: 'New',
      description: property.description || '',
    }));
    return NextResponse.json({ properties }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[api/properties] Failed to load property catalog', error);
    return NextResponse.json({ message: 'Property catalog unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
