'use client';

import Link from 'next/link';
import { Menu, Moon, Sun } from 'lucide-react';
import BrandLogo from './brand-logo';
import { useSiteTheme } from './theme-provider';
import LanguageSwitcher from './language-switcher';
import { useEffect, useState } from 'react';
import { routes } from '../lib/routes';

type HeaderSection = 'default' | 'trip' | 'stay' | 'buy-home' | 'land';
type NavItem = { label: string; href: string };

const sectionNavigation: Record<HeaderSection, NavItem[]> = {
  default: [{ label: 'Destinations', href: '/destinations' }, { label: 'Experiences', href: '/experiences' }, { label: 'Deals', href: '/deals' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }],
  trip: [{ label: 'Destinations', href: '/travel/destinations' }, { label: 'Experiences', href: '/travel/experiences' }, { label: 'Trip offers', href: '/travel#collection' }, { label: 'Travel FAQ', href: '/faq?mode=trip' }, { label: 'Contact', href: '/contact?mode=trip' }],
  stay: [{ label: 'Find a stay', href: routes.search('stay') }, { label: 'Stay collection', href: '/stays#collection' }, { label: 'Offers', href: '/stays#guide' }, { label: 'Booking guide', href: '/faq?mode=stay' }, { label: 'Contact', href: '/contact?mode=stay' }],
  'buy-home': [{ label: 'Homes & chalets', href: routes.search('buy-home') }, { label: 'Ownership guide', href: '/homes#guide' }, { label: 'List a property', href: routes.listProperty }, { label: 'About Us', href: '/about?mode=buy-home' }, { label: 'Contact', href: '/contact?mode=buy-home' }],
  land: [{ label: 'Land opportunities', href: routes.search('land') }, { label: 'Decision guide', href: '/land#guide' }, { label: 'List your land', href: `${routes.listProperty}?type=land` }, { label: 'About Us', href: '/about?mode=land' }, { label: 'Contact', href: '/contact?mode=land' }],
};

export default function SiteHeader({ minimal = false, section = 'default' }: { minimal?: boolean; section?: HeaderSection }) {
  const { darkMode, toggleTheme } = useSiteTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<HeaderSection>(section);
  useEffect(() => { if (section !== 'default') return; const mode = new URLSearchParams(window.location.search).get('mode') as HeaderSection | null; if (mode && mode in sectionNavigation) setActiveSection(mode); }, [section]);
  const navigation = sectionNavigation[activeSection];
  return <header className={`site-header ${minimal ? 'minimal' : ''} header-section-${activeSection}`}><Link href={activeSection === 'default' ? routes.home() : routes.home(activeSection)} className="travel-logo"><BrandLogo/></Link>{!minimal && <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>{navigation.map((item) => <Link href={item.href} key={`${item.label}-${item.href}`}>{item.label}</Link>)}</nav>}<div className="site-header-actions"><LanguageSwitcher dark={darkMode}/><button aria-label="Toggle theme" className="theme-toggle" onClick={toggleTheme}>{darkMode ? <Sun size={16}/> : <Moon size={16}/>}</button>{!minimal && <Link href={routes.login} className="header-login">Sign in</Link>}{!minimal && <Link href={activeSection === 'default' ? routes.search() : routes.search(activeSection)} className="header-cta">Search</Link>}<button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}><Menu size={20}/></button></div></header>;
}
