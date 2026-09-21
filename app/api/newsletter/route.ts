import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ message: 'Please enter a valid email.' }, { status: 400 });
    await prisma.newsletterSubscriber.upsert({ where: { email }, update: {}, create: { email } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Newsletter error', error);
    return NextResponse.json({ message: 'The subscription service is temporarily unavailable.' }, { status: 503 });
  }
}
