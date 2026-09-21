import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, MapPin, Star } from 'lucide-react';
import { notFound } from 'next/navigation';
import SiteFooter from '../../../components/site-footer';
import SiteHeader from '../../../components/site-header';
import { tripPackages } from '../../../data';

export function generateStaticParams() { return tripPackages.map((trip) => ({ id: trip.id })); }

export default async function JourneyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = tripPackages.find((item) => item.id === id);
  if (!trip) notFound();
  return <main className="journey-detail-page"><SiteHeader section="trip"/><div className="journey-detail-shell">
    <Link href="/search?mode=trip" className="journey-back"><ArrowLeft size={15}/> Back to curated journeys</Link>
    <section className="journey-detail-hero"><div className="journey-detail-image" style={{ backgroundImage: `linear-gradient(90deg,rgba(3,18,31,.9),rgba(3,18,31,.14)),url(${trip.image})` }}><span>{trip.category}</span><div><strong>{trip.title}</strong><small><MapPin size={13}/>{trip.route}</small></div></div><div className="journey-detail-intro"><span className="eyebrow">CURATED EGYPT JOURNEY</span><h1>{trip.title}</h1><p>{trip.description}</p><div className="journey-detail-meta"><span><Clock3 size={16}/>{trip.duration}</span><span><Star size={16} fill="currentColor"/> {trip.rating} guest rating</span></div></div></section>
    <section className="journey-detail-grid"><div><div className="journey-section-heading"><span className="eyebrow">YOUR ROUTE</span><h2>A considered way<br/><em>to see Egypt.</em></h2><p>{trip.highlights}</p></div><div className="journey-itinerary">{trip.itinerary.map((item, index) => <article key={item}><span>0{index + 1}</span><div><strong>{item}</strong><p>Planned with a comfortable pace and local context.</p></div></article>)}</div><div className="journey-included"><span className="eyebrow">WHAT IS INCLUDED</span><div><span><Check size={15}/> Local planning support</span><span><Check size={15}/> Curated experiences</span><span><Check size={15}/> Clear transfer details</span><span><Check size={15}/> Trusted local partners</span></div></div></div><aside className="journey-book-card"><span className="eyebrow">START PLANNING</span><h2>Make this route<br/>your own.</h2><div className="journey-price-label">Starting from</div><strong>{trip.price}</strong><Link href={`/contact?mode=trip&trip=${trip.id}`} className="journey-book-button">Request this journey <ArrowRight size={16}/></Link><Link href="/contact?mode=trip" className="journey-contact-link"><CalendarDays size={15}/> Talk to a travel planner</Link><small>We will confirm availability, dates, and the best fit for your group.</small></aside></section>
  </div><SiteFooter section="trip"/></main>;
}
