import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getTravelTrips } from '../../../lib/travel-data';

const ADMIN_EMAIL = 'montutravel96@gmail.com';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('montu-travel-session')?.value;
  if (!token) return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
  const session = await prisma.authSession.findUnique({ where: { token }, include: { user: true } });
  if (!session || session.expiresAt <= new Date() || session.user.email.toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ message: 'Admin access required.' }, { status: 403 });
  }

  const [users, journeys, reviews, messages, inquiries] = await Promise.all([
    prisma.user.count(),
    getTravelTrips().catch(() => []),
    prisma.$queryRawUnsafe<Array<{ id: string; name: string; comment: string; rating: number; created_at: Date }>>('SELECT id, name, comment, rating, created_at FROM site_reviews WHERE status = \'published\' ORDER BY created_at DESC LIMIT 5').catch(() => []),
    prisma.$queryRawUnsafe<Array<{ id: string; user_name: string | null; content: string | null; status: string | null; created_at: Date | null }>>('SELECT id, user_name, content, status, created_at FROM messages ORDER BY created_at DESC LIMIT 5').catch(() => []),
    prisma.inquiry.count({ where: { status: 'NEW' } }).catch(() => 0),
  ]);

  return NextResponse.json({
    stats: { users, journeys: journeys.length, reviews: reviews.length, messages: messages.length, inquiries },
    recentJourneys: journeys.slice(0, 5).map((trip) => ({ id: trip.id, title: trip.title, route: trip.route, price: trip.price, rating: trip.rating })),
    recentReviews: reviews,
    recentMessages: messages,
  });
}
