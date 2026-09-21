'use client';

import { CalendarCheck, Heart, MessageCircle, X } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function BookingActions({ propertyId, propertyTitle }: { propertyId: string; propertyTitle: string }) {
  const [mode, setMode] = useState<'booking' | 'contact' | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(() => typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('al-aroum-favorites') || '[]').includes(propertyId));
  const toggleSaved = () => {
    const list: string[] = JSON.parse(window.localStorage.getItem('al-aroum-favorites') || '[]');
    const next = list.includes(propertyId) ? list.filter((id) => id !== propertyId) : [...list, propertyId];
    window.localStorage.setItem('al-aroum-favorites', JSON.stringify(next));
    setSaved(next.includes(propertyId));
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: mode, propertyId, propertyTitle, name: form.get('name'), email: form.get('email'), message: form.get('message'), viewingDate: form.get('viewingDate') }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to send request.');
      setSent(true);
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Unable to send request.'); }
    finally { setBusy(false); }
  };
  const close = () => { setMode(null); setSent(false); setError(''); };
  return <><div className="mt-6 grid gap-3"><button className="gradient-button flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold" onClick={() => setMode('contact')}><MessageCircle size={18}/> Contact owner</button><button className="secondary-button flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold" onClick={() => setMode('booking')}><CalendarCheck size={18}/> Book a viewing</button><button className="secondary-button flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold" onClick={toggleSaved}><Heart size={18} fill={saved ? 'currentColor' : 'none'}/> {saved ? 'Saved to favorites' : 'Save to favorites'}</button></div><p className="muted-text mt-5 text-center text-xs">Requests are sent securely to the Al-Aroum team.</p>{mode && <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5" role="dialog" aria-modal="true" aria-label={mode === 'booking' ? 'Book a viewing' : 'Contact owner'}><div className="contact-card w-full max-w-md rounded-3xl p-6"><button className="float-right" onClick={close} aria-label="Close"><X size={18}/></button>{sent ? <div className="success-notice" role="status">Your {mode === 'booking' ? 'viewing request' : 'message'} for {propertyTitle} has been sent. Our team will contact you shortly.</div> : <form onSubmit={submit}><h2 className="text-2xl font-bold">{mode === 'booking' ? 'Book a viewing' : 'Contact owner'}</h2><p className="muted-text mt-2">{propertyTitle}</p>{mode === 'booking' && <label className="block"><span className="sr-only">Viewing date</span><input name="viewingDate" className="mt-5 w-full" required type="date" min={new Date().toISOString().split('T')[0]}/></label>}<input name="name" className="mt-3 w-full" required type="text" placeholder="Your name"/><input name="email" className="mt-3 w-full" required type="email" placeholder="Email address"/>{mode === 'contact' && <textarea name="message" className="mt-3 w-full" required rows={4} placeholder="Your message"/>}{error && <p className="form-error mt-3" role="alert">{error}</p>}<button className="gradient-button mt-5 w-full rounded-full px-5 py-3 font-bold" disabled={busy} type="submit">{busy ? 'Sending...' : 'Send request'}</button></form>}</div></div>}</>;
}
