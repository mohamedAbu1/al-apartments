'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { useSiteTheme } from './components/theme-provider';
import { ArrowRight, CalendarCheck, CalendarDays, ChevronLeft, ChevronRight, CreditCard, Headphones, Landmark, MapPin, Menu, Moon, Plane, Search, ShieldCheck, Sparkles, Sun, Sunrise, Utensils, Users, X } from 'lucide-react';
import SiteFooter from './components/site-footer';
import SiteHeader from './components/site-header';
import DateRangePicker from './components/date-range-picker';
import TravelerPicker from './components/traveler-picker';

const destinations = [
  { name:'Bali, Indonesia', price:'$499', image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=90' },
  { name:'Santorini, Greece', price:'$699', image:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=90' },
  { name:'Maldives', price:'$799', image:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=90' },
  { name:'Swiss Alps', price:'$899', image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=90' },
  { name:'Cairo, Egypt', price:'$299', image:'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=90' },
  { name:'Luxor, Egypt', price:'$349', image:'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=90' },
  { name:'Sharm El Sheikh', price:'$429', image:'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=90' },
  { name:'Siwa Oasis, Egypt', price:'$319', image:'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=90' },
];

const experiences = [
  { title:'Adventure', description:'Thrilling activities in stunning locations.', icon:<Plane size={19}/> },
  { title:'Cultural Tours', description:'Immerse in local culture and traditions.', icon:<Landmark size={19}/> },
  { title:'Relaxation', description:'Unwind and relax in paradise destinations.', icon:<Sunrise size={19}/> },
  { title:'Food & Drink', description:"Savor the world's best cuisines and flavors.", icon:<Utensils size={19}/> },
];

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1800&q=90', kicker: 'YOUR NEXT ESCAPE', title: ['Explore.', 'Dream.', 'Discover.'], text: 'Find the most beautiful places around the world and make your trip unforgettable.' },
  { image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1800&q=90', kicker: 'SLOW DOWN SOMEWHERE BEAUTIFUL', title: ['Stay.', 'Breathe.', 'Reconnect.'], text: 'Thoughtful stays, warm horizons, and moments worth carrying home.' },
  { image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=90', kicker: 'THE WORLD IS WAITING', title: ['Go.', 'Wander.', 'Feel more.'], text: 'Choose a new view and let every morning become part of the story.' },
];
const todayIso = () => { const today = new Date(); return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; };

export default function Home() {
  const { darkMode } = useSiteTheme();
  const [heroIndex, setHeroIndex] = useState(0);
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [activeDestination, setActiveDestination] = useState(0);
  const [destinationSlide, setDestinationSlide] = useState(0);
  const destinationPages = Math.ceil(destinations.length / 4);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex((current) => (current + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setDestinationSlide((current) => (current + 1) % destinationPages), 5600);
    return () => window.clearInterval(timer);
  }, [destinationPages]);
  const hero = heroSlides[heroIndex];
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('location', destination);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (travelers) params.set('travelers', travelers);
    window.location.href = `/search?${params.toString()}`;
  };
  const chooseDestination = (name: string) => {
    const index = destinations.findIndex((item) => item.name === name);
    setActiveDestination(index);
    setDestinationSlide(Math.floor(index / 4));
    setDestination(name);
    document.querySelector('.travel-search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => document.querySelector<HTMLInputElement>('input[aria-label="Destination"]')?.focus(), 450);
  };

  return <main className={`travel-home ${darkMode ? 'dark-theme' : 'light-theme'}`}>
    <section className="travel-frame">
      <SiteHeader/>
      <section className="travel-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(3,17,31,.95) 0%,rgba(3,17,31,.8) 30%,rgba(3,17,31,.18) 75%),url('${hero.image}')` }}><div className="hero-copy" key={heroIndex} aria-live="polite"><div className="hero-kicker"><Sparkles size={14}/> {hero.kicker}</div><h1>{hero.title[0]}<br/>{hero.title[1]}<br/><em>{hero.title[2]}</em></h1><p>{hero.text}</p><div className="hero-ctas"><Link href="/search" className="primary-cta"><Plane size={15}/> Explore Now</Link><button className="video-cta" type="button" onClick={() => setShowVideo(true)}><span>▶</span> Watch Video</button></div></div><div className="hero-progress" aria-label={`Slide ${heroIndex + 1} of ${heroSlides.length}`}>{heroSlides.map((slide, index) => <button key={slide.kicker} type="button" aria-label={`Show slide ${index + 1}`} className={index === heroIndex ? 'active' : ''} onClick={() => setHeroIndex(index)}/>)}</div></section>
      {showVideo && <div className="luxury-video-overlay" role="dialog" aria-modal="true" aria-label="Al-Aroum travel film" onClick={() => setShowVideo(false)}><div className="luxury-video-modal" onClick={(event) => event.stopPropagation()}><button type="button" className="luxury-video-close" aria-label="Close video" onClick={() => setShowVideo(false)}><X size={20}/></button><div className="luxury-video-heading"><span>AL-ARОUM JOURNAL</span><h2>A slower way<br/><em>to see the world.</em></h2></div><video autoPlay controls playsInline poster={hero.image}><source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-a-beach-1574/1080p.mp4" type="video/mp4"/>Your browser does not support video playback.</video></div></div>}
      <form className="travel-search" action="/search" method="get" onSubmit={submitSearch}><label className="search-item"><MapPin size={21}/><span><small>Destination</small><input name="location" aria-label="Destination" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Where to?"/></span></label><DateRangePicker checkIn={checkIn} checkOut={checkOut} minDate={todayIso()} onCheckInChange={setCheckIn} onCheckOutChange={setCheckOut}/><TravelerPicker value={travelers} onChange={setTravelers}/><button className="search-submit" type="submit" aria-label="Search"><Search size={19}/></button></form>
      <section id="destinations" className="travel-section destinations-section"><div className="section-heading"><div><span className="eyebrow">TOP DESTINATIONS</span><h2>Popular Destinations</h2></div><div className="carousel-actions"><button type="button" aria-label="Previous destinations" onClick={() => setDestinationSlide((current) => (current - 1 + destinationPages) % destinationPages)}><ChevronLeft size={16}/></button><button type="button" aria-label="Next destinations" onClick={() => setDestinationSlide((current) => (current + 1) % destinationPages)}><ChevronRight size={16}/></button><Link href="/search" className="section-link">View All <ArrowRight size={14}/></Link></div></div><div className="destination-carousel" onMouseEnter={(event) => event.currentTarget.classList.add('is-paused')} onMouseLeave={(event) => event.currentTarget.classList.remove('is-paused')}><div className="destination-track" style={{ transform: `translateX(-${destinationSlide * 100}%)` }}>{Array.from({ length: destinationPages }, (_, page) => <div className="destination-slide" key={page}>{destinations.slice(page * 4, page * 4 + 4).map((destination) => <article className="destination-card" key={destination.name} style={{backgroundImage:`linear-gradient(0deg,rgba(3,18,31,.86),rgba(3,18,31,0) 70%),url(${destination.image})`}} onClick={() => chooseDestination(destination.name)} role="link" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') chooseDestination(destination.name); }}><div><strong>{destination.name}</strong><small>From {destination.price}</small></div><button type="button" aria-label={`Explore ${destination.name}`} onClick={(event) => { event.stopPropagation(); chooseDestination(destination.name); }}><ArrowRight size={16}/></button></article>)}</div>)}</div></div><div className="carousel-dots">{Array.from({ length: destinationPages }, (_, index) => <button type="button" key={index} aria-label={`Show destination slide ${index + 1}`} className={index === destinationSlide ? 'active' : ''} onClick={() => setDestinationSlide(index)}/>)}</div></section>
      <section id="experiences" className="travel-section experiences-section"><div className="experience-intro"><span className="eyebrow">EXPERIENCES</span><h2>More Than<br/><em>Just Places</em></h2><p>We create unforgettable moments that stay with you forever.</p><a href="#deals" className="outline-cta">Discover Experiences <ArrowRight size={14}/></a></div><div className="experience-content"><div className="experience-types">{experiences.map((experience) => <article key={experience.title}><span className="experience-icon">{experience.icon}</span><strong>{experience.title}</strong><p>{experience.description}</p></article>)}</div><article className="story-card"><div><span>FEATURED EXPERIENCE</span><h3>Live Your<br/><em>Best Story.</em></h3><button>Watch Now <ArrowRight size={14}/></button></div><span className="play-button">▶</span></article></div></section>
      <section id="deals" className="deals-section"><div className="deal-copy"><span className="eyebrow">TRAVEL SMARTER</span><h2>Get Exclusive Travel Deals</h2><p>Sign up and get up to 30% off your first trip!</p></div><div className="deal-form"><input aria-label="Email address" type="email" placeholder="Enter your email"/><button>Subscribe</button></div></section>
      <section className="benefits-strip"><Benefit icon={<ShieldCheck size={20}/>} title="Best Price Guarantee" text="We offer the best prices for your trip."/><Benefit icon={<Headphones size={20}/>} title="24/7 Support" text="We're here to help you anytime."/><Benefit icon={<CalendarCheck size={20}/>} title="Easy Booking" text="Book your trip effortlessly."/><Benefit icon={<CreditCard size={20}/>} title="Secure Payments" text="Your payments are safe with us."/></section>
      <SiteFooter/>
    </section>
  </main>;
}

function Benefit({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="benefit"><span>{icon}</span><div><strong>{title}</strong><small>{text}</small></div></div>;
}
