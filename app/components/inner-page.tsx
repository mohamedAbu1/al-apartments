import Link from 'next/link';
import { ArrowRight, Check, Mail } from 'lucide-react';
import SiteFooter from './site-footer';
import { routes } from '../lib/routes';
import SiteHeader from './site-header';
type Card = { title:string; text:string; image:string };
export default function InnerPage({ eyebrow, title, description, cards, action = 'Explore now' }: { eyebrow:string; title:React.ReactNode; description:string; cards:Card[]; action?:string }) {
  return <main className="inner-page"><SiteHeader/><section className="inner-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p><Link href={routes.search('trip')} className="primary-cta">{action} <ArrowRight size={15}/></Link></section><section className="inner-cards">{cards.map((card) => <article key={card.title} className="inner-card"><img src={card.image} alt={card.title}/><div><h2>{card.title}</h2><p>{card.text}</p><Link href={routes.search('trip')}>Discover <ArrowRight size={14}/></Link></div></article>)}</section><section className="inner-bottom"><div><span className="eyebrow">STAY IN THE LOOP</span><h2>Make room for your next story.</h2><p>Get thoughtful travel inspiration and new opportunities before everyone else.</p></div><form><Mail size={16}/><input placeholder="Your email address"/><button><Check size={15}/></button></form></section><SiteFooter/></main>;
}
