'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Music2, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Language, languages, siteTranslations } from '../i18n';
import LanguageSwitcher from './language-switcher';
import NewsletterForm from './newsletter-form';
import BrandLogo from './brand-logo';
import { routes, type AppSection } from '../lib/routes';

export default function SiteFooter({ section = 'default' }: { section?: AppSection | 'default' }) {
  const [language, setLanguage] = useState<Language>('en');
  useEffect(() => {
    const saved = window.localStorage.getItem('montu-travel-language') as Language | null;
    if (saved && languages.some((item) => item.code === saved)) setLanguage(saved);
    const onChange = (event: Event) => setLanguage((event as CustomEvent<Language>).detail);
    window.addEventListener('language-change', onChange);
    return () => window.removeEventListener('language-change', onChange);
  }, []);
  const t = siteTranslations[language];
  const sectionMode = section === 'default' ? undefined : section;
  const homeHref = routes.home(sectionMode);
  const aboutHref = `/about${sectionMode ? `?mode=${sectionMode}` : ''}`;
  const contactHref = `/contact${sectionMode ? `?mode=${sectionMode}` : ''}`;
  return <footer className="professional-footer"><div className="footer-main"><div className="footer-brand"><Link href={homeHref} className="travel-logo footer-logo"><BrandLogo/></Link><p>{t.footerTagline}</p><div className="footer-social"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16}/></a><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={16}/></a><a href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={16}/></a><a href="mailto:hello@montu-travel.com" aria-label="Email Montu Travel"><Mail size={16}/></a><a href="https://www.tripadvisor.com" target="_blank" rel="noreferrer" aria-label="Tripadvisor"><Star size={16}/></a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16}/></a></div></div><div className="footer-column"><h3>{t.explore}</h3><Link href={sectionMode === 'trip' ? '/travel/destinations' : sectionMode ? routes.search(sectionMode) : '/destinations'}>Trips &amp; destinations</Link><Link href={sectionMode === 'trip' ? '/stays' : sectionMode ? routes.sectionGuide(sectionMode) : '/experiences'}>Hotels</Link><Link href={sectionMode === 'trip' ? '/homes' : sectionMode ? routes.sectionGuide(sectionMode) : '/deals'}>Rental homes</Link><Link href={routes.search(sectionMode)}>{t.search}</Link></div><div className="footer-column"><h3>{t.company}</h3><Link href={aboutHref}>{t.navAbout}</Link><Link href={contactHref}>{t.navContact}</Link><Link href={`/faq${sectionMode ? `?mode=${sectionMode}` : ''}`}>{t.faq}</Link><Link href="/register">Create account</Link><Link href="/privacy-policy">Privacy policy</Link><Link href="/cancellation-policy">Cancellation policy</Link></div><div className="footer-newsletter"><h3>{t.newsletter}</h3><p>{t.newsletterText}</p><NewsletterForm compact label={t.subscribe}/><LanguageSwitcher/></div></div><div className="footer-bottom"><span>© 2026 Montu Travel. All rights reserved.</span><span><Link href="/privacy-policy">Privacy</Link><Link href="/terms">{t.terms}</Link><Link href="/cancellation-policy">Cancellation</Link></span></div></footer>;
}
