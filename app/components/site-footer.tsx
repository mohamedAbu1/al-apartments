'use client';

import Link from 'next/link';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Language, languages, siteTranslations } from '../i18n';
import LanguageSwitcher from './language-switcher';

export default function SiteFooter() {
  const [language, setLanguage] = useState<Language>('en');
  useEffect(() => {
    const saved = window.localStorage.getItem('al-aroum-language') as Language | null;
    if (saved && languages.some((item) => item.code === saved)) setLanguage(saved);
    const onChange = (event: Event) => setLanguage((event as CustomEvent<Language>).detail);
    window.addEventListener('language-change', onChange);
    return () => window.removeEventListener('language-change', onChange);
  }, []);
  const t = siteTranslations[language];
  return <footer className="professional-footer"><div className="footer-main"><div className="footer-brand"><Link href="/" className="travel-logo"><span className="logo-mark">A</span><span><strong>Al-Aroum</strong><small>TRAVEL & STAYS</small></span></Link><p>{t.footerTagline}</p><div className="footer-social"><a aria-label="Instagram"><Instagram size={16}/></a><a aria-label="Facebook"><Facebook size={16}/></a><a aria-label="LinkedIn"><Linkedin size={16}/></a></div></div><div className="footer-column"><h3>{t.explore}</h3><Link href="/destinations">{t.navDestinations}</Link><Link href="/experiences">{t.navExperiences}</Link><Link href="/deals">{t.navDeals}</Link><Link href="/search">{t.search}</Link></div><div className="footer-column"><h3>{t.company}</h3><Link href="/about">{t.navAbout}</Link><Link href="/contact">{t.navContact}</Link><Link href="/faq">{t.faq}</Link><Link href="/register">Create account</Link></div><div className="footer-newsletter"><h3>{t.newsletter}</h3><p>{t.newsletterText}</p><form><div><Mail size={15}/><input aria-label={t.emailPlaceholder} placeholder={t.emailPlaceholder}/></div><button aria-label={t.subscribe}><ArrowRight size={16}/></button></form><LanguageSwitcher/></div></div><div className="footer-bottom"><span>© 2026 Al-Aroum. All rights reserved.</span><span><Link href="/">{t.privacy}</Link><Link href="/">{t.terms}</Link></span></div></footer>;
}
