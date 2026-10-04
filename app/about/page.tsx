import Link from 'next/link';
import { ArrowRight, Compass, HeartHandshake, MapPin, MessageCircle, ShieldCheck, Sparkles, Users } from 'lucide-react';
import InnerPage from '../components/inner-page';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
import type { AppSection } from '../lib/routes';

export default async function AboutPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const mode = (await searchParams).mode;
  const section: AppSection | 'default' = mode === 'trip' || mode === 'stay' || mode === 'buy-home' || mode === 'land' ? mode : 'default';
  if (section === 'land' || section === 'stay' || section === 'buy-home') return <LegacyAbout section={section} />;
  const whatsappHref = 'https://wa.me/201038822537?text=Hello%20Montu%20Travel%2C%20I%27d%20like%20to%20learn%20more%20about%20planning%20a%20journey.';

  return <main className="montu-about-page">
    <SiteHeader section={section === 'default' ? 'default' : 'trip'} />
    <section className="montu-about-hero"><div className="montu-about-hero-copy"><span className="eyebrow">THE MONTU TRAVEL APPROACH</span><h1>Egypt, with more<br /><em>meaning.</em></h1><p>We create thoughtful journeys through Egypt for travellers who care about how a place feels, not only what they see.</p><div className="montu-about-actions"><Link href="/search?mode=trip" className="primary-cta">Explore journeys <ArrowRight size={15} /></Link><a href={whatsappHref} target="_blank" rel="noreferrer" className="montu-about-text-link"><MessageCircle size={15} /> Talk to our team</a></div></div><div className="montu-about-hero-art"><div className="montu-about-image montu-about-image-large" style={{ backgroundImage: "url('/images/ai/about-hero-ai.png')" }}><span>01 · THE NILE</span></div><div className="montu-about-image montu-about-image-small" style={{ backgroundImage: "url('/images/ai/nile-cruise-ai.png')" }}><span>02 · THE NILE</span></div><div className="montu-about-orbit"><Compass size={22} /><span>LOCAL<br />PERSPECTIVE</span></div></div></section>
    <section className="montu-about-intro"><div><span className="eyebrow">WHY MONTU</span><h2>Travel should feel<br /><em>like yours.</em></h2></div><p>Montu Travel brings together the places, people, and practical details that make a journey feel effortless. From a first idea to the moment you return home, our role is to make Egypt easier to discover with care and clarity.</p></section>
    <section className="montu-about-pillars"><article><div className="montu-about-icon"><MapPin size={20} /></div><span>01</span><h3>Local perspective</h3><p>Routes shaped by real knowledge of Egypt’s rhythm, history, and quieter corners.</p></article><article><div className="montu-about-icon"><HeartHandshake size={20} /></div><span>02</span><h3>Personal care</h3><p>A human team that listens closely and adapts the journey around your pace.</p></article><article><div className="montu-about-icon"><ShieldCheck size={20} /></div><span>03</span><h3>Clear confidence</h3><p>Honest details, thoughtful logistics, and a clear next step at every stage.</p></article></section>
    <section className="montu-about-story"><div className="montu-about-story-image" style={{ backgroundImage: "url('/images/Khan-el-Khalili.webp')" }}><span>ROOTED IN PLACE</span></div><div className="montu-about-story-copy"><span className="eyebrow">OUR POINT OF VIEW</span><h2>Heritage is not a backdrop.<br /><em>It is the journey.</em></h2><p>Egypt rewards travellers who slow down: a temple before the crowds, a conversation over tea, a river crossing at sunset. We build space for those moments alongside the essential landmarks.</p><p>That is why every Montu experience balances discovery with comfort, structure with freedom, and beautiful plans with the flexibility to make them yours.</p><Link href="/tailor-your-trip" className="montu-about-text-link">Build your own journey <ArrowRight size={15} /></Link></div></section>
    <section className="montu-about-proof"><div><Sparkles size={22} /><strong>Curated, not crowded</strong><span>A considered selection of trips, stays, and homes.</span></div><div><Users size={22} /><strong>Human from start to finish</strong><span>Real support before, during, and after the journey.</span></div><div><Compass size={22} /><strong>Made for discovery</strong><span>Routes that leave room for the unexpected.</span></div></section>
    <section className="montu-about-cta"><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>Let’s make Egypt<br /><em>feel personal.</em></h2><p>Tell us what you want to feel, and we will help shape the journey.</p><div><Link href="/tailor-your-trip" className="primary-cta">Tailor your trip <ArrowRight size={15} /></Link><a href={whatsappHref} target="_blank" rel="noreferrer" className="montu-about-text-link"><MessageCircle size={15} /> WhatsApp Montu Travel</a></div></section>
    <SiteFooter section="trip" />
  </main>;
}

function LegacyAbout({ section }: { section: AppSection }) {
  return <InnerPage section={section} eyebrow="OUR STORY" title={<>Travel should<br /><em>feel like you.</em></>} description="Montu Travel brings together thoughtful places, local experiences, and the confidence to go somewhere new." cards={[{ title: 'Curated with care', text: 'Every place is selected for the details that make a stay feel special.', image: '/images/old-cairo-district.jpg' }, { title: 'People first', text: 'We believe the best journeys begin with a human recommendation.', image: '/images/Khan-el-Khalili.webp' }, { title: 'Built for discovery', text: 'A calmer way to find the places you have been looking for.', image: '/images/Tunis-Village-2.jpg' }]} />;
}
import type { Metadata } from 'next';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({ title: 'About Montu Travel', description: 'Learn how Montu Travel creates thoughtful Egypt journeys with trusted local partners and human planning.', path: '/about' });
