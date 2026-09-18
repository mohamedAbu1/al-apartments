import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { hashPassword, verifyPassword } from '../../lib/password';

const ADMIN_EMAIL = 'mohamedahmed33m11@gmail.com';
const SESSION_DAYS = 30;
const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const error = (message: string, status: number) => NextResponse.json({ message }, { status });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mode = body?.mode === 'login' ? 'login' : 'register';
    const email = text(body?.email).toLowerCase();
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) return error('Invalid email or password.', 400);

    let user = await prisma.user.findUnique({ where: { email } });
    const role = email === ADMIN_EMAIL ? 'admin' : 'user';
    if (mode === 'register') {
      if (!text(body?.fullName)) return error('Full name is required.', 400);
      if (user) return error('An account with this email already exists.', 409);
      user = await prisma.user.create({ data: {
        fullName: text(body.fullName), email, phone: text(body.phone) || null,
        passwordHash: await hashPassword(password), role,
      }});
    } else {
      if (!user || !(await verifyPassword(password, user.passwordHash))) return error('Email or password is incorrect.', 401);
      if (user.email === ADMIN_EMAIL && user.role !== 'admin') user = await prisma.user.update({ where: { id: user.id }, data: { role: 'admin' } });
    }

    const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
    const token = randomBytes(48).toString('hex');
    await prisma.authSession.create({ data: { token, userId: user.id, expiresAt } });
    const result = NextResponse.json({ user: { id: user.id, name: user.fullName, email: user.email, role: user.role, isAdmin: user.role === 'admin' } });
    result.cookies.set('al-aroum-session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', expires: expiresAt, path: '/' });
    return result;
  } catch (err) {
    console.error('Authentication error', err);
    return error('Database connection is not configured. Add DATABASE_URL to .env and run prisma db push.', 503);
  }
}
