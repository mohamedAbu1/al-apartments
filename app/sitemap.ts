import type { MetadataRoute } from 'next';
import { tripPackages } from './data';
import { absoluteUrl } from './lib/seo';

const publicRoutes = ['/', '/travel', '/travel/destinations', '/travel/experiences', '/destinations', '/experiences', '/deals', '/stays', '/homes', '/land', '/tailor-your-trip', '/about', '/contact', '/faq', '/privacy-policy', '/cancellation-policy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = publicRoutes.map((path) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency: path === '/' ? 'daily' as const : 'weekly' as const, priority: path === '/' ? 1 : 0.7 }));
  const journeys = tripPackages.map((trip) => ({ url: absoluteUrl(`/travel/journey/${trip.id}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 }));
  return [...routes, ...journeys];
}
