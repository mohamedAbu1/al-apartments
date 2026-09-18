'use client';

import { CalendarDays, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type Props = { checkIn: string; checkOut: string; onCheckInChange: (value: string) => void; onCheckOutChange: (value: string) => void; minDate: string };
const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function parse(value: string) { if (!value) return null; const [y, m, d] = value.split('-').map(Number); return new Date(y, m - 1, d); }
function iso(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
function label(value: string, empty: string) { const date = parse(value); return date ? date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : empty; }
function monthStart(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1); }

export default function DateRangePicker({ checkIn, checkOut, onCheckInChange, onCheckOutChange, minDate }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [month, setMonth] = useState(() => monthStart(parse(checkIn) || parse(minDate) || new Date()));
  const rootRef = useRef<HTMLDivElement>(null);
  const minimum = parse(minDate)!;
  const start = parse(checkIn);
  const end = parse(checkOut);
  useEffect(() => { const close = (event: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false); }; document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close); }, []);
  const calendar = (view: Date) => { const first = new Date(view.getFullYear(), view.getMonth(), 1); const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate(); return [...Array(first.getDay()).fill(null), ...Array.from({ length: count }, (_, index) => new Date(view.getFullYear(), view.getMonth(), index + 1))]; };
  const firstDays = useMemo(() => calendar(month), [month]);
  const secondMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  const secondDays = useMemo(() => calendar(secondMonth), [secondMonth]);
  const previousDisabled = monthStart(new Date(month.getFullYear(), month.getMonth() - 1, 1)) < monthStart(minimum);
  const choose = (date: Date) => {
    const value = iso(date);
    if (date < minimum) return;
    if (active === 'checkIn' || (checkIn && value < checkIn)) { onCheckInChange(value); onCheckOutChange(''); setActive('checkOut'); return; }
    onCheckOutChange(value); setOpen(false); setActive('checkIn');
  };
  const dayButton = (date: Date | null) => {
    if (!date) return <span className="range-empty" key={Math.random()}/>;
    const value = iso(date); const disabled = date < minimum || (active === 'checkOut' && !!checkIn && value < checkIn); const selected = value === checkIn || value === checkOut; const inRange = !!checkIn && !!checkOut && value > checkIn && value < checkOut;
    return <button key={value} type="button" disabled={disabled} className={`${selected ? 'selected' : ''} ${inRange ? 'in-range' : ''}`} onClick={() => choose(date)}>{selected && value === checkIn ? <span className="date-check"><Check size={10}/></span> : date.getDate()}</button>;
  };
  return <div ref={rootRef} className="date-range-picker"><div className="date-range-inputs"><div className={`range-input ${active === 'checkIn' && open ? 'active' : ''}`}><CalendarDays size={20}/><span><small>Check In</small><button type="button" onClick={() => { setActive('checkIn'); setOpen(true); }} aria-expanded={open}>{label(checkIn, 'Add date')}</button></span></div><div className="range-connector"/><div className={`range-input ${active === 'checkOut' && open ? 'active' : ''}`}><CalendarDays size={20}/><span><small>Check Out</small><button type="button" onClick={() => { setActive('checkOut'); setOpen(true); }} aria-expanded={open}>{label(checkOut, 'Add date')}</button></span></div></div><input type="hidden" name="checkIn" value={checkIn}/><input type="hidden" name="checkOut" value={checkOut}/>{open && <div className="range-calendar-popover"><div className="range-calendar-toolbar"><button type="button" disabled={previousDisabled} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Previous month"><ChevronLeft size={17}/></button><strong>{months[month.getMonth()]} {month.getFullYear()} — {months[secondMonth.getMonth()]} {secondMonth.getFullYear()}</strong><button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Next month"><ChevronRight size={17}/></button></div><div className="range-calendar-columns"><CalendarMonth title="Check In" month={month} days={firstDays} dayButton={dayButton}/><CalendarMonth title="Check Out" month={secondMonth} days={secondDays} dayButton={dayButton}/></div><div className="range-calendar-footer"><span><i className="legend-dot"/> Selected dates</span><span>{checkIn && checkOut ? `${label(checkIn, '')} – ${label(checkOut, '')}` : active === 'checkIn' ? 'Choose your arrival date' : 'Choose your departure date'}</span></div></div>}</div>;
}

function CalendarMonth({ title, month, days, dayButton }: { title: string; month: Date; days: (Date | null)[]; dayButton: (date: Date | null) => React.ReactNode }) { return <section className="range-month"><h3>{title}</h3><div className="range-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div><div className="range-days">{days.map((date, index) => <span key={date ? iso(date) : `empty-${index}`}>{dayButton(date)}</span>)}</div></section>; }
