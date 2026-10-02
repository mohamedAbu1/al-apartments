import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET() {
  try {
    const reviews = await prisma.$queryRawUnsafe<Array<{ id: string; name: string; comment: string; rating: number; avatar_url: string | null; created_at: Date }>>(`SELECT id, name, comment, rating, avatar_url, created_at FROM site_reviews WHERE status = 'published' ORDER BY created_at DESC LIMIT 12`);
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('[api/site-reviews] Failed to load reviews', error);
    return NextResponse.json({ reviews: [], message: 'Reviews are not available yet.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('montu-travel-session')?.value;
  if (!token) return NextResponse.json({ message: 'Please sign in before sharing a review.' }, { status: 401 });

  try {
    const session = await prisma.authSession.findUnique({ where: { token }, include: { user: true } });
    if (!session || session.expiresAt <= new Date()) return NextResponse.json({ message: 'Your session has expired.' }, { status: 401 });
    const body = await request.json() as { comment?: string; rating?: number };
    const comment = String(body.comment || '').trim();
    const rating = Math.min(5, Math.max(1, Number(body.rating || 5)));
    if (comment.length < 10) return NextResponse.json({ message: 'Please write at least 10 characters.' }, { status: 400 });
    if (comment.length > 500) return NextResponse.json({ message: 'Please keep your review under 500 characters.' }, { status: 400 });
    const id = crypto.randomUUID();
    await prisma.$executeRawUnsafe(`INSERT INTO site_reviews (id, user_id, name, comment, rating, avatar_url, status, created_at) VALUES (${JSON.stringify(id)}, ${JSON.stringify(String(session.user.id))}, ${JSON.stringify(session.user.fullName)}, ${JSON.stringify(comment)}, ${rating}, NULL, 'published', NOW())`);
    return NextResponse.json({ review: { id, name: session.user.fullName, comment, rating } }, { status: 201 });
  } catch (error) {
    console.error('[api/site-reviews] Failed to save review', error);
    return NextResponse.json({ message: 'Unable to save your review right now.' }, { status: 503 });
  }
}
