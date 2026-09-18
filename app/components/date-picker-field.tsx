'use client';

import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = { label: string; value: string; onChange: (value: string) => void; min?: string; name: string; open: boolean; onToggle: () => void };
const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function parseDate(value: string) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}
function isoDate(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
function displayDate(value: string) { const date = parseDate(value); return date ? date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Add date'; }

export default function DatePickerField({ label, value, onChange, min, name, open, onToggle }: Props) {
  const selected = parseDate(value);
  const minimum = parseDate(min || '');
  const [view, setView] = useState(() => selected || minimum || new Date());
  const days = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    return [...Array(first.getDay()).fill(null), ...Array.from({ length: count }, (_, index) => new Date(view.getFullYear(), view.getMonth(), index + 1))];
  }, [view]);
  const isDisabled = (date: Date) => Boolean(minimum && date < minimum && isoDate(date) !== isoDate(minimum));
  const previousMonth = new Date(view.getFullYear(), view.getMonth() - 1, 1);
  const previousDisabled = Boolean(minimum && previousMonth < new Date(minimum.getFullYear(), minimum.getMonth(), 1));
  return <div className="search-item date-picker-item"><CalendarDays size={21}/><div className="date-picker-control"><small>{label}</small><button type="button" className={`date-picker-trigger ${value ? 'has-value' : ''}`} onClick={() => { onToggle(); setView(selected || minimum || new Date()); }} aria-expanded={open}>{displayDate(value)}<span className="calendar-glyph">▦</span></button><input type="hidden" name={name} value={value}/>{open && <div className="date-picker-popover"><div className="date-picker-header"><button type="button" disabled={previousDisabled} onClick={() => setView(previousMonth)} aria-label="Previous month"><ChevronLeft size={16}/></button><strong>{monthNames[view.getMonth()]} {view.getFullYear()}</strong><button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} aria-label="Next month"><ChevronRight size={16}/></button></div><div className="date-picker-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div><div className="date-picker-grid">{days.map((date, index) => date ? <button key={isoDate(date)} type="button" disabled={isDisabled(date)} className={selected && isoDate(selected) === isoDate(date) ? 'selected' : ''} onClick={() => { onChange(isoDate(date)); onToggle(); }}>{date.getDate()}</button> : <span key={`blank-${index}`}/>)}</div></div>}</div></div>;
}
