import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('al-aroum-session')?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });
  const session = await prisma.authSession.findUnique({ where: { token }, include: { user: true } });
  if (!session || session.expiresAt <= new Date()) return NextResponse.json({ user: null }, { status: 401 });
  const isAdmin = session.user.role === 'admin';
  return NextResponse.json({ user: { id: session.user.id, name: session.user.fullName, email: session.user.email, role: session.user.role, isAdmin, permissions: isAdmin ? ['manage_users', 'manage_properties', 'view_reports'] : ['manage_own_profile', 'save_properties', 'contact_owners'] } });
}
