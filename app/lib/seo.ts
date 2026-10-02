import type { Metadata } from 'next';

export const siteName = 'Montu Travel';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://montutraveleg.com';
export const siteDescription = 'Curated Egypt journeys, stays, and travel planning with trusted local support.';

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({
  title,
  description = siteDescription,
  path = '/',
  image = '/icon.svg',
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName,
      title,
      description,
      locale: 'en_US',
      alternateLocale: ['ar_EG'],
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
