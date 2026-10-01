'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextValue = { darkMode: boolean; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue>({ darkMode:false, toggleTheme:()=>{} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Keep the first render identical on the server and client. Reading
  // localStorage during state initialization makes the header hydrate with a
  // different icon/class when a saved theme exists.
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem('montu-travel-theme');
    const initialDarkMode = saved ? saved === 'dark' : document.documentElement.dataset.theme === 'dark';
    setDarkMode(initialDarkMode);
    document.documentElement.dataset.theme = initialDarkMode ? 'dark' : 'light';
    window.localStorage.setItem('montu-travel-theme', initialDarkMode ? 'dark' : 'light');
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);
  const toggleTheme = () => setDarkMode((current) => {
    const next = !current;
    window.localStorage.setItem('montu-travel-theme', next ? 'dark' : 'light');
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    window.dispatchEvent(new CustomEvent('theme-change', { detail: next }));
    return next;
  });
  return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useSiteTheme() { return useContext(ThemeContext); }
