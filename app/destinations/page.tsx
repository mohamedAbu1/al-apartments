import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import { routes } from '../lib/routes';

const cards = [
  ['Cairo','Egypt · History and design','/images/1200px-Rote_Pyramide_(Dahschur)_04.jpg','large'],
  ['Luxor','Egypt · Ancient stories','/images/Giza-Pyramid-Complex-Trip-1-e1668979516849.webp','small'],
  ['Sharm El Sheikh','Egypt · Reefs and resorts','/images/HurghadaHulaHulaIslandFull-DayBoatTrip.webp','small'],
  ['Siwa Oasis','Egypt · Palms and springs','/images/Tunis-Village-2.jpg','wide'],
];
export default function DestinationsPage() { return <main className="destinations-page"><SiteHeader section="trip"/><section className="destinations-intro"><div><span className="eyebrow">CURATED EGYPT DESTINATIONS</span><h1>Go somewhere<br/><em>beautiful.</em></h1><p>From Nile mornings to Red Sea light, discover Egyptian places selected for the feeling they leave behind.</p><Link href={routes.search('trip')} className="primary-cta">Explore all places <ArrowRight size={15}/></Link></div><div className="compass-art"><Compass size={92}/><span>Find your<br/>north</span></div></section><section className="destination-editorial"><div className="editorial-heading"><div><span className="eyebrow">EGYPT, CURATED</span><h2>Where will you<br/><em>go next?</em></h2></div><p>Every destination has a different rhythm. Choose the Egyptian route that feels like yours.</p></div><div className="destination-mosaic">{cards.map(([name,country,image,size]) => <Link href={`${routes.search('trip')}&location=${encodeURIComponent(name)}`} className={`mosaic-card ${size}`} key={name} style={{backgroundImage:`linear-gradient(0deg,rgba(3,18,31,.86),rgba(3,18,31,.04) 70%),url(${image})`}}><span><strong>{name}</strong><small>{country}</small></span><ArrowRight size={17}/></Link>)}</div></section><section className="destination-discovery"><div><span className="eyebrow">TRAVEL BY FEELING</span><h2>Start with a feeling.</h2><p>Whether you want to slow down, dive, wander, or taste something new, there is an Egyptian route waiting for you.</p></div><div className="feeling-pills"><Link href={`${routes.search('trip')}&type=Family%20trips`}>Quiet mornings</Link><Link href={`${routes.search('trip')}&type=Beach%20%26%20diving`}>Sea & sunshine</Link><Link href={`${routes.search('trip')}&type=Temples%20%26%20history`}>Culture & stories</Link><Link href={`${routes.search('trip')}&type=Adventure`}>Mountain air</Link></div></section><SiteFooter section="trip"/></main>; }
import type { Metadata } from 'next';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({ title: 'Egypt Destinations', description: 'Discover Cairo, Luxor, Aswan, the Red Sea, Sinai, and Egypt destinations selected by local travel planners.', path: '/destinations' });
