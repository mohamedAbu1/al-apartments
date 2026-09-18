'use client';

import { Check, ChevronDown, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const options = ['1', '2', '3', '4', '5'];
export default function TravelerPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const close = (event: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false); }; document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close); }, []);
  return <div ref={rootRef} className={`search-item traveler-picker ${open ? 'is-open' : ''}`}><Users size={21}/><div className="traveler-picker-control"><small>Travelers</small><button type="button" className="traveler-trigger" onClick={() => setOpen((current) => !current)} aria-haspopup="listbox" aria-expanded={open}><span>{value} {value === '1' ? 'Traveler' : 'Travelers'}</span><ChevronDown size={14}/></button><input type="hidden" name="travelers" value={value}/>{open && <div className="traveler-menu" role="listbox" aria-label="Travelers">{options.map((option) => <button type="button" role="option" aria-selected={value === option} className={value === option ? 'selected' : ''} key={option} onClick={() => { onChange(option); setOpen(false); }}><span>{option} {option === '1' ? 'Traveler' : 'Travelers'}</span>{value === option && <Check size={14}/>}</button>)}</div>}</div></div>;
}
