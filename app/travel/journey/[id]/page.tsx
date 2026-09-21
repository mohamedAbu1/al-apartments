import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, MapPin, Star, X } from 'lucide-react';
import { notFound } from 'next/navigation';
import SiteFooter from '../../../components/site-footer';
import SiteHeader from '../../../components/site-header';
import { tripPackages } from '../../../data';
import JourneyGallery from '../../../components/journey-gallery';

export function generateStaticParams() { return tripPackages.map((trip) => ({ id: trip.id })); }

export default async function JourneyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = tripPackages.find((item) => item.id === id);
  if (!trip) notFound();
  const gallery = trip.gallery?.length ? trip.gallery : [trip.image];
  const dailyPlan = trip.dailyPlan || trip.itinerary.map((title) => ({ title, description: 'Planned with a comfortable pace, local context, and time to enjoy the destination.', stay: 'Accommodation included', meals: 'As listed' }));
  const included = trip.included || ['Local planning support', 'Curated experiences', 'Clear transfer details', 'Trusted local partners'];
  const excluded = trip.excluded || ['International flights', 'Travel insurance', 'Personal expenses', 'Optional activities'];
  const bestFor = trip.bestFor || ['Couples and families', 'First-time visitors', 'Travellers seeking a considered pace'];
  return <main className="journey-detail-page"><SiteHeader section="trip"/><div className="journey-detail-shell">
    <Link href="/search?mode=trip" className="journey-back"><ArrowLeft size={15}/> Back to curated journeys</Link>
    <section className="journey-detail-hero"><JourneyGallery images={gallery} title={trip.title}/><div className="journey-detail-intro"><span className="eyebrow">CURATED EGYPT JOURNEY</span><h1>{trip.title}</h1><p>{trip.description}</p><div className="journey-detail-meta"><span><Clock3 size={16}/>{trip.duration}</span><span><Star size={16} fill="currentColor"/> {trip.rating} guest rating</span><span><MapPin size={16}/>{trip.route}</span></div></div></section>
    <section className="journey-detail-grid"><div><div className="journey-section-heading"><span className="eyebrow">YOUR ROUTE</span><h2>A considered way<br/><em>to see Egypt.</em></h2><p>{trip.highlights}</p></div><div className="journey-itinerary">{dailyPlan.map((day, index) => <article key={`${day.title}-${index}`}><span>DAY {String(index + 1).padStart(2, '0')}</span><div><strong>{day.title}</strong><p>{day.description}</p><small>{day.stay}{day.meals ? ` · ${day.meals}` : ''}</small></div></article>)}</div><div className="journey-planning-grid"><div className="journey-included"><span className="eyebrow">WHAT IS INCLUDED</span><div>{included.map((item) => <span key={item}><Check size={15}/>{item}</span>)}</div></div><div className="journey-included journey-excluded"><span className="eyebrow">NOT INCLUDED</span><div>{excluded.map((item) => <span key={item}><X size={15}/>{item}</span>)}</div></div></div><div className="journey-best-for"><span className="eyebrow">THIS JOURNEY IS BEST FOR</span><div>{bestFor.map((item) => <span key={item}>{item}</span>)}</div></div></div><aside className="journey-book-card"><span className="eyebrow">START PLANNING</span><h2>Make this route<br/>your own.</h2><div className="journey-price-label">Starting from</div><strong>{trip.price}</strong><Link href={`/contact?mode=trip&trip=${trip.id}`} className="journey-book-button">Request this journey <ArrowRight size={16}/></Link><Link href="/contact?mode=trip" className="journey-contact-link"><CalendarDays size={15}/> Talk to a travel planner</Link><small>We will confirm availability, dates, and the best fit for your group.</small></aside></section>
  </div><SiteFooter section="trip"/></main>;
}
