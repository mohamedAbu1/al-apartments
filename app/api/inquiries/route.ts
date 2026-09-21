import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const emailPattern = /^\S+@\S+\.\S+$/;

export async function GET(request: NextRequest) {
  const token = request.cookies.get('al-aroum-session')?.value;
  if (!token) return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
  const session = await prisma.authSession.findUnique({ where: { token }, include: { user: true } });
  if (!session || session.expiresAt <= new Date() || session.user.role !== 'admin') return NextResponse.json({ message: 'Admin access required.' }, { status: 403 });
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  return NextResponse.json({ inquiries });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const kind = body?.kind === 'viewing' ? 'VIEWING' : 'CONTACT';
    const name = text(body?.name);
    const email = text(body?.email).toLowerCase();
    const message = text(body?.message);
    const propertyId = text(body?.propertyId) || null;
    const propertyTitle = text(body?.propertyTitle) || null;
    const viewingDate = text(body?.viewingDate);

    if (name.length < 2) return NextResponse.json({ message: 'Please enter your name.' }, { status: 400 });
    if (!emailPattern.test(email)) return NextResponse.json({ message: 'Please enter a valid email.' }, { status: 400 });
    if (kind === 'VIEWING' && (!viewingDate || Number.isNaN(Date.parse(viewingDate)))) return NextResponse.json({ message: 'Please choose a valid viewing date.' }, { status: 400 });
    if (message.length > 4000) return NextResponse.json({ message: 'Your message is too long.' }, { status: 400 });

    const inquiry = await prisma.inquiry.create({ data: {
      kind, propertyId, propertyTitle, name, email, message: message || null,
      viewingDate: viewingDate ? new Date(`${viewingDate}T12:00:00`) : null,
    }});
    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error('Inquiry error', error);
    return NextResponse.json({ message: 'The service is temporarily unavailable. Please try again shortly.' }, { status: 503 });
  }
}
