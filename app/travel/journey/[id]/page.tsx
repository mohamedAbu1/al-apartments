import Link from 'next/link';
import { Accessibility, ArrowLeft, ArrowRight, BedDouble, CalendarDays, Check, Clock3, Handshake, Heart, Link2, MapPin, MessageCircle, ShieldCheck, Star, Users, Utensils, X } from 'lucide-react';
import { notFound } from 'next/navigation';
import SiteFooter from '../../../components/site-footer';
import SiteHeader from '../../../components/site-header';
import { tripPackages } from '../../../data';
import JourneyGallery from '../../../components/journey-gallery';
import JourneyBookingWidget from '../../../components/journey-booking-widget';

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
  const faqs = trip.faqs || [{ question: 'Can this journey be customised?', answer: 'Yes. Share your dates, group size, and preferences with our travel planner and we will tailor the route for you.' }];
  const highlightItems = trip.highlights.split(' · ');
  const hasReviews = Boolean(trip.reviewCount);
  const currentCities = trip.route.toLowerCase().split(/·|→/).map((city) => city.trim()).filter(Boolean);
  const relatedTrips = tripPackages.filter((item) => {
    if (item.id === trip.id || item.category !== trip.category) return false;
    const sharedCities = item.route.toLowerCase().split(/·|→/).map((city) => city.trim()).filter((city) => currentCities.includes(city));
    return sharedCities.length >= 2;
  }).slice(0, 3);
  const whatsappMessage = `Hello Montu Travel, I would like to plan "${trip.title}". Please share availability, dates, and the final quote.`;
  const whatsappHref = `https://wa.me/201222987370?text=${encodeURIComponent(whatsappMessage)}`;
  const facts = [
    { label: 'Duration', value: trip.duration, icon: Clock3 },
    { label: 'Travel style', value: trip.travelStyle || 'Private journey', icon: ShieldCheck },
    { label: 'Group size', value: trip.groupSize || 'Small private groups', icon: Users },
    { label: 'Stay', value: trip.accommodation || 'Handpicked accommodation', icon: BedDouble },
    { label: 'Meals', value: trip.meals || 'As listed in the itinerary', icon: Utensils },
    { label: 'Best season', value: trip.bestSeason || 'Year-round planning', icon: CalendarDays },
    { label: 'Start & end', value: trip.startEnd || 'Confirmed with your planner', icon: MapPin },
  ];

  return <main className="journey-detail-page">
    <SiteHeader section="trip" />
    <div className="journey-detail-shell">
      <Link href="/search?mode=trip" className="journey-back"><ArrowLeft size={15} /> Back to curated journeys</Link>
      <section className="journey-detail-hero">
        <JourneyGallery images={gallery} title={trip.title} />
        <div className="journey-detail-intro">
          <div className="journey-intro-topline"><span className="eyebrow">CURATED EGYPT JOURNEY</span><span className="journey-category-badge">{trip.category}</span></div>
          <h1>{trip.title}</h1><p>{trip.description}</p>
          <div className="journey-detail-meta"><span><Clock3 size={16} />{trip.duration}</span><span><Star size={16} fill={hasReviews ? 'currentColor' : 'none'} /> {hasReviews ? `${trip.rating} guest rating` : 'New journey · reviews coming soon'}</span><span><MapPin size={16} />{trip.route}</span></div>
          <div className="journey-highlight-strip">{highlightItems.map((item) => <span key={item}><Check size={14} />{item}</span>)}</div>
        </div>
      </section>
      <section className="journey-facts" aria-label="Journey facts">{facts.map(({ label, value, icon: Icon }) => <div key={label}><Icon size={17} /><span>{label}</span><strong>{value}</strong></div>)}</section>
      <section className="journey-detail-grid">
        <div>
          <div className="journey-section-heading"><span className="eyebrow">YOUR ROUTE</span><h2>A considered way<br /><em>to see Egypt.</em></h2><p>{trip.highlights}. Every day is coordinated around a comfortable pace and clear local support.</p></div>
          <div className="journey-itinerary">{dailyPlan.map((day, index) => <details className="journey-itinerary-item" key={`${day.title}-${index}`} open={index === 0}><summary><span>DAY {String(index + 1).padStart(2, '0')}</span><strong>{day.title}</strong><b aria-hidden="true">+</b></summary><div><p>{day.description}</p><small>{day.stay}{day.meals ? ` · ${day.meals}` : ''}</small></div></details>)}</div>
          <div className="journey-planning-grid"><div className="journey-included"><span className="eyebrow">WHAT IS INCLUDED</span><div>{included.map((item) => <span key={item}><Check size={15} />{item}</span>)}</div></div><div className="journey-included journey-excluded"><span className="eyebrow">NOT INCLUDED</span><div>{excluded.map((item) => <span key={item}><X size={15} />{item}</span>)}</div></div></div>
          <div className="journey-best-for"><span className="eyebrow">THIS JOURNEY IS BEST FOR</span><div>{bestFor.map((item) => <span key={item}>{item}</span>)}</div></div>
          <section className="journey-inclusive-section"><span className="eyebrow">TRAVEL WITH CONFIDENCE</span><h2>Inclusive travel<br /><em>for everyone.</em></h2><p>Our team plans with accessibility, comfort, and individual support in mind. Tell us what you need and we will make the journey easier from the first conversation.</p><div className="journey-inclusive-grid"><div><Accessibility size={22} /><strong>Accessible</strong><span>Practical support for mobility and access needs.</span></div><div><Handshake size={22} /><strong>Support</strong><span>A local planner available before and during your trip.</span></div><div><Heart size={22} /><strong>Care</strong><span>A thoughtful pace with room for personal preferences.</span></div></div><a href={whatsappHref} target="_blank" rel="noreferrer" className="journey-inclusive-link"><MessageCircle size={14} /> Tell us what support you need</a></section>
          <section className="journey-reviews-section"><div><span className="eyebrow">✦ TRAVELLER VOICES</span><h2>Reviews &amp; ratings.</h2><p>{hasReviews ? 'Real stories from guests who experienced this journey.' : 'This journey is newly curated. Guest reviews will appear here after the first stays.'}</p></div><div className="journey-review-empty">{hasReviews ? <><div className="journey-review-stars"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></div><strong>{trip.rating} guest rating</strong></> : <strong>No reviews yet</strong>}<span>{hasReviews ? 'Share your experience with future travellers.' : 'Be the first to share your experience of this route.'}</span><Link href="/login"><Link2 size={14} /> Sign in to write a review</Link></div></section>
          <section className="journey-faq-section"><span className="eyebrow">BEFORE YOU BOOK</span><h2>Questions, answered.</h2><div>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></section>
        </div>
        <JourneyBookingWidget title={trip.title} priceValue={trip.priceValue} priceLabel={trip.price} whatsappBase="https://wa.me/201222987370" />
      </section>
      {relatedTrips.length > 0 && <section className="journey-related-section"><div className="journey-related-heading"><div><span className="eyebrow">MORE IN THIS STORY</span><h2>Similar journeys<br /><em>to consider.</em></h2></div><Link href="/search?mode=trip" className="journey-related-all">View all journeys <ArrowRight size={14} /></Link></div><div className="journey-related-grid">{relatedTrips.map((item) => <article className="journey-related-card" key={item.id}><div className="journey-related-image" style={{ backgroundImage: `url(${item.gallery?.[0] || item.image})` }}><span>{item.category}</span><strong><Star size={13} fill="currentColor" /> {item.rating}</strong></div><div className="journey-related-body"><span><MapPin size={13} /> {item.route}</span><h3>{item.title}</h3><p>{item.description}</p><div><strong>{item.price}</strong><Link href={`/travel/journey/${item.id}`}>View journey <ArrowRight size={14} /></Link></div></div></article>)}</div></section>}
    </div>
    <a href={whatsappHref} target="_blank" rel="noreferrer" className="journey-mobile-cta"><MessageCircle size={17} /> Plan this journey on WhatsApp</a>
    <SiteFooter section="trip" />
  </main>;
}
