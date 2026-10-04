'use client';

import { MessageCircle, Send, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type ChatMessage = { id: string; content: string; senderType: string; userName: string; status: string; createdAt: string };
type ChatThread = { userId: string; userName: string; preview: string; unreadCount: number; lastMessageAt: string };
type User = { id: number; name: string; email: string; isAdmin: boolean };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [threadId, setThreadId] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetch('/api/auth/me', { cache: 'no-store' }).then((response) => response.ok ? response.json() : null).then((result) => setUser(result?.user || null)).catch(() => setUser(null)).finally(() => setAuthLoading(false)); }, []);
  useEffect(() => { if (!open) return; const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown); }, [open]);
  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const query = user.isAdmin && !threadId ? '' : threadId ? `?threadId=${encodeURIComponent(threadId)}` : '';
      const response = await fetch(`/api/chat${query}`, { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Chat is unavailable.');
      if (user.isAdmin && !threadId) setThreads(result.threads || []); else setMessages(result.messages || []);
      if (!user.isAdmin || threadId) await fetch('/api/chat', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ threadId }) });
      setError('');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Chat is unavailable.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { if (open && user) { load(); const timer = window.setInterval(load, 6000); return () => window.clearInterval(timer); } }, [open, user, threadId]);
  const activeTitle = useMemo(() => user?.isAdmin ? threads.find((thread) => thread.userId === threadId)?.userName || 'Customer conversations' : 'Montu Travel support', [threadId, threads, user?.isAdmin]);
  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (!content.trim() || sending || (user?.isAdmin && !threadId)) return;
    setSending(true); setError('');
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, threadId: user?.isAdmin ? threadId : undefined }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to send your message.');
      setContent('');
      if (result.message) setMessages((current) => [...current, result.message]);
      await load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to send your message.'); }
    finally { setSending(false); }
  }
  return <><button type="button" className="chat-launcher" onClick={() => setOpen(true)} aria-label="Open Montu Travel chat"><MessageCircle size={21}/><span>Chat with us</span></button>{open && <div className="chat-backdrop" onClick={() => setOpen(false)}><section className="chat-panel" role="dialog" aria-modal="true" aria-label="Montu Travel chat" onClick={(event) => event.stopPropagation()}><header className="chat-panel-header"><div><span className="chat-status-dot"/> <strong>{activeTitle}</strong><small>{user?.isAdmin ? 'Support inbox' : 'Usually replies within minutes'}</small></div><button type="button" onClick={() => setOpen(false)} aria-label="Close chat"><X size={18}/></button></header>{authLoading ? <div className="chat-signin"><MessageCircle size={28}/><p>Checking your secure session…</p></div> : !user ? <div className="chat-signin"><MessageCircle size={28}/><h2>Talk to Montu Travel</h2><p>Sign in to start a secure conversation with our travel team.</p><Link href="/login" onClick={() => setOpen(false)} className="primary-cta">Sign in to chat</Link></div> : user.isAdmin && !threadId ? <div className="chat-thread-list">{loading && !threads.length ? <p className="chat-muted">Loading conversations…</p> : threads.length ? threads.map((thread) => <button type="button" className="chat-thread-item" key={thread.userId} onClick={() => setThreadId(thread.userId)}><span className="chat-avatar">{thread.userName.slice(0, 1).toUpperCase()}</span><span><strong>{thread.userName}</strong><small>{thread.preview}</small></span>{thread.unreadCount > 0 && <b>{thread.unreadCount}</b>}</button>) : <p className="chat-muted">No customer conversations yet.</p>}</div> : <><div className="chat-message-list" aria-live="polite" aria-busy={loading}>{loading && !messages.length ? <p className="chat-muted">Loading messages…</p> : messages.length ? messages.map((message) => <div key={message.id} className={`chat-message ${message.senderType === 'admin' ? 'received' : 'sent'}`}><span>{message.content}</span><small>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></div>) : <div className="chat-empty"><MessageCircle size={22}/><strong>Start the conversation</strong><span>Tell us about your dates, destination, or travel plans.</span></div>}</div>{error && <p className="chat-error" role="alert">{error}<button type="button" onClick={load}>Try again</button></p>}<form className="chat-composer" onSubmit={send}>{user.isAdmin && <button type="button" className="chat-back-button" onClick={() => { setThreadId(''); setMessages([]); setError(''); }}>All conversations</button>}<textarea value={content} onChange={(event) => setContent(event.target.value)} maxLength={2000} rows={2} placeholder={user.isAdmin ? 'Reply to this traveller…' : 'Write your message…'} aria-label="Chat message"/><div><small>{content.length}/2000</small><button type="submit" disabled={sending || !content.trim()} aria-label="Send chat message"><Send size={16}/>{sending ? 'Sending…' : 'Send'}</button></div></form></>}</section></div>}</>;
}
