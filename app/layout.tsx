import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import LanguageRuntime from './components/language-runtime';
import NewsletterBridge from './components/newsletter-bridge';

export const metadata: Metadata = {
  title: 'Montu Travel | Trips, Hotels & Rental Homes',
  description: 'Discover trips, hotels, and beautiful homes for rent with Montu Travel.',
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" dir="ltr" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.theme=localStorage.getItem('montu-travel-theme')==='light'?'light':'dark'}catch(e){}" }}/></head><body><ThemeProvider><LanguageRuntime><NewsletterBridge/>{children}</LanguageRuntime></ThemeProvider></body></html>;
}
