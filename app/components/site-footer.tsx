'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Language, languages, siteTranslations } from '../i18n';
import LanguageSwitcher from './language-switcher';
import NewsletterForm from './newsletter-form';
import BrandLogo from './brand-logo';
import { routes, type AppSection } from '../lib/routes';

export default function SiteFooter({ section = 'default' }: { section?: AppSection | 'default' }) {
  const [language, setLanguage] = useState<Language>('en');
  useEffect(() => {
    const saved = window.localStorage.getItem('al-aroum-language') as Language | null;
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
  return <footer className="professional-footer"><div className="footer-main"><div className="footer-brand"><Link href={homeHref} className="travel-logo footer-logo"><BrandLogo/></Link><p>{t.footerTagline}</p><div className="footer-social"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16}/></a><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={16}/></a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16}/></a></div></div><div className="footer-column"><h3>{t.explore}</h3><Link href={sectionMode === 'trip' ? '/travel/destinations' : sectionMode ? routes.search(sectionMode) : '/destinations'}>{t.navDestinations}</Link><Link href={sectionMode === 'trip' ? '/travel/experiences' : sectionMode ? routes.sectionGuide(sectionMode) : '/experiences'}>{t.navExperiences}</Link><Link href={sectionMode ? routes.sectionGuide(sectionMode) : '/deals'}>{t.navDeals}</Link><Link href={routes.search(sectionMode)}>{t.search}</Link></div><div className="footer-column"><h3>{t.company}</h3><Link href={aboutHref}>{t.navAbout}</Link><Link href={contactHref}>{t.navContact}</Link><Link href={`/faq${sectionMode ? `?mode=${sectionMode}` : ''}`}>{t.faq}</Link><Link href="/register">Create account</Link></div><div className="footer-newsletter"><h3>{t.newsletter}</h3><p>{t.newsletterText}</p><NewsletterForm compact label={t.subscribe}/><LanguageSwitcher/></div></div><div className="footer-bottom"><span>© 2026 Al-Aroum. All rights reserved.</span><span><Link href="/privacy">{t.privacy}</Link><Link href="/terms">{t.terms}</Link></span></div></footer>;
}
