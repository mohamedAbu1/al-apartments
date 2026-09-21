import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import LanguageRuntime from './components/language-runtime';
import NewsletterBridge from './components/newsletter-bridge';

export const metadata: Metadata = {
  title: 'Al-Aroum | Travel, Stays & Property',
  description: 'Your smart destination for curated holiday apartments and land opportunities',
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" dir="ltr" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.theme=localStorage.getItem('al-aroum-theme')==='light'?'light':'dark'}catch(e){}" }}/></head><body><ThemeProvider><LanguageRuntime><NewsletterBridge/>{children}</LanguageRuntime></ThemeProvider></body></html>;
}
