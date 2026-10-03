import type { Metadata } from 'next';
import './globals.css';
import { cookies } from 'next/headers';
import { ThemeProvider } from './components/theme-provider';
import LanguageRuntime from './components/language-runtime';
import NewsletterBridge from './components/newsletter-bridge';
import { absoluteUrl, siteDescription, siteName, siteUrl } from './lib/seo';
import { languages, type Language } from './i18n';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Montu Travel | Egypt Journeys, Stays & Travel Planning', template: `%s | ${siteName}` },
  description: siteDescription,
  keywords: ['Egypt travel', 'Egypt tours', 'Nile cruises', 'Luxor tours', 'Aswan tours', 'Red Sea holidays', 'travel planning Egypt'],
  applicationName: siteName,
  authors: [{ name: 'Ahmed Youssef Awad', url: absoluteUrl('/contact?mode=trip') }],
  creator: siteName,
  publisher: siteName,
  category: 'travel',
  alternates: { canonical: absoluteUrl('/'), languages: { en: absoluteUrl('/'), ar: absoluteUrl('/?lang=ar'), 'x-default': absoluteUrl('/') } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
  openGraph: { type: 'website', url: absoluteUrl('/'), siteName, title: 'Montu Travel | Egypt Journeys, Stays & Travel Planning', description: siteDescription, locale: 'en_US', alternateLocale: ['ar_EG'], images: [{ url: absoluteUrl('/icon.svg'), alt: siteName }] },
  twitter: { card: 'summary_large_image', title: 'Montu Travel | Egypt Journeys, Stays & Travel Planning', description: siteDescription, images: [absoluteUrl('/icon.svg')] },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestedLanguage = (await cookies()).get('montu-travel-language')?.value;
  const language = languages.some((item) => item.code === requestedLanguage) ? requestedLanguage as Language : 'en';
  const jsonLd = { '@context': 'https://schema.org', '@type': 'TravelAgency', name: siteName, url: siteUrl, description: siteDescription, email: 'info@montutraveleg.com', telephone: '+201038822537', areaServed: { '@type': 'Country', name: 'Egypt' }, sameAs: ['https://www.facebook.com/', 'https://www.instagram.com/', 'https://www.tiktok.com/'] };
  return <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.theme=localStorage.getItem('montu-travel-theme')==='light'?'light':'dark'}catch(e){}" }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head><body><ThemeProvider><LanguageRuntime><NewsletterBridge/>{children}</LanguageRuntime></ThemeProvider></body></html>;
}
