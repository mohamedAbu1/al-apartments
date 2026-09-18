'use client';

import Link from 'next/link';
import { Menu, Moon, Sun } from 'lucide-react';
import { useSiteTheme } from './theme-provider';
import LanguageSwitcher from './language-switcher';
import { useState } from 'react';

export default function SiteHeader({ minimal = false }: { minimal?: boolean }) {
  const { darkMode, toggleTheme } = useSiteTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className={`site-header ${minimal ? 'minimal' : ''}`}><Link href="/" className="travel-logo"><span className="logo-mark">A</span><span><strong>Al-Aroum</strong><small>TRAVEL & STAYS</small></span></Link>{!minimal && <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}><Link href="/destinations">Destinations</Link><Link href="/experiences">Experiences</Link><Link href="/deals">Deals</Link><Link href="/about">About Us</Link><Link href="/contact">Contact</Link></nav>}<div className="site-header-actions"><LanguageSwitcher dark={darkMode}/><button aria-label="Toggle theme" className="theme-toggle" onClick={toggleTheme}>{darkMode ? <Sun size={16}/> : <Moon size={16}/>}</button>{!minimal && <Link href="/login" className="header-login">Sign in</Link>}{!minimal && <Link href="/search" className="header-cta">Search</Link>}<button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}><Menu size={20}/></button></div></header>;
}
