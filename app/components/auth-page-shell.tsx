'use client';

import { useEffect, useState } from 'react';
import AuthForm from './auth-form';
import LanguageSwitcher from './language-switcher';
import { Language, languages } from '../i18n';
import SiteHeader from './site-header';

export default function AuthPageShell({ mode }: { mode: 'login' | 'register' }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem('al-aroum-language') as Language | null;
    return saved && languages.some((item) => item.code === saved) ? saved : 'en';
  });
  useEffect(() => {
    const saved = window.localStorage.getItem('al-aroum-language') as Language | null;
    if (saved && languages.some((item) => item.code === saved)) setLanguage(saved);
    const onChange = (event: Event) => setLanguage((event as CustomEvent<Language>).detail);
    window.addEventListener('language-change', onChange);
    return () => window.removeEventListener('language-change', onChange);
  }, []);
  return <><SiteHeader minimal/><AuthForm mode={mode} language={language}/></>;
}
