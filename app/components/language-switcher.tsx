'use client';

import { Check, ChevronDown, Globe2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { languages, Language, translations } from '../i18n';

export default function LanguageSwitcher({ dark = true }: { dark?: boolean }) {
  const [language, setLanguage] = useState<Language>('en');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const saved = window.localStorage.getItem('al-aroum-language') as Language | null;
    if (saved && languages.some((item) => item.code === saved)) { setLanguage(saved); document.documentElement.lang = saved; document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'; document.body.classList.toggle('rtl', saved === 'ar'); }
    const onChange = (event: Event) => setLanguage((event as CustomEvent<Language>).detail);
    const onOutside = (event: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false); };
    window.addEventListener('language-change', onChange);
    document.addEventListener('mousedown', onOutside);
    return () => { window.removeEventListener('language-change', onChange); document.removeEventListener('mousedown', onOutside); };
  }, []);
  const changeLanguage = (next: Language) => {
    setLanguage(next); setOpen(false); window.localStorage.setItem('al-aroum-language', next);
    document.documentElement.lang = next; document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'; document.body.classList.toggle('rtl', next === 'ar');
    window.dispatchEvent(new CustomEvent('language-change', { detail: next }));
  };
  const current = languages.find((item) => item.code === language) || languages[0];
  return <div ref={rootRef} className={`language-switcher ${dark ? 'dark' : ''} ${open ? 'is-open' : ''}`}><button type="button" className="language-trigger" onClick={() => setOpen((value) => !value)} aria-haspopup="listbox" aria-expanded={open}><Globe2 size={15}/><span>{current.nativeName}</span><ChevronDown size={13}/></button>{open && <div className="language-menu" role="listbox" aria-label={translations[language].language}>{languages.map((item) => <button type="button" role="option" aria-selected={item.code === language} className={item.code === language ? 'selected' : ''} key={item.code} onClick={() => changeLanguage(item.code)}><span>{item.nativeName}</span>{item.code === language && <Check size={14}/>}</button>)}</div>}</div>;
}
