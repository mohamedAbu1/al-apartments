'use client';

import Link from 'next/link';
import { ArrowLeft, Menu, Moon, Sun } from 'lucide-react';
import BrandLogo from './brand-logo';
import UserAvatar from './user-avatar';
import { useSiteTheme } from './theme-provider';
import LanguageSwitcher from './language-switcher';
import { useEffect, useState } from 'react';
import { routes } from '../lib/routes';

type HeaderSection = 'default' | 'trip' | 'stay' | 'buy-home' | 'land';
type NavItem = { label: string; href: string };
type HeaderUser = { name: string; email: string; role: string };

const sectionNavigation: Record<HeaderSection, NavItem[]> = {
  default: [{ label: 'Trips', href: '/travel' }, { label: 'Hotels', href: '/stays' }, { label: 'Rental homes', href: '/homes' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }],
  trip: [{ label: 'HOME', href: routes.home('trip') }, { label: 'TAILOR YOUR TRIP', href: '/tailor-your-trip' }, { label: 'ABOUT', href: '/about?mode=trip' }, { label: 'CONTACT', href: '/contact?mode=trip' }, { label: 'B2B', href: '/b2b' }],
  stay: [{ label: 'Find a stay', href: routes.search('stay') }, { label: 'Stay collection', href: '/stays#collection' }, { label: 'Offers', href: '/stays#guide' }, { label: 'Booking guide', href: '/faq?mode=stay' }, { label: 'Contact', href: '/contact?mode=stay' }],
  'buy-home': [{ label: 'Rental homes', href: routes.search('buy-home') }, { label: 'Rental guide', href: '/homes#guide' }, { label: 'List a property', href: routes.listProperty }, { label: 'About Us', href: '/about?mode=buy-home' }, { label: 'Contact', href: '/contact?mode=buy-home' }],
  land: [{ label: 'Trips', href: '/travel' }, { label: 'Hotels', href: '/stays' }, { label: 'Rental homes', href: '/homes' }, { label: 'Contact', href: '/contact' }],
};

export default function SiteHeader({ minimal = false, section = 'default' }: { minimal?: boolean; section?: HeaderSection }) {
  const { darkMode, toggleTheme } = useSiteTheme();
  const [user, setUser] = useState<HeaderUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<HeaderSection>(section);
  useEffect(() => { if (section !== 'default') setActiveSection(section); }, [section]);
  useEffect(() => { if (section !== 'default') return; const mode = new URLSearchParams(window.location.search).get('mode') as HeaderSection | null; if (mode && mode in sectionNavigation) setActiveSection(mode); }, [section]);
  useEffect(() => {
    let cancelled = false;
    const loadUser = () => fetch('/api/auth/me', { credentials: 'same-origin' }).then((response) => response.ok ? response.json() : null).then((result) => { if (!cancelled) setUser(result?.user || null); }).catch(() => { if (!cancelled) setUser(null); });
    loadUser();
    const onAuthChange = () => loadUser();
    window.addEventListener('auth-change', onAuthChange);
    return () => { cancelled = true; window.removeEventListener('auth-change', onAuthChange); };
  }, []);
  const navigation = sectionNavigation[activeSection];
  return <header className={`site-header ${minimal ? 'minimal' : ''} header-section-${activeSection}`}><Link href={activeSection === 'default' ? routes.home() : routes.home(activeSection)} className="travel-logo"><BrandLogo/></Link>{!minimal && activeSection !== 'default' && activeSection !== 'trip' && <Link href={routes.home()} className="header-sections"><ArrowLeft size={14}/><span>All sections</span></Link>}{!minimal && <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>{navigation.map((item) => item.href.startsWith('http') ? <a href={item.href} target="_blank" rel="noreferrer" key={`${item.label}-${item.href}`}>{item.label}</a> : <Link href={item.href} key={`${item.label}-${item.href}`}>{item.label}</Link>)}</nav>}<div className="site-header-actions"><LanguageSwitcher dark={darkMode}/><button aria-label="Toggle theme" className="theme-toggle" onClick={toggleTheme}>{darkMode ? <Sun size={16}/> : <Moon size={16}/>}</button>{!minimal && (user ? <Link href="/dashboard" className="header-user" aria-label={`Open ${user.name} profile`}><UserAvatar name={user.name} size="sm"/><span className="header-user-copy"><strong>{user.name}</strong><small>{user.role === 'admin' ? 'Admin account' : 'My account'}</small></span></Link> : <Link href={routes.login} className="header-login">Sign in</Link>)}{!minimal && <Link href={activeSection === 'default' ? routes.search() : routes.search(activeSection)} className="header-cta">Search</Link>}<button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}><Menu size={20}/></button></div></header>;
}
