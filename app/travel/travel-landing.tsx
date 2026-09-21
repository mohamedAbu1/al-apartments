'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Camera, Compass, Crown, Dumbbell, MapPin, Mountain, Palmtree, ShieldCheck, Sparkles, Waves, Users } from 'lucide-react';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
import { routes } from '../lib/routes';

const categories = [
  { title: 'Beach escapes', text: 'Red Sea shores, clear water, and slow mornings.', icon: Waves, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=88', query: 'Marsa Alam' },
  { title: 'Culture & history', text: 'Ancient stories, museums, and local guides.', icon: Camera, image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=700&q=88', query: 'Luxor' },
  { title: 'Adventure', text: 'Desert trails, diving, and days outside.', icon: Mountain, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=88', query: 'Dahab' },
  { title: 'Oasis retreats', text: 'Palm shade, natural springs, and quiet space.', icon: Palmtree, image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=700&q=88', query: 'Siwa Oasis' },
  { title: 'Family holidays', text: 'Easy days and thoughtful stays for everyone.', icon: Users, image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=88', query: 'North Coast' },
  { title: 'Luxury itineraries', text: 'Private transfers, fine stays, and elevated details.', icon: Crown, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=88', query: 'Sharm El Sheikh' },
];

const journeys = [
  { title: 'Red Sea, at your own pace', place: 'Hurghada · El Gouna · Giftun', days: '5 days / 4 nights', price: 'From EGP 28,500', rating: '4.9', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1100&q=90', tag: 'BEST FOR THE SEA' },
  { title: 'The Nile & ancient Egypt', place: 'Cairo · Luxor · Aswan', days: '7 days / 6 nights', price: 'From EGP 42,900', rating: '4.8', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1100&q=90', tag: 'EDITOR’S ROUTE' },
  { title: 'Sinai, beyond the beach', place: 'Dahab · St. Catherine · Nuweiba', days: '6 days / 5 nights', price: 'From EGP 31,750', rating: '4.9', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1100&q=90', tag: 'ADVENTURE PICK' },
];

const destinations = [
  ['Cairo', 'History, design, and a city that never stands still.', 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=88'],
  ['Luxor', 'The world’s greatest open-air museum.', 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=88'],
  ['Sharm El Sheikh', 'Coral reefs, warm water, and polished resorts.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=88'],
  ['Siwa Oasis', 'A slower rhythm among palms and natural springs.', 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=900&q=88'],
];

const heroSlides = [
  { kicker: 'THE AL-AROUM TRAVEL STUDIO', title: ['See Egypt', 'with feeling.'], text: 'Thoughtful journeys, trusted local partners, and stays that turn a few days away into a story worth keeping.', note: ['Start where', 'the light is warm.'], noteText: 'Personal routes across Egypt', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1900&q=90' },
  { kicker: 'THE NILE, REIMAGINED', title: ['Follow the river', 'through time.'], text: 'Sail from ancient temples to quiet river mornings with a route shaped around Egypt’s most enduring stories.', note: ['Let the Nile', 'set the pace.'], noteText: 'Cairo, Luxor, and Aswan', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1900&q=90' },
  { kicker: 'RED SEA ESCAPES', title: ['Find your blue', 'horizon.'], text: 'Trade the rush for reef mornings, warm water, and a few beautifully planned days by the Red Sea.', note: ['Stay close to', 'the open water.'], noteText: 'Hurghada, El Gouna, and Marsa Alam', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1900&q=90' },
  { kicker: 'DESERT & OASIS', title: ['Take the road', 'less hurried.'], text: 'Move through palm shade, desert light, and places where the best part of the day is simply having time.', note: ['Make room for', 'the unexpected.'], noteText: 'Siwa, Dahab, and Sinai', image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1900&q=90' },
];

export default function TravelLanding() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hero = heroSlides[heroIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => setHeroIndex((index) => (index + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return <main className="travel-studio-page"><SiteHeader section="trip"/>
    <section className="travel-studio-hero" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={() => setIsPaused(false)} aria-label="Featured Egypt journeys">
      <div className="travel-hero-backgrounds" aria-hidden="true">{heroSlides.map((slide, index) => <div className={`travel-hero-background ${index === heroIndex ? 'active' : ''}`} key={slide.kicker} style={{ backgroundImage: `url(${slide.image})` }}/>)}</div>
      <div className="travel-studio-hero-copy" key={hero.kicker}><span className="travel-studio-kicker"><Sparkles size={14}/> {hero.kicker}</span><h1>{hero.title[0]}<br/><em>{hero.title[1]}</em></h1><p>{hero.text}</p><div className="travel-studio-actions"><Link href={routes.search('trip')} className="primary-cta">Build my journey <ArrowRight size={15}/></Link><Link href="#journeys" className="travel-studio-outline">Browse curated trips <ArrowRight size={15}/></Link></div><div className="travel-studio-proof"><span><strong>24</strong> destinations</span><span><strong>180+</strong> experiences</span><span><strong>4.9/5</strong> guest rating</span></div></div>
      <div className="travel-hero-controls"><div className="travel-hero-note" key={`${hero.kicker}-note`}><span>{String(heroIndex + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</span><strong>{hero.note[0]}<br/>{hero.note[1]}</strong><small>{hero.noteText}</small></div><div className="travel-hero-navigation"><button type="button" aria-label="Previous featured journey" onClick={() => setHeroIndex((heroIndex - 1 + heroSlides.length) % heroSlides.length)}><ArrowLeft size={16}/></button><div className="travel-hero-dots">{heroSlides.map((slide, index) => <button type="button" key={slide.kicker} className={index === heroIndex ? 'active' : ''} aria-label={`Show featured journey ${index + 1}`} aria-current={index === heroIndex ? 'true' : undefined} onClick={() => setHeroIndex(index)}><span/></button>)}</div><button type="button" aria-label="Next featured journey" onClick={() => setHeroIndex((heroIndex + 1) % heroSlides.length)}><ArrowRight size={16}/></button></div></div>
    </section>

    <section className="travel-studio-section travel-category-section"><div className="travel-section-heading"><div><span className="travel-studio-kicker">CHOOSE YOUR KIND OF ESCAPE</span><h2>Travel for the<br/><em>way you want to feel.</em></h2></div><p>From an unhurried oasis to a full week under the Red Sea sun, begin with the mood and we’ll shape the details.</p></div><div className="travel-category-grid">{categories.map(({ title, text, icon: Icon, image, query }) => <Link href={`${routes.search('trip')}&location=${encodeURIComponent(query)}`} className="travel-category-card" key={title} style={{ backgroundImage: `linear-gradient(0deg,rgba(3,18,31,.9),rgba(3,18,31,.05) 70%),url(${image})` }}><span className="travel-category-icon"><Icon size={18}/></span><div><strong>{title}</strong><small>{text}</small></div><ArrowRight size={16}/></Link>)}</div></section>

    <section className="travel-studio-section travel-journeys-section" id="journeys"><div className="travel-section-heading"><div><span className="travel-studio-kicker">CURATED JOURNEYS</span><h2>Three ways to<br/><em>start exploring.</em></h2></div><Link href={routes.search('trip')} className="travel-studio-outline">View all journeys <ArrowRight size={15}/></Link></div><div className="travel-journey-grid">{journeys.map((journey) => <Link href={`${routes.search('trip')}&location=${encodeURIComponent(journey.place.split(' · ')[0])}`} className="travel-journey-card" key={journey.title}><div className="travel-journey-image" style={{ backgroundImage: `linear-gradient(0deg,rgba(3,18,31,.88),rgba(3,18,31,.05) 75%),url(${journey.image})` }}><span>{journey.tag}</span><strong>★ {journey.rating}</strong></div><div className="travel-journey-body"><h3>{journey.title}</h3><p><MapPin size={13}/>{journey.place}</p><div><span>{journey.days}</span><strong>{journey.price}</strong></div><span className="travel-card-link">View itinerary <ArrowRight size={14}/></span></div></Link>)}</div></section>

    <section className="travel-destination-band"><div className="travel-studio-section"><div className="travel-section-heading"><div><span className="travel-studio-kicker">WHERE TO NEXT</span><h2>Egypt has more<br/><em>than one rhythm.</em></h2></div><p>Hand-picked places with a clear point of view, from first-time highlights to the quieter corners we return to ourselves.</p></div><div className="travel-destination-grid">{destinations.map(([name, text, image]) => <Link href={`${routes.search('trip')}&location=${encodeURIComponent(name)}`} className="travel-destination-card" key={name} style={{ backgroundImage: `linear-gradient(0deg,rgba(3,18,31,.92),rgba(3,18,31,.08) 72%),url(${image})` }}><div><strong>{name}</strong><small>{text}</small></div><ArrowRight size={16}/></Link>)}</div></div></section>

    <section className="travel-studio-section travel-service-section"><div><span className="travel-studio-kicker">WHY BOOK WITH AL-AROUM</span><h2>A beautiful trip<br/><em>needs a clear plan.</em></h2><p>Every recommendation is supported by a real travel detail: timing, transfers, local context, or a stay we trust.</p><Link href="/contact" className="primary-cta">Talk to a travel planner <ArrowRight size={15}/></Link></div><div className="travel-service-grid"><article><ShieldCheck/><strong>Trusted partners</strong><p>Local hosts and operators reviewed for quality and consistency.</p></article><article><Compass/><strong>Human planning</strong><p>A real person helps shape the route around your priorities.</p></article><article><Dumbbell/><strong>Flexible choices</strong><p>Build around your pace, from relaxed stays to full days outside.</p></article><article><Sparkles/><strong>Small details</strong><p>Transfers, timing, and memorable stops are part of the plan.</p></article></div></section>
    <section className="travel-studio-newsletter"><div><span className="travel-studio-kicker">THE TRAVEL LETTER</span><h2>Go somewhere<br/><em>worth remembering.</em></h2><p>Monthly inspiration, new routes, and seasonal offers from Egypt.</p></div><form><input type="email" aria-label="Email address" placeholder="Your email address"/><button type="submit">Subscribe <ArrowRight size={14}/></button></form></section><SiteFooter section="trip"/>
  </main>;
}
