'use client';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return <main className="inner-page"><SiteHeader/><section className="contact-layout"><div><span className="eyebrow">WE ARE HERE TO HELP</span><h1>Let’s plan your<br/><em>next story.</em></h1><p>Have a question about a place, a booking, or listing your property? Our team is ready to help.</p><div className="contact-options"><span><Mail size={18}/><strong>Email us<small>hello@al-aroum.com</small></strong></span><span><MessageCircle size={18}/><strong>Chat with us<small>Usually replies in minutes</small></strong></span><span><Phone size={18}/><strong>Call us<small>+20 100 000 0000</small></strong></span></div></div>{sent ? <div className="success-notice">Thanks — your message has been received.</div> : <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Name<input required placeholder="Your name"/></label><label>Email<input required type="email" placeholder="name@example.com"/></label><label>How can we help?<textarea required rows={5} placeholder="Tell us a little about your request"/></label><button className="primary-cta" type="submit">Send message</button></form>}</section><SiteFooter/></main>;
}
