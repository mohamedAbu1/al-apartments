'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, Building2, FileText, LandPlot, MapPin, ShieldCheck } from 'lucide-react';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';

export default function ListPropertyPage() {
  const [isLand, setIsLand] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { setIsLand(new URLSearchParams(window.location.search).get('type') === 'land'); }, []);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    const message = [`Listing request: ${form.get('title')}`, `Category: ${form.get('category')}`, `Operation: ${form.get('operation')}`, `Location: ${form.get('location')}`, `Phone: ${form.get('phone')}`, `Details: ${form.get('details')}`].join('\n');
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: 'contact', name: form.get('name'), email: form.get('email'), message }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to send listing request.');
      setSent(true);
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Unable to send listing request.'); }
    finally { setBusy(false); }
  };
  return <main className="listing-page"><SiteHeader section={isLand ? 'land' : 'buy-home'}/><section className="listing-hero"><div><span className="eyebrow">{isLand ? 'LIST YOUR LAND' : 'LIST WITH AL-AROUM'}</span><h1>{isLand ? <>Put your land<br/><em>in the right hands.</em></> : <>Let your property<br/><em>find its people.</em></>}</h1><p>{isLand ? 'Share the essential details of your land opportunity and our team will review its location, use, and documentation.' : 'Introduce your property to guests, buyers, and investors looking for something with real character.'}</p></div><div className="listing-hero-stamp"><ShieldCheck size={24}/><strong>Human review</strong><small>Every request is checked by the Al-Aroum team before publication.</small></div></section><section className="listing-layout"><div className="listing-guidance"><span className="eyebrow">A CLEARER FIRST STEP</span><h2>Tell us about<br/><em>the opportunity.</em></h2><p>Send the basics now. We will contact you for photos, documents, availability, and the details needed to prepare a complete listing.</p><div className="listing-points"><span><Building2 size={18}/><strong>Homes, villas & chalets</strong></span><span><LandPlot size={18}/><strong>Residential & agricultural land</strong></span><span><FileText size={18}/><strong>Clear information before publishing</strong></span><span><MapPin size={18}/><strong>Egypt locations welcome</strong></span></div></div>{sent ? <div className="listing-success" role="status"><ShieldCheck size={28}/><h2>Request received.</h2><p>Thank you. Our team will review the information and contact you shortly for the next step.</p><a href={isLand ? '/?mode=land' : '/?mode=buy-home'} className="primary-cta">Back to my section <ArrowRight size={15}/></a></div> : <form className="listing-form" onSubmit={submit}><h2>Property details</h2><p className="listing-form-intro">Fields marked with * are required.</p><label>Your name *<input name="name" required placeholder="Full name"/></label><label>Email address *<input name="email" required type="email" placeholder="name@example.com"/></label><label>Phone number *<input name="phone" required placeholder="+20 ..."/></label><label>Property title *<input name="title" required placeholder={isLand ? 'e.g. Dahab coastal plot' : 'e.g. Sea view chalet'}/></label><div className="listing-form-row"><label>Category *<select name="category" defaultValue={isLand ? 'Land' : 'Villa'}><option>Apartment</option><option>Villa</option><option>Chalet</option><option>Land</option><option>Commercial</option></select></label><label>Operation *<select name="operation" defaultValue="For sale"><option>For sale</option><option>For rent</option></select></label></div><label>Location *<input name="location" required placeholder="City, area, governorate"/></label><label>Tell us more<textarea name="details" required rows={5} placeholder="Area, rooms, price expectation, availability, documents, and anything important..."/></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-cta" disabled={busy} type="submit">{busy ? 'Sending request...' : 'Send listing request'} <ArrowRight size={15}/></button><small className="listing-privacy">Your information is sent securely to the Al-Aroum team.</small></form>}</section><SiteFooter/></main>;
}
