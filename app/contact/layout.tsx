import type { Metadata } from 'next';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({ title: 'Contact Montu Travel', description: 'Talk to Montu Travel about Egypt journeys, dates, stays, and tailored travel planning.', path: '/contact?mode=trip' });

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
