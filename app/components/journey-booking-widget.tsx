'use client';

import { ChevronLeft, ChevronRight, Minus, Plus, CalendarDays, MessageCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = { title: string; priceValue: number; priceLabel: string; whatsappBase: string };

const money = (value: number, currency: string) => `${currency} ${Math.round(value).toLocaleString('en-US')}`;

export default function JourneyBookingWidget({ title, priceValue, priceLabel, whatsappBase }: Props) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [month, setMonth] = useState(() => new Date());
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const currency = priceLabel.match(/\b(EGP|USD|EUR|GBP)\b/i)?.[1].toUpperCase() || 'EGP';
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const days = useMemo(() => Array.from({ length: firstDay + daysInMonth }, (_, index) => index < firstDay ? null : index - firstDay + 1), [firstDay, daysInMonth]);
  const total = adults * priceValue + children * priceValue * .5;
  const nights = checkIn && checkOut ? Math.max(0, Math.round((new Date(`${checkOut}T00:00:00`).getTime() - new Date(`${checkIn}T00:00:00`).getTime()) / 86400000)) : 0;
  const monthLabel = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const iso = (day: number) => `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const selectDay = (day: number) => {
    const value = iso(day);
    if (value < todayKey) return;
    if (!checkIn || (checkIn && checkOut)) { setCheckIn(value); setCheckOut(''); return; }
    if (value < checkIn) { setCheckIn(value); setCheckOut(''); return; }
    setCheckOut(value);
  };
  const whatsappSeparator = whatsappBase.includes('?') ? '&' : '?';
  const whatsappHref = `${whatsappBase}${whatsappSeparator}text=${encodeURIComponent(`Hello Montu Travel, I would like to reserve "${title}" for ${adults} adult${adults === 1 ? '' : 's'} and ${children} child${children === 1 ? '' : 'ren'}. Check-in: ${checkIn || 'to be confirmed'}; check-out: ${checkOut || 'to be confirmed'}. Please confirm availability and the final quote.`)}`;

  const isCurrentMonth = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();
  return <section className="journey-booking-widget journey-book-card" aria-label="Plan your dates">
    <span className="eyebrow">PLAN YOUR DATES</span><h2>Reserve your journey.</h2><p className="journey-booking-intro">Choose your group size first, then select your preferred dates. We confirm availability with you on WhatsApp.</p>
    <div className="journey-guest-controls"><div><span>Adults <small>AGE 6+</small></span><div><button type="button" aria-label="Decrease adults" disabled={adults <= 1} onClick={() => setAdults(Math.max(1, adults - 1))}><Minus size={13} /></button><strong>{adults}</strong><button type="button" aria-label="Increase adults" onClick={() => setAdults(adults + 1)}><Plus size={13} /></button></div></div><div><span>Children <small>UNDER 12</small></span><div><button type="button" aria-label="Decrease children" disabled={children <= 0} onClick={() => setChildren(Math.max(0, children - 1))}><Minus size={13} /></button><strong>{children}</strong><button type="button" aria-label="Increase children" onClick={() => setChildren(children + 1)}><Plus size={13} /></button></div></div></div>
    <div className="journey-calendar"><div className="journey-calendar-head"><button type="button" aria-label="Previous month" disabled={isCurrentMonth} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft size={17} /></button><div><span>CHOOSE YOUR DATES</span><strong>{monthLabel}</strong></div><button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight size={17} /></button></div><p className="journey-calendar-note">Prices shown are estimates only; availability is confirmed by our travel planner.</p><div className="journey-calendar-week"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div><div className="journey-calendar-grid">{days.map((day, index) => day ? <button type="button" key={day} disabled={iso(day) < todayKey} aria-label={`${iso(day)}, estimated price ${money(priceValue, currency)}`} aria-selected={checkIn === iso(day) || checkOut === iso(day)} className={`${iso(day) < todayKey ? 'past' : ''}${checkIn === iso(day) ? ' selected start' : ''}${checkOut === iso(day) ? ' selected end' : ''}`} onClick={() => selectDay(day)}><strong>{day}</strong><small>est. {money(priceValue * (1 + ((day % 5) - 2) * .015), currency).replace(`${currency} `, '')}</small></button> : <span key={`empty-${index}`} />)}</div><div className="journey-date-fields"><div><span>CHECK-IN</span><strong>{checkIn || 'Select date'}</strong></div><div><span>CHECK-OUT</span><strong>{checkOut || 'Select date'}</strong></div></div></div>
    <div className="journey-booking-summary"><div><span>Booking summary</span><strong>{title}</strong><small>Adults: {adults} · Children: {children}{nights ? ` · ${nights} night${nights === 1 ? '' : 's'}` : ' · Select dates for a stay estimate'}</small></div><div><span>Total estimate</span><strong>{money(total, currency)}</strong></div></div>
    <a href={whatsappHref} target="_blank" rel="noreferrer" className="journey-book-button"><MessageCircle size={16} /> Request availability</a><small className="journey-booking-footnote"><CalendarDays size={13} /> {priceLabel}. Final price is confirmed after date and room availability.</small>
  </section>;
}
