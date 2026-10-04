import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

const ADMIN_EMAIL = 'montutravel96@gmail.com';
const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const json = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

async function currentUser(request: NextRequest) {
  const token = request.cookies.get('montu-travel-session')?.value;
  if (!token) return null;
  const session = await prisma.authSession.findUnique({ where: { token }, include: { user: true } });
  if (!session || session.expiresAt <= new Date()) return null;
  return { id: String(session.user.id), name: session.user.fullName, email: session.user.email, isAdmin: session.user.email.toLowerCase() === ADMIN_EMAIL };
}

function present(row: Record<string, unknown>) {
  return { id: String(row.id), content: String(row.content || ''), senderType: row.sender_type || 'user', userId: row.user_id ? String(row.user_id) : null, adminId: row.admin_id ? String(row.admin_id) : null, userName: row.user_name || 'Traveller', userImage: row.user_image || null, status: row.status || 'sent', replyTo: row.reply_to ? String(row.reply_to) : null, createdAt: row.created_at, updatedAt: row.updated_at };
}

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser(request);
    if (!user) return json({ message: 'Sign in to use Montu Travel chat.', code: 'unauthorized' }, 401);
    const threadId = text(request.nextUrl.searchParams.get('threadId'));
    if (user.isAdmin && !threadId) {
      const threads = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(`SELECT m.user_id, MAX(m.created_at) AS last_message_at, SUBSTRING_INDEX(GROUP_CONCAT(m.content ORDER BY m.created_at DESC SEPARATOR '||'), '||', 1) AS preview, MAX(m.user_name) AS user_name, SUM(CASE WHEN m.sender_type = 'user' AND COALESCE(m.status, '') <> 'read' THEN 1 ELSE 0 END) AS unread_count FROM messages m WHERE m.user_id IS NOT NULL GROUP BY m.user_id ORDER BY last_message_at DESC LIMIT 50`);
      return json({ threads: threads.map((row) => ({ userId: String(row.user_id), userName: row.user_name || 'Traveller', preview: row.preview || '', unreadCount: Number(row.unread_count || 0), lastMessageAt: row.last_message_at })) });
    }
    const ownerId = user.isAdmin ? threadId : user.id;
    if (!ownerId) return json({ messages: [], unreadCount: 0 });
    const messages = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(`SELECT id, content, sender_type, user_id, admin_id, user_name, user_image, status, reply_to, created_at, updated_at FROM messages WHERE user_id = ${JSON.stringify(ownerId)} ORDER BY created_at ASC LIMIT 200`);
    const unread = user.isAdmin ? 0 : messages.filter((message) => message.sender_type === 'admin' && message.status !== 'read').length;
    return json({ messages: messages.map(present), unreadCount: unread, threadId: ownerId });
  } catch (error) {
    console.error('[api/chat] Failed to load conversations', error);
    return json({ message: 'Chat is temporarily unavailable.', code: 'database_unavailable' }, 503);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser(request);
    if (!user) return json({ message: 'Sign in to send a chat message.', code: 'unauthorized' }, 401);
    const body = await request.json();
    const content = text(body?.content);
    if (content.length < 1 || content.length > 2000) return json({ message: 'Message must be between 1 and 2,000 characters.', code: 'invalid_message' }, 400);
    const targetUserId = text(body?.threadId);
    if (user.isAdmin && !targetUserId) return json({ message: 'Choose a conversation before replying.', code: 'thread_required' }, 400);
    const userId = user.isAdmin ? targetUserId : user.id;
    const id = randomUUID();
    await prisma.$executeRawUnsafe(`INSERT INTO messages (id, created_at, content, sender_type, user_name, user_image, status, updated_at, admin_id, user_id) VALUES (${JSON.stringify(id)}, NOW(), ${JSON.stringify(content)}, ${JSON.stringify(user.isAdmin ? 'admin' : 'user')}, ${JSON.stringify(user.isAdmin ? 'Montu Travel' : user.name)}, NULL, 'sent', NOW(), ${user.isAdmin ? JSON.stringify(user.id) : 'NULL'}, ${JSON.stringify(userId)})`);
    if (!user.isAdmin) {
      await prisma.$executeRawUnsafe(`INSERT INTO notifications (id, admin_id, event_type, message, created_at, is_read, user_name, user_email, user_id, message_id, type) VALUES (${JSON.stringify(randomUUID())}, NULL, 'chat_message', ${JSON.stringify(content)}, NOW(), 0, ${JSON.stringify(user.name)}, ${JSON.stringify(user.email)}, ${JSON.stringify(user.id)}, ${JSON.stringify(id)}, 'chat')`);
    }
    const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(`SELECT id, content, sender_type, user_id, admin_id, user_name, user_image, status, reply_to, created_at, updated_at FROM messages WHERE id = ${JSON.stringify(id)} LIMIT 1`);
    return json({ message: rows[0] ? present(rows[0]) : null }, 201);
  } catch (error) {
    console.error('[api/chat] Failed to send message', error);
    return json({ message: 'Unable to send your message right now.', code: 'database_unavailable' }, 503);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await currentUser(request);
    if (!user) return json({ message: 'Sign in required.', code: 'unauthorized' }, 401);
    if (!user.isAdmin) await prisma.$executeRawUnsafe(`UPDATE messages SET status = 'read', updated_at = NOW() WHERE user_id = ${JSON.stringify(user.id)} AND sender_type = 'admin'`);
    else {
      const body = await request.json().catch(() => ({}));
      const threadId = text(body?.threadId);
      if (threadId) await prisma.$executeRawUnsafe(`UPDATE messages SET status = 'read', updated_at = NOW() WHERE user_id = ${JSON.stringify(threadId)} AND sender_type = 'user'`);
    }
    return json({ ok: true });
  } catch (error) {
    console.error('[api/chat] Failed to mark messages read', error);
    return json({ message: 'Unable to update chat status.', code: 'database_unavailable' }, 503);
  }
}
