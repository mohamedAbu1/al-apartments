'use client';

import { Building2, House, Plane, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type Intent = 'trip' | 'stay' | 'buy-home';
type Props = { onChoose: (intent: Intent) => void };

const cards: { id: Intent; index: string; title: string; subtitle: string; detail: string; icon: React.ReactNode; image: string; theme: string }[] = [
  { id:'trip', index:'01', title:'Book a trip', subtitle:'Travel & experiences', detail:'Curated escapes for the moments you will remember.', icon:<Plane size={24}/>, image:'/images/Giza-Pyramid-Complex-Trip-1-e1668979516849.webp', theme:'welcome-trip' },
  { id:'stay', index:'02', title:'Book a hotel or home', subtitle:'Stays & hospitality', detail:'Beautiful places made for slower mornings and longer memories.', icon:<House size={24}/>, image:'/images/Lounge-area-on-Nile-Dream-720x540.jpeg', theme:'welcome-stay' },
  { id:'buy-home', index:'03', title:'Rent a home or chalet', subtitle:'Homes for rent', detail:'Find a beautiful place to stay, settle in, and feel at home.', icon:<Building2 size={24}/>, image:'/images/lounge-01.webp', theme:'welcome-home' },
];

export default function WelcomeScreen({ onChoose }: Props) {
  const [active, setActive] = useState<Intent>('stay');
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setIntroDone(true), 2300); return () => window.clearTimeout(timer); }, []);
  const current = cards.find((card) => card.id === active) || cards[1];
  return <section className={`welcome-screen ${current.theme} ${introDone ? 'welcome-ready' : 'welcome-intro'}`} aria-label="Choose your Montu Travel experience">
    <div className="welcome-ambient"/>
    <div className="welcome-intro-copy" aria-live="polite"><span className="welcome-overline">A NEW WAY TO DISCOVER</span><h1><span>Welcome to</span><em>Montu Travel.</em></h1><p>Trips, hotels, and homes for rent—made simple.</p></div>
    <div className="welcome-cards-wrap"><div className="welcome-cards-heading"><span>CHOOSE YOUR JOURNEY</span><small>Hover to explore · Click to enter</small></div><div className="welcome-cards">{cards.map((card) => { const comingSoon = card.id !== 'trip'; return <button type="button" key={card.id} className={`welcome-card ${active === card.id ? 'is-active' : ''} ${comingSoon ? 'is-coming-soon' : ''}`} aria-disabled={comingSoon} onMouseEnter={() => setActive(card.id)} onFocus={() => setActive(card.id)} onClick={() => { if (!comingSoon) onChoose(card.id); }} style={{ '--card-image': `url(${card.image})` } as React.CSSProperties}><span className="welcome-card-index">{card.index}</span><span className="welcome-card-icon">{card.icon}</span><span className="welcome-card-body"><small>{card.subtitle}</small><strong>{card.title}</strong><em>{card.detail}</em></span>{comingSoon && <span className="welcome-coming-soon">Coming soon</span>}<span className="welcome-card-action"><ArrowUpRight size={18}/></span></button>; })}</div></div>
    <div className="welcome-footer"><span>MONTU TRAVEL</span><span>TRIPS · HOTELS · RENTAL HOMES</span><span>{current.index} / 03</span></div>
  </section>;
}
