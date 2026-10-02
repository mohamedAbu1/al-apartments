import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';

export async function GET(request: NextRequest) {
  const tripId = text(new URL(request.url).searchParams.get('tripId'));
  if (!tripId) return NextResponse.json({ reviews: [] });
  try {
    const reviews = await prisma.$queryRawUnsafe<Array<{ id: string; name: string | null; comment: string | null; rating: number; avatar_url: string | null; time: string | null }>>(`SELECT id, name, comment, rating, avatar_url, time FROM reviews WHERE trip_id = ${JSON.stringify(tripId)} ORDER BY created_at DESC LIMIT 20`);
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('[api/trip-reviews] Failed to load reviews', error);
    return NextResponse.json({ reviews: [], message: 'Reviews are not available yet.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('montu-travel-session')?.value;
    if (!token) return NextResponse.json({ message: 'Please sign in before sharing a review.' }, { status: 401 });
    const session = await prisma.authSession.findUnique({ where: { token }, include: { user: true } });
    if (!session || session.expiresAt <= new Date()) return NextResponse.json({ message: 'Your session has expired. Please sign in again.' }, { status: 401 });
    const body = await request.json();
    const tripId = text(body?.tripId);
    const comment = text(body?.comment);
    const rating = Math.min(5, Math.max(1, Number(body?.rating || 5)));
    if (!tripId) return NextResponse.json({ message: 'Journey not found.' }, { status: 400 });
    if (comment.length < 10) return NextResponse.json({ message: 'Please write at least 10 characters.' }, { status: 400 });
    if (comment.length > 1000) return NextResponse.json({ message: 'Please keep your review under 1000 characters.' }, { status: 400 });
    const id = crypto.randomUUID();
    await prisma.$executeRawUnsafe(`INSERT INTO reviews (id, trip_id, user_id, comment, avatar_url, time, name, rating, created_at) VALUES (${JSON.stringify(id)}, ${JSON.stringify(tripId)}, ${JSON.stringify(String(session.user.id))}, ${JSON.stringify(comment)}, NULL, 'Just now', ${JSON.stringify(session.user.fullName)}, ${rating}, NOW())`);
    return NextResponse.json({ review: { id, name: session.user.fullName, comment, rating, time: 'Just now' } }, { status: 201 });
  } catch (error) {
    console.error('[api/trip-reviews] Failed to save review', error);
    return NextResponse.json({ message: 'Unable to save your review right now.' }, { status: 503 });
  }
}
