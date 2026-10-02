'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Camera, CalendarDays, Car, CheckCircle2, Clock3, Compass, Crown, Dumbbell, Landmark, MapPin, Mountain, Palmtree, ShieldCheck, Sparkles, Smartphone, Waves, Users } from 'lucide-react';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
import NewsletterForm from '../components/newsletter-form';
import SiteReviews from '../components/site-reviews';
import { routes } from '../lib/routes';
import type { TripPackage } from '../data';
import type { TravelTaxonomyItem } from '../lib/travel-data';

type LandingJourney = { id: string; title: string; place: string; days: string; price: string; rating: string; image: string; tag: string };
type LandingCategory = { id: string; title: string; text: string; image: string; query: string; icon: typeof Waves };
type LandingDestination = { id: string; name: string; text: string; image: string };

const categories = [
  { id: 'beach', title: 'Beach escapes', text: 'Red Sea shores, clear water, and slow mornings.', icon: Waves, image: '/images/HurghadaHulaHulaIslandFull-DayBoatTrip.webp', query: 'Marsa Alam' },
  { id: 'culture', title: 'Culture & history', text: 'Ancient stories, museums, and local guides.', icon: Camera, image: '/images/Giza-Pyramid-Complex-Trip-1-e1668979516849.webp', query: 'Luxor' },
  { id: 'adventure', title: 'Adventure', text: 'Desert trails, diving, and days outside.', icon: Mountain, image: '/images/pexels-zaki25-16114957.webp', query: 'Dahab' },
  { id: 'oasis', title: 'Oasis retreats', text: 'Palm shade, natural springs, and quiet space.', icon: Palmtree, image: '/images/Tunis-Village-2.jpg', query: 'Siwa Oasis' },
  { id: 'family', title: 'Family holidays', text: 'Easy days and thoughtful stays for everyone.', icon: Users, image: '/images/Tunis-Village-2.jpg', query: 'North Coast' },
  { id: 'luxury', title: 'Luxury itineraries', text: 'Private transfers, fine stays, and elevated details.', icon: Crown, image: '/images/Lounge-area-on-Nile-Dream-720x540.jpeg', query: 'Sharm El Sheikh' },
];

const destinations = [
  ['Cairo', 'History, design, and a city that never stands still.', '/images/Giza-Pyramid-Complex-Trip-1-e1668979516849.webp'],
  ['Luxor', 'The world’s greatest open-air museum.', '/images/Giza-Pyramid-Complex-Trip-1-e1668979516849.webp'],
  ['Sharm El Sheikh', 'Coral reefs, warm water, and polished resorts.', '/images/HurghadaHulaHulaIslandFull-DayBoatTrip.webp'],
  ['Siwa Oasis', 'A slower rhythm among palms and natural springs.', '/images/Tunis-Village-2.jpg'],
];

const heroSlides = [
  { kicker: 'THE MONTU TRAVEL TRAVEL STUDIO', title: ['See Egypt', 'with feeling.'], text: 'Thoughtful journeys, trusted local partners, and stays that turn a few days away into a story worth keeping.', note: ['Start where', 'the light is warm.'], noteText: 'Personal routes across Egypt', image: '/images/Giza-Pyramid-Complex-Trip-1-e1668979516849.webp' },
  { kicker: 'THE NILE, REIMAGINED', title: ['Follow the river', 'through time.'], text: 'Sail from ancient temples to quiet river mornings with a route shaped around Egypt’s most enduring stories.', note: ['Let the Nile', 'set the pace.'], noteText: 'Cairo, Luxor, and Aswan', image: '/images/Giza-Pyramid-Complex-Trip-1-e1668979516849.webp' },
  { kicker: 'RED SEA ESCAPES', title: ['Find your blue', 'horizon.'], text: 'Trade the rush for reef mornings, warm water, and a few beautifully planned days by the Red Sea.', note: ['Stay close to', 'the open water.'], noteText: 'Hurghada, El Gouna, and Marsa Alam', image: '/images/HurghadaHulaHulaIslandFull-DayBoatTrip.webp' },
  { kicker: 'DESERT & OASIS', title: ['Take the road', 'less hurried.'], text: 'Move through palm shade, desert light, and places where the best part of the day is simply having time.', note: ['Make room for', 'the unexpected.'], noteText: 'Siwa, Dahab, and Sinai', image: '/images/Tunis-Village-2.jpg' },
];

const tripCities = ['Luxor', 'Aswan', 'Cairo', 'Hurghada', 'Siwa'];
const tripTypes = ['Temples & history', 'Nile cruises', 'Beach & diving', 'Adventure'];

const categoryIcons = [Waves, Camera, Mountain, Palmtree, Users, Crown];

export default function TravelLanding() {
  const [journeys, setJourneys] = useState<LandingJourney[]>([]);
  const [dbCategories, setDbCategories] = useState<LandingCategory[]>([]);
  const [dbDestinations, setDbDestinations] = useState<LandingDestination[]>([]);
  const [journeysLoading, setJourneysLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    fetch('/api/trips', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Travel catalog unavailable')))
      .then((result) => {
        const featured = (result.featuredTrips || result.trips || []).slice(0, 6) as TripPackage[];
        setJourneys(featured.map((trip) => ({ id: trip.id, title: trip.title, place: trip.route, days: trip.duration, price: trip.price, rating: trip.rating === 'New' ? '—' : trip.rating, image: trip.image, tag: trip.category.toUpperCase() })));
        const mappedCategories = (result.categories || []).filter((item: TravelTaxonomyItem) => item.tripCount > 0).map((item: TravelTaxonomyItem, index: number) => ({ id: item.id, title: item.name, text: `${item.tripCount} curated ${item.tripCount === 1 ? 'journey' : 'journeys'} to explore.`, image: item.image || featured[index % Math.max(featured.length, 1)]?.image || '', query: item.name, icon: categoryIcons[index % categoryIcons.length] }));
        const mappedCities = (result.cities || []).filter((item: TravelTaxonomyItem) => item.tripCount > 0).map((item: TravelTaxonomyItem, index: number) => ({ id: item.id, name: item.name, text: `${item.tripCount} ${item.tripCount === 1 ? 'journey' : 'journeys'} start or travel through ${item.name}.`, image: item.image || featured[index % Math.max(featured.length, 1)]?.image || '' }));
        setDbCategories(mappedCategories);
        setDbDestinations(mappedCities);
      })
      .catch(() => { setJourneys([]); setDbCategories([]); setDbDestinations([]); })
      .finally(() => setJourneysLoading(false));
  }, []);
  const displayedCategories = dbCategories.length ? dbCategories : categories;
  const displayedDestinations = dbDestinations.length ? dbDestinations : destinations.map(([name, text, image]) => ({ id: name, name, text, image }));
  const hero = heroSlides[heroIndex];
  const handleCarBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello Montu Travel, I would like to request a car transfer. Pick-up: ${data.get('pickup')}; Drop-off: ${data.get('dropoff')}; Date: ${data.get('carDate')}; Time: ${data.get('carTime')}; Passengers: ${data.get('passengers')}.`;
    window.open(`https://wa.me/201038822537?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

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

    <section className="travel-studio-section trip-planner-section" id="plan"><div className="trip-planner-copy"><span className="travel-studio-kicker">YOUR JOURNEY, YOUR WAY</span><h2>Build your perfect<br/><em>Egypt trip.</em></h2><p>Choose a city, a travel style, and your dates. We’ll help turn the first idea into a clear route.</p></div><form className="trip-planner-card" action="/search" method="get"><input type="hidden" name="mode" value="trip"/><label><MapPin size={17}/><span><small>Select city</small><select name="location" defaultValue="" required aria-label="Select city"><option value="" disabled>Where do you want to go?</option>{tripCities.map((city) => <option key={city}>{city}</option>)}</select></span></label><label><Landmark size={17}/><span><small>Trip style</small><select name="type" defaultValue="" required aria-label="Trip style"><option value="" disabled>Choose a category</option>{tripTypes.map((type) => <option key={type}>{type}</option>)}</select></span></label><label><CalendarDays size={17}/><span><small>Travel dates</small><input type="date" name="travelDate" min={new Date().toISOString().slice(0, 10)} required aria-label="Travel date"/></span></label><button type="submit" className="primary-cta">Start planning <ArrowRight size={15}/></button><div className="trip-planner-benefits"><span><CheckCircle2 size={14}/>Local planning</span><span><CheckCircle2 size={14}/>Flexible booking</span><span><CheckCircle2 size={14}/>Secure requests</span></div></form></section>

    <section className="travel-studio-section travel-category-section"><div className="travel-section-heading"><div><span className="travel-studio-kicker">CHOOSE YOUR KIND OF ESCAPE</span><h2>Travel for the<br/><em>way you want to feel.</em></h2></div><p>Explore categories directly from the travel catalog, with every option connected to the journeys stored in your database.</p></div><div className="travel-category-grid">{displayedCategories.map(({ id, title, text, icon: Icon, image, query }) => <Link href={`${routes.search('trip')}&location=${encodeURIComponent(query)}`} className="travel-category-card" key={id} style={{ backgroundImage: `linear-gradient(0deg,rgba(3,18,31,.9),rgba(3,18,31,.05) 70%),url(${image})` }}><span className="travel-category-icon"><Icon size={18}/></span><div><strong>{title}</strong><small>{text}</small></div><ArrowRight size={16}/></Link>)}</div></section>

    <section className="travel-studio-section travel-journeys-section" id="journeys"><div className="travel-section-heading"><div><span className="travel-studio-kicker">CURATED JOURNEYS</span><h2>Three ways to<br/><em>start exploring.</em></h2></div><Link href={routes.search('trip')} className="travel-studio-outline">View all journeys <ArrowRight size={15}/></Link></div><div className="travel-journey-grid">{journeys.map((journey) => <Link href={`/travel/journey/${journey.id}`} className="travel-journey-card" key={journey.id}><div className="travel-journey-image" style={{ backgroundImage: `linear-gradient(0deg,rgba(3,18,31,.88),rgba(3,18,31,.05) 75%),url(${journey.image})` }}><span>{journey.tag}</span><strong>★ {journey.rating}</strong></div><div className="travel-journey-body"><h3>{journey.title}</h3><p><MapPin size={13}/>{journey.place}</p><div><span>{journey.days}</span><strong>{journey.price}</strong></div><span className="travel-card-link">View itinerary <ArrowRight size={14}/></span></div></Link>)}</div></section>

    <section className="travel-destination-band"><div className="travel-studio-section"><div className="travel-section-heading"><div><span className="travel-studio-kicker">WHERE TO NEXT</span><h2>Egypt has more<br/><em>than one rhythm.</em></h2></div><p>These destinations are loaded from the cities connected to your published journeys.</p></div><div className="travel-destination-grid">{displayedDestinations.map(({ id, name, text, image }) => <Link href={`${routes.search('trip')}&location=${encodeURIComponent(name)}`} className="travel-destination-card" key={id} style={{ backgroundImage: `linear-gradient(0deg,rgba(3,18,31,.92),rgba(3,18,31,.08) 72%),url(${image})` }}><div><strong>{name}</strong><small>{text}</small></div><ArrowRight size={16}/></Link>)}</div></div></section>

    <section className="travel-app-promo"><div className="travel-app-promo-art"><Smartphone size={54}/><span>COMING SOON</span></div><div><span className="travel-studio-kicker">STAY CLOSE TO EVERY JOURNEY</span><h2>Montu Travel,<br/><em>wherever you go.</em></h2><p>Keep your trips, local support, and planning details close at hand. Our mobile experience is on the way.</p><div className="travel-app-promo-points"><span><CheckCircle2 size={14}/>Curated trips</span><span><CheckCircle2 size={14}/>Local support</span><span><CheckCircle2 size={14}/>Easy planning</span></div></div><div className="travel-app-buttons"><span><Smartphone size={18}/><small>Coming soon</small><strong>Google Play</strong></span><span><Smartphone size={18}/><small>Coming soon</small><strong>App Store</strong></span></div></section>

    <section className="travel-car-booking"><div className="travel-car-booking-bg" aria-hidden="true"/><div className="travel-car-booking-copy"><span className="travel-studio-kicker"><Car size={14}/> PRIVATE TRANSFERS, MADE SIMPLE</span><h2>Arrive well.<br/><em>Travel freely.</em></h2><p>Reserve a comfortable private car for airport pick-ups, hotel transfers, and full-day journeys across Egypt.</p><div className="travel-car-booking-points"><span><ShieldCheck size={15}/> Trusted local drivers</span><span><Clock3 size={15}/> On-time coordination</span><span><MapPin size={15}/> Door-to-door routes</span></div></div><form className="travel-car-booking-form" onSubmit={handleCarBooking}><div className="travel-car-form-title"><Car size={18}/><div><strong>Request a private car</strong><small>We confirm the vehicle and final quote on WhatsApp.</small></div></div><label><span>Pick-up location</span><input name="pickup" required placeholder="Airport, hotel, or address" /></label><label><span>Drop-off location</span><input name="dropoff" required placeholder="Where are you going?" /></label><div className="travel-car-form-row"><label><span>Date</span><input name="carDate" required min={new Date().toISOString().slice(0, 10)} type="date" /></label><label><span>Time</span><input name="carTime" required type="time" /></label></div><label><span>Passengers</span><select name="passengers" defaultValue="1" required aria-label="Passengers"><option value="1">1 passenger</option><option value="2">2 passengers</option><option value="3">3 passengers</option><option value="4">4 passengers</option><option value="5+">5+ passengers</option></select></label><button type="submit" className="primary-cta">Request on WhatsApp <ArrowRight size={15}/></button></form></section>

    <section className="travel-studio-section travel-service-section"><div><span className="travel-studio-kicker">WHY BOOK WITH MONTU TRAVEL</span><h2>A beautiful trip<br/><em>needs a clear plan.</em></h2><p>Every recommendation is supported by a real travel detail: timing, transfers, local context, or a stay we trust.</p><Link href="/contact?mode=trip" className="primary-cta">Talk to a travel planner <ArrowRight size={15}/></Link></div><div className="travel-service-grid"><article><ShieldCheck/><strong>Trusted partners</strong><p>Local hosts and operators reviewed for quality and consistency.</p></article><article><Compass/><strong>Human planning</strong><p>A real person helps shape the route around your priorities.</p></article><article><Dumbbell/><strong>Flexible choices</strong><p>Build around your pace, from relaxed stays to full days outside.</p></article><article><Sparkles/><strong>Small details</strong><p>Transfers, timing, and memorable stops are part of the plan.</p></article></div></section>
    <SiteReviews/><section className="travel-studio-newsletter"><div><span className="travel-studio-kicker">THE TRAVEL LETTER</span><h2>Go somewhere<br/><em>worth remembering.</em></h2><p>Monthly inspiration, new routes, and seasonal offers from Egypt.</p></div><NewsletterForm compact label="Subscribe"/></section><SiteFooter section="trip"/>
  </main>;
}
