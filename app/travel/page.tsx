import TravelLanding from './travel-landing';
import type { Metadata } from 'next';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({ title: 'Egypt Travel Journeys', description: 'Explore carefully planned Egypt journeys, Nile cruises, Red Sea escapes, and local experiences.', path: '/travel' });

export default function TravelPage() {
  return <TravelLanding />;
}
