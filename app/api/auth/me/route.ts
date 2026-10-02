import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

const ADMIN_EMAIL = 'montutravel96@gmail.com';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('montu-travel-session')?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });
  const session = await prisma.authSession.findUnique({ where: { token }, include: { user: true } });
  if (!session || session.expiresAt <= new Date()) return NextResponse.json({ user: null }, { status: 401 });
  const isAdmin = session.user.email.toLowerCase() === ADMIN_EMAIL;
  const role = isAdmin ? 'admin' : 'user';
  if (session.user.role !== role) await prisma.user.update({ where: { id: session.user.id }, data: { role } });
  return NextResponse.json({ user: { id: session.user.id, name: session.user.fullName, email: session.user.email, role, isAdmin, permissions: isAdmin ? ['manage_users', 'manage_properties', 'view_reports'] : ['manage_own_profile', 'save_properties', 'contact_owners'] } });
}
