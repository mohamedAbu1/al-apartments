import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import LanguageRuntime from './components/language-runtime';

export const metadata: Metadata = {
  title: 'Al-Aroum | Apartments & Land',
  description: 'Your smart destination for curated holiday apartments and land opportunities',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" dir="ltr"><body><ThemeProvider><LanguageRuntime>{children}</LanguageRuntime></ThemeProvider></body></html>;
}
