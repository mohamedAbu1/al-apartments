import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';

export default function TermsPage() {
  return <main className="inner-page"><SiteHeader/><section className="legal-page"><span className="eyebrow">MONTU TRAVEL TERMS</span><h1>Terms of <em>service.</em></h1><p>By using Montu Travel, you agree to provide accurate information and use the platform only for lawful travel, property, and land-related requests.</p><h2>Listings and requests</h2><p>Listings are subject to verification. A viewing or contact request is not a confirmed sale, rental, or booking until the responsible team confirms it in writing.</p><h2>Prices and availability</h2><p>Prices, availability, taxes, fees, and cancellation terms must be confirmed before any payment or commitment.</p><h2>Support</h2><p>For questions or disputes, contact the Montu Travel support team through the Contact page.</p></section><SiteFooter/></main>;
}
import type { Metadata } from 'next';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({ title: 'Terms of Service', description: 'Read the terms that apply when using Montu Travel services, travel planning, and website features.', path: '/terms' });
