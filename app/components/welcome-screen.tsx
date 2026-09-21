'use client';

import { Building2, House, Plane, Trees, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type Intent = 'trip' | 'stay' | 'buy-home' | 'land';
type Props = { onChoose: (intent: Intent) => void };

const cards: { id: Intent; index: string; title: string; subtitle: string; detail: string; icon: React.ReactNode; image: string; theme: string }[] = [
  { id:'trip', index:'01', title:'Book a trip', subtitle:'Travel & experiences', detail:'Curated escapes for the moments you will remember.', icon:<Plane size={24}/>, image:'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1000&q=90', theme:'welcome-trip' },
  { id:'stay', index:'02', title:'Book a hotel or home', subtitle:'Stays & hospitality', detail:'Beautiful places made for slower mornings and longer memories.', icon:<House size={24}/>, image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=90', theme:'welcome-stay' },
  { id:'buy-home', index:'03', title:'Buy a home or chalet', subtitle:'Homes & ownership', detail:'Find a property that feels like the beginning of something new.', icon:<Building2 size={24}/>, image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=90', theme:'welcome-home' },
  { id:'land', index:'04', title:'Buy or rent land', subtitle:'Land & investment', detail:'Space, potential, and opportunities built for the future.', icon:<Trees size={24}/>, image:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=90', theme:'welcome-land' },
];

export default function WelcomeScreen({ onChoose }: Props) {
  const [active, setActive] = useState<Intent>('stay');
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setIntroDone(true), 2300); return () => window.clearTimeout(timer); }, []);
  const current = cards.find((card) => card.id === active) || cards[1];
  return <section className={`welcome-screen ${current.theme} ${introDone ? 'welcome-ready' : 'welcome-intro'}`} aria-label="Choose your Al-Aroum experience">
    <div className="welcome-ambient"/>
    <div className="welcome-intro-copy" aria-live="polite"><span className="welcome-overline">A NEW WAY TO DISCOVER</span><h1><span>Welcome to</span><em>Al-Aroum.</em></h1><p>Travel, stay, own, and grow with us.</p></div>
    <div className="welcome-cards-wrap"><div className="welcome-cards-heading"><span>CHOOSE YOUR JOURNEY</span><small>Hover to explore · Click to enter</small></div><div className="welcome-cards">{cards.map((card) => <button type="button" key={card.id} className={`welcome-card ${active === card.id ? 'is-active' : ''}`} onMouseEnter={() => setActive(card.id)} onFocus={() => setActive(card.id)} onClick={() => onChoose(card.id)} style={{ '--card-image': `url(${card.image})` } as React.CSSProperties}><span className="welcome-card-index">{card.index}</span><span className="welcome-card-icon">{card.icon}</span><span className="welcome-card-body"><small>{card.subtitle}</small><strong>{card.title}</strong><em>{card.detail}</em></span><span className="welcome-card-action"><ArrowUpRight size={18}/></span></button>)}</div></div>
    <div className="welcome-footer"><span>AL-AROUM</span><span>TRAVEL · STAYS · PROPERTY · LAND</span><span>{current.index} / 04</span></div>
  </section>;
}
