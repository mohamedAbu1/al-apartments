import type { Metadata } from 'next';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({ title: 'Tailor Your Egypt Trip', description: 'Build an Egypt itinerary around your dates, pace, interests, and travel style with a local planner.', path: '/tailor-your-trip' });

export default function TailorYourTripLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
