'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
import type { AppSection } from '../lib/routes';

export default function ContactPage() {
  const whatsappHref = 'https://wa.me/201038822537?text=Hello%20Montu%20Travel%2C%20I%27d%20like%20to%20get%20in%20touch.';
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [section, setSection] = useState<AppSection | 'default'>('default');
  useEffect(() => { const mode = new URLSearchParams(window.location.search).get('mode'); if (mode === 'trip' || mode === 'stay' || mode === 'buy-home' || mode === 'land') setSection(mode); }, []);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: 'contact', name: form.get('name'), email: form.get('email'), message: form.get('message') }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to send message.');
      setSent(true);
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Unable to send message.'); }
    finally { setBusy(false); }
  };
  return <main className="inner-page"><SiteHeader section={section}/><section className="contact-layout"><div><span className="eyebrow">WE ARE HERE TO HELP</span><h1>Let’s plan your<br/><em>next story.</em></h1><p>Have a question about a place, a booking, or listing your property? Our team is ready to help.</p><div className="contact-options"><a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={18}/><strong>Chat with us on WhatsApp<small>+20 10 3882 2537 · Usually replies in minutes</small></strong></a><a href="tel:+201038822537"><Phone size={18}/><strong>Call us<small>+20 10 3882 2537</small></strong></a><a href="mailto:info@montutraveleg.com"><Mail size={18}/><strong>Email us<small>info@montutraveleg.com</small></strong></a></div></div>{sent ? <div className="success-notice" role="status">Thanks — your message has been received. Our team will contact you shortly.</div> : <form className="contact-form" onSubmit={submit}><label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input name="email" required type="email" placeholder="name@example.com"/></label><label>How can we help?<textarea name="message" required rows={5} placeholder="Tell us a little about your request"/></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-cta" disabled={busy} type="submit">{busy ? 'Sending...' : 'Send message'}</button></form>}</section><SiteFooter/></main>;
}
