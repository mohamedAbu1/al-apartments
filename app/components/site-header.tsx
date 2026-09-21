'use client';

import Link from 'next/link';
import { Menu, Moon, Sun } from 'lucide-react';
import BrandLogo from './brand-logo';
import { useSiteTheme } from './theme-provider';
import LanguageSwitcher from './language-switcher';
import { useState } from 'react';

type HeaderSection = 'default' | 'trip' | 'stay' | 'buy-home' | 'land';
type NavItem = { label: string; href: string };

const sectionNavigation: Record<HeaderSection, NavItem[]> = {
  default: [{ label: 'Destinations', href: '/destinations' }, { label: 'Experiences', href: '/experiences' }, { label: 'Deals', href: '/deals' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }],
  trip: [{ label: 'Destinations', href: '/destinations' }, { label: 'Experiences', href: '/experiences' }, { label: 'Deals', href: '/deals' }, { label: 'Travel FAQ', href: '/faq' }, { label: 'Contact', href: '/contact' }],
  stay: [{ label: 'Find a stay', href: '/search?mode=stay' }, { label: 'Destinations', href: '/destinations' }, { label: 'Offers', href: '/deals' }, { label: 'Booking guide', href: '/faq' }, { label: 'Contact', href: '/contact' }],
  'buy-home': [{ label: 'Homes & chalets', href: '/search?mode=buy-home' }, { label: 'Ownership guide', href: '/#experiences' }, { label: 'List a property', href: '/contact' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }],
  land: [{ label: 'Land opportunities', href: '/search?mode=land' }, { label: 'Decision guide', href: '/#experiences' }, { label: 'List your land', href: '/contact' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }],
};

export default function SiteHeader({ minimal = false, section = 'default' }: { minimal?: boolean; section?: HeaderSection }) {
  const { darkMode, toggleTheme } = useSiteTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = sectionNavigation[section];
  return <header className={`site-header ${minimal ? 'minimal' : ''} header-section-${section}`}><Link href="/" className="travel-logo"><BrandLogo/></Link>{!minimal && <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>{navigation.map((item) => <Link href={item.href} key={`${item.label}-${item.href}`}>{item.label}</Link>)}</nav>}<div className="site-header-actions"><LanguageSwitcher dark={darkMode}/><button aria-label="Toggle theme" className="theme-toggle" onClick={toggleTheme}>{darkMode ? <Sun size={16}/> : <Moon size={16}/>}</button>{!minimal && <Link href="/login" className="header-login">Sign in</Link>}{!minimal && <Link href={`/search${section === 'default' ? '' : `?mode=${section}`}`} className="header-cta">Search</Link>}<button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}><Menu size={20}/></button></div></header>;
}
