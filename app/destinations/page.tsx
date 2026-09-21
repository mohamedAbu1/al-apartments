import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import { routes } from '../lib/routes';

const cards = [
  ['Bali','Indonesia','https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=90','large'],
  ['Santorini','Greece','https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=90','small'],
  ['Maldives','Indian Ocean','https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=90','small'],
  ['Swiss Alps','Switzerland','https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=90','wide'],
];
export default function DestinationsPage() { return <main className="destinations-page"><SiteHeader section="trip"/><section className="destinations-intro"><div><span className="eyebrow">CURATED DESTINATIONS</span><h1>Go somewhere<br/><em>beautiful.</em></h1><p>From island mornings to mountain air, discover places selected for the feeling they leave behind.</p><Link href={routes.search('trip')} className="primary-cta">Explore all places <ArrowRight size={15}/></Link></div><div className="compass-art"><Compass size={92}/><span>Find your<br/>north</span></div></section><section className="destination-editorial"><div className="editorial-heading"><div><span className="eyebrow">THE WORLD, CURATED</span><h2>Where will you<br/><em>go next?</em></h2></div><p>Every destination has a different rhythm. Choose the one that feels like yours.</p></div><div className="destination-mosaic">{cards.map(([name,country,image,size]) => <Link href={routes.search('trip')} className={`mosaic-card ${size}`} key={name} style={{backgroundImage:`linear-gradient(0deg,rgba(3,18,31,.86),rgba(3,18,31,.04) 70%),url(${image})`}}><span><strong>{name}</strong><small>{country}</small></span><ArrowRight size={17}/></Link>)}</div></section><section className="destination-discovery"><div><span className="eyebrow">TRAVEL BY FEELING</span><h2>Start with a feeling.</h2><p>Whether you want to slow down, get lost, or taste something new, there is a destination waiting for you.</p></div><div className="feeling-pills"><Link href={routes.search('trip')}>Quiet mornings</Link><Link href={routes.search('trip')}>Sea & sunshine</Link><Link href={routes.search('trip')}>Culture & stories</Link><Link href={routes.search('trip')}>Mountain air</Link></div></section><SiteFooter/></main>; }
