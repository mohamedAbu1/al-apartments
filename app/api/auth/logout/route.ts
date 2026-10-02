import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('montu-travel-session')?.value;
  if (token) await prisma.authSession.deleteMany({ where: { token } });
  const response = NextResponse.json({ ok: true });
  response.cookies.set('montu-travel-session', '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', expires: new Date(0), path: '/' });
  return response;
}
