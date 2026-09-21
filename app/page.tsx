'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { useSiteTheme } from './components/theme-provider';
import { ArrowRight, Building2, CalendarCheck, CalendarDays, ChevronLeft, ChevronRight, CreditCard, Headphones, House, Landmark, MapPin, Menu, Moon, Plane, Search, ShieldCheck, Sparkles, Sun, Sunrise, Trees, Utensils, Users, X } from 'lucide-react';
import SiteFooter from './components/site-footer';
import SiteHeader from './components/site-header';
import DateRangePicker from './components/date-range-picker';
import TravelerPicker from './components/traveler-picker';
import WelcomeScreen from './components/welcome-screen';

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
type Intent = 'trip' | 'stay' | 'buy-home' | 'land';
type HomeMode = { slides: typeof heroSlides; destinations: typeof destinations; eyebrow: string; title: string; emphasis: string; description: string; storyLabel: string; storyTitle: string; storyEmphasis: string; dealsTitle: string; dealsText: string };
const homeModes: Record<Intent, HomeMode> = {
  trip: { slides:[
    { image:'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1800&q=90', kicker:'YOUR NEXT ESCAPE', title:['Explore.','Dream.','Discover.'], text:'Build a complete journey around places, experiences, and memories worth keeping.' },
    { image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=90', kicker:'GO SOMEWHERE BEAUTIFUL', title:['Move.','Wander.','Feel more.'], text:'From island mornings to mountain air, your next story starts here.' },
    { image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=90', kicker:'THE WORLD IS WAITING', title:['Find.','Follow.','The feeling.'], text:'Choose your destination and let us shape the details around you.' },
  ], destinations, eyebrow:'TOP DESTINATIONS', title:'Popular', emphasis:'destinations', description:'Discover journeys, experiences, and beautiful places curated around the way you want to travel.', storyLabel:'FEATURED JOURNEY', storyTitle:'Live Your', storyEmphasis:'Best Story.', dealsTitle:'Make room for your next escape', dealsText:'Get travel inspiration and exclusive offers before everyone else.' },
  stay: { slides:[
    { image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90', kicker:'STAYS MADE FOR YOU', title:['Stay.','Breathe.','Reconnect.'], text:'Find hotels, apartments, villas, and chalets where every detail feels considered.' },
    { image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90', kicker:'YOUR HOME AWAY', title:['Arrive.','Unwind.','Feel at home.'], text:'Verified stays with the space, comfort, and character your trip deserves.' },
    { image:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=90', kicker:'SLOW DOWN SOMEWHERE BEAUTIFUL', title:['More.','Than a room.','A memory.'], text:'Book a place that turns an ordinary stay into something unforgettable.' },
  ], destinations:[
    { name:'Marassi, Egypt', price:'From $129', image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=90' }, { name:'Dahab, South Sinai', price:'From $89', image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=90' }, { name:'El Gouna, Egypt', price:'From $149', image:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=90' }, { name:'Sharm El Sheikh', price:'From $119', image:'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=90' }, { name:'Siwa Oasis', price:'From $79', image:'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=90' }, { name:'North Coast', price:'From $179', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=90' }, { name:'Cairo, Egypt', price:'From $69', image:'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=90' }, { name:'Luxor, Egypt', price:'From $99', image:'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=90' },
  ], eyebrow:'CURATED STAYS', title:'Places worth', emphasis:'staying in.', description:'Comfortable stays, thoughtful spaces, and homes selected for the feeling they leave behind.', storyLabel:'FEATURED STAY', storyTitle:'Your next', storyEmphasis:'favorite place.', dealsTitle:'Stay longer. Feel more.', dealsText:'Receive handpicked stays and private offers in your inbox.' },
  'buy-home': { slides:[
    { image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90', kicker:'A PLACE TO CALL YOURS', title:['Own.','Belong.','Begin.'], text:'Find homes and chalets selected for the life you are ready to build.' },
    { image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90', kicker:'FIND YOUR NEXT CHAPTER', title:['Live.','Invest.','Grow.'], text:'Beautiful properties with the space, location, and potential to move forward.' },
    { image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90', kicker:'PROPERTY WITH PURPOSE', title:['A view.','A key.','A future.'], text:'From modern apartments to peaceful chalets, your next address is waiting.' },
  ], destinations:[
    { name:'New Cairo Villa', price:'EGP 8.5M', image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=90' }, { name:'Ain Sokhna Chalet', price:'EGP 4.2M', image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=90' }, { name:'North Coast Home', price:'EGP 6.9M', image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=90' }, { name:'Dahab Retreat', price:'EGP 3.1M', image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=90' }, { name:'Gouna Residence', price:'EGP 9.4M', image:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=90' }, { name:'Mountain Chalet', price:'EGP 5.3M', image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=90' }, { name:'Garden Apartment', price:'EGP 2.8M', image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=90' }, { name:'Coastal Villa', price:'EGP 11M', image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=90' },
  ], eyebrow:'PROPERTY COLLECTION', title:'Find your', emphasis:'next address.', description:'Homes and chalets chosen for their design, location, and lasting value.', storyLabel:'FEATURED PROPERTY', storyTitle:'Make it', storyEmphasis:'yours.', dealsTitle:'A better way to buy property', dealsText:'Get early access to new homes, chalets, and private listings.' },
  land: { slides:[
    { image:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=90', kicker:'SPACE FOR WHAT IS NEXT', title:['Plan.','Build.','Grow.'], text:'Explore land with the location and potential to turn your vision into something real.' },
    { image:'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1800&q=90', kicker:'INVEST IN POSSIBILITY', title:['More.','Than a plot.','A direction.'], text:'Residential, agricultural, and commercial opportunities selected with care.' },
    { image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=90', kicker:'THE RIGHT GROUND', title:['Find.','Your.','Foundation.'], text:'Buy or rent land for living, farming, development, or your next investment.' },
  ], destinations:[
    { name:'Ain Sokhna Land', price:'From EGP 750K', image:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=90' }, { name:'Dahab Eco Plot', price:'From EGP 1.2M', image:'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=90' }, { name:'Fayoum Farm Land', price:'From EGP 480K', image:'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=90' }, { name:'Siwa Oasis Land', price:'From EGP 390K', image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=90' }, { name:'Ras Sudr Plot', price:'From EGP 920K', image:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=90' }, { name:'New Valley Farm', price:'From EGP 610K', image:'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=90' }, { name:'Red Sea Investment', price:'From EGP 1.8M', image:'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=90' }, { name:'Development Reserve', price:'From EGP 2.4M', image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=90' },
  ], eyebrow:'LAND OPPORTUNITIES', title:'Ground for', emphasis:'your vision.', description:'Land opportunities for living, farming, development, and investment—with clarity at every step.', storyLabel:'FEATURED OPPORTUNITY', storyTitle:'Start from', storyEmphasis:'the ground up.', dealsTitle:'The right land changes everything', dealsText:'Receive new land opportunities and investment updates.' },
};
const intents: { id: Intent; label: string; description: string; icon: React.ReactNode; accent: string }[] = [
  { id:'trip', label:'Book a trip', description:'Plan flights, experiences, and unforgettable escapes.', icon:<Plane size={22}/>, accent:'intent-sky' },
  { id:'stay', label:'Book a hotel or home', description:'Find verified hotels, apartments, villas, and chalets.', icon:<House size={22}/>, accent:'intent-teal' },
  { id:'buy-home', label:'Buy a home or chalet', description:'Discover homes and holiday properties made for your next chapter.', icon:<Building2 size={22}/>, accent:'intent-gold' },
  { id:'land', label:'Buy or rent land', description:'Explore land opportunities for living, farming, or investment.', icon:<Trees size={22}/>, accent:'intent-green' },
];

export default function Home() {
  const { darkMode } = useSiteTheme();
  const [heroIndex, setHeroIndex] = useState(0);
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [activeDestination, setActiveDestination] = useState(0);
  const [destinationSlide, setDestinationSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [intent, setIntent] = useState<Intent>('stay');
  const [showWelcome, setShowWelcome] = useState(true);
  const modeContent = homeModes[intent];
  const activeDestinations = modeContent.destinations;
  const activeHeroSlides = modeContent.slides;
  const destinationPages = Math.ceil(activeDestinations.length / 4);
  useEffect(() => {
    setHeroIndex(0);
    setDestinationSlide(0);
    setActiveDestination(0);
    setDestination('');
  }, [intent]);
  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex((current) => (current + 1) % activeHeroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, [activeHeroSlides.length, intent]);
  useEffect(() => {
    const timer = window.setInterval(() => setDestinationSlide((current) => (current + 1) % destinationPages), 5600);
    return () => window.clearInterval(timer);
  }, [destinationPages]);
  const hero = activeHeroSlides[heroIndex];
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('location', destination);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (travelers) params.set('travelers', travelers);
    params.set('mode', intent);
    window.location.href = `/search?${params.toString()}`;
  };
  const chooseDestination = (name: string) => {
    const index = activeDestinations.findIndex((item) => item.name === name);
    setActiveDestination(index);
    setDestinationSlide(Math.floor(index / 4));
    setDestination(name);
    document.querySelector('.travel-search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => document.querySelector<HTMLInputElement>('input[aria-label="Destination"]')?.focus(), 450);
  };

  return <main className={`travel-home intent-theme-${intent} ${darkMode ? 'dark-theme' : 'light-theme'}`}>
    {showWelcome && <WelcomeScreen onChoose={(nextIntent) => { setIntent(nextIntent); setShowWelcome(false); }} />}
    <section className="travel-frame">
      <SiteHeader/>
      <section className={`travel-hero mode-hero-${intent}`} style={{ backgroundImage: `linear-gradient(90deg,rgba(3,17,31,.95) 0%,rgba(3,17,31,.8) 30%,rgba(3,17,31,.18) 75%),url('${hero.image}')` }}><div className="hero-copy" key={`${intent}-${heroIndex}`} aria-live="polite"><div className="hero-kicker"><Sparkles size={14}/> {hero.kicker}</div><h1>{hero.title[0]}<br/>{hero.title[1]}<br/><em>{hero.title[2]}</em></h1><p>{hero.text}</p><div className="hero-ctas"><Link href={`/search?mode=${intent}`} className="primary-cta"><Plane size={15}/> Explore Now</Link><button className="video-cta" type="button" onClick={() => setShowVideo(true)}><span>▶</span> Watch Video</button></div></div><div className="hero-progress" aria-label={`Slide ${heroIndex + 1} of ${activeHeroSlides.length}`}>{activeHeroSlides.map((slide, index) => <button key={slide.kicker} type="button" aria-label={`Show slide ${index + 1}`} className={index === heroIndex ? 'active' : ''} onClick={() => setHeroIndex(index)}/>)}</div></section>
      {showVideo && <div className="luxury-video-overlay" role="dialog" aria-modal="true" aria-label="Al-Aroum travel film" onClick={() => setShowVideo(false)}><div className="luxury-video-modal" onClick={(event) => event.stopPropagation()}><button type="button" className="luxury-video-close" aria-label="Close video" onClick={() => setShowVideo(false)}><X size={20}/></button><div className="luxury-video-heading"><span>AL-ARОUM JOURNAL</span><h2>A slower way<br/><em>to see the world.</em></h2></div><video autoPlay controls playsInline poster={hero.image}><source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-a-beach-1574/1080p.mp4" type="video/mp4"/>Your browser does not support video playback.</video></div></div>}
      <section className="intent-section" aria-labelledby="intent-heading"><div className="intent-heading"><span className="eyebrow">WHAT ARE YOU LOOKING FOR?</span><h2 id="intent-heading">Make your next move <em>feel effortless.</em></h2><p>Choose your journey and we’ll shape the search around what matters to you.</p></div><div className="intent-grid">{intents.map((item) => <button type="button" key={item.id} className={`intent-card ${item.accent} ${intent === item.id ? 'active' : ''}`} onClick={() => setIntent(item.id)} aria-pressed={intent === item.id}><span className="intent-icon">{item.icon}</span><span className="intent-copy"><strong>{item.label}</strong><small>{item.description}</small></span><ArrowRight className="intent-arrow" size={17}/></button>)}</div></section>
      <form className={`travel-search intent-${intent}`} action="/search" method="get" onSubmit={submitSearch}><label className="search-item"><MapPin size={21}/><span><small>{intent === 'trip' ? 'Where are you going?' : intent === 'land' ? 'Land location' : intent === 'buy-home' ? 'Preferred location' : 'Destination'}</small><input name="location" aria-label="Destination" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder={intent === 'trip' ? 'Choose a destination' : 'Where to?'}/></span></label><DateRangePicker checkIn={checkIn} checkOut={checkOut} minDate={todayIso()} onCheckInChange={setCheckIn} onCheckOutChange={setCheckOut}/><TravelerPicker value={travelers} onChange={setTravelers}/><button className="search-submit" type="submit" aria-label={intent === 'trip' ? 'Find trips' : intent === 'land' ? 'Find land' : intent === 'buy-home' ? 'Find homes' : 'Search'}><Search size={19}/></button></form>
      <section id="destinations" className="travel-section destinations-section"><div className="section-heading"><div><span className="eyebrow">{modeContent.eyebrow}</span><h2>{modeContent.title} <em>{modeContent.emphasis}</em></h2></div><div className="carousel-actions"><button type="button" aria-label="Previous destinations" onClick={() => setDestinationSlide((current) => (current - 1 + destinationPages) % destinationPages)}><ChevronLeft size={16}/></button><button type="button" aria-label="Next destinations" onClick={() => setDestinationSlide((current) => (current + 1) % destinationPages)}><ChevronRight size={16}/></button><Link href={`/search?mode=${intent}`} className="section-link">View All <ArrowRight size={14}/></Link></div></div><div className="destination-carousel" onMouseEnter={(event) => event.currentTarget.classList.add('is-paused')} onMouseLeave={(event) => event.currentTarget.classList.remove('is-paused')}><div className="destination-track" style={{ transform: `translateX(-${destinationSlide * 100}%)` }}>{Array.from({ length: destinationPages }, (_, page) => <div className="destination-slide" key={page}>{activeDestinations.slice(page * 4, page * 4 + 4).map((destination) => <article className="destination-card" key={destination.name} style={{backgroundImage:`linear-gradient(0deg,rgba(3,18,31,.86),rgba(3,18,31,0) 70%),url(${destination.image})`}} onClick={() => chooseDestination(destination.name)} role="link" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') chooseDestination(destination.name); }}><div><strong>{destination.name}</strong><small>{destination.price}</small></div><button type="button" aria-label={`Explore ${destination.name}`} onClick={(event) => { event.stopPropagation(); chooseDestination(destination.name); }}><ArrowRight size={16}/></button></article>)}</div>)}</div></div><div className="carousel-dots">{Array.from({ length: destinationPages }, (_, index) => <button type="button" key={index} aria-label={`Show destination slide ${index + 1}`} className={index === destinationSlide ? 'active' : ''} onClick={() => setDestinationSlide(index)}/>)}</div></section>
      <section id="experiences" className="travel-section experiences-section"><div className="experience-intro"><span className="eyebrow">{intent === 'trip' ? 'TRAVEL EXPERIENCES' : intent === 'stay' ? 'THE STAY EDIT' : intent === 'buy-home' ? 'LIFE AT HOME' : 'WAYS TO GROW'}</span><h2>{modeContent.title}<br/><em>{modeContent.emphasis}</em></h2><p>{modeContent.description}</p><a href="#deals" className="outline-cta">Discover more <ArrowRight size={14}/></a></div><div className="experience-content"><div className="experience-types">{experiences.map((experience) => <article key={experience.title}><span className="experience-icon">{experience.icon}</span><strong>{intent === 'trip' ? experience.title : intent === 'stay' ? ['Comfort','Character','Location','Service'][experiences.indexOf(experience)] : intent === 'buy-home' ? ['Design','Community','Value','Ownership'][experiences.indexOf(experience)] : ['Location','Potential','Planning','Growth'][experiences.indexOf(experience)]}</strong><p>{intent === 'trip' ? experience.description : intent === 'stay' ? 'Thoughtful details that make every stay feel effortless.' : intent === 'buy-home' ? 'Clear guidance for a confident property decision.' : 'Practical insight for making the right land move.'}</p></article>)}</div><article className="story-card"><div><span>{modeContent.storyLabel}</span><h3>{modeContent.storyTitle}<br/><em>{modeContent.storyEmphasis}</em></h3><button>Explore now <ArrowRight size={14}/></button></div><span className="play-button">▶</span></article></div></section>
      <section id="deals" className="deals-section"><div className="deal-copy"><span className="eyebrow">STAY IN THE LOOP</span><h2>{modeContent.dealsTitle}</h2><p>{modeContent.dealsText}</p></div><div className="deal-form"><input aria-label="Email address" type="email" placeholder="Enter your email"/><button>Subscribe</button></div></section>
      <section className="benefits-strip"><Benefit icon={<ShieldCheck size={20}/>} title="Best Price Guarantee" text="We offer the best prices for your trip."/><Benefit icon={<Headphones size={20}/>} title="24/7 Support" text="We're here to help you anytime."/><Benefit icon={<CalendarCheck size={20}/>} title="Easy Booking" text="Book your trip effortlessly."/><Benefit icon={<CreditCard size={20}/>} title="Secure Payments" text="Your payments are safe with us."/></section>
      <SiteFooter/>
    </section>
  </main>;
}

function Benefit({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="benefit"><span>{icon}</span><div><strong>{title}</strong><small>{text}</small></div></div>;
}
