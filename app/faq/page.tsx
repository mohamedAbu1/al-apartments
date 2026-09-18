import { ChevronDown } from 'lucide-react';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
const questions = ['How do I search for a stay?','Can I save a property for later?','How do I contact an owner or host?','What payment methods are supported?','How can I list my property?'];
export default function FaqPage() { return <main className="inner-page"><SiteHeader/><section className="faq-layout"><div><span className="eyebrow">NEED TO KNOW</span><h1>Questions,<br/><em>answered.</em></h1><p>Everything you need to make your next booking feel easy.</p></div><div className="faq-list">{questions.map((question) => <details key={question}><summary>{question}<ChevronDown size={18}/></summary><p>Our support team can guide you through this step and help you find the right option for your trip.</p></details>)}</div></section><SiteFooter/></main>; }
