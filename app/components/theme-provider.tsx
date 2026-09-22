'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextValue = { darkMode: boolean; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue>({ darkMode:false, toggleTheme:()=>{} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem('al-aroum-theme');
    return saved === 'dark';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('al-aroum-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  const toggleTheme = () => setDarkMode((current) => {
    const next = !current;
    window.localStorage.setItem('al-aroum-theme', next ? 'dark' : 'light');
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    window.dispatchEvent(new CustomEvent('theme-change', { detail: next }));
    return next;
  });
  return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useSiteTheme() { return useContext(ThemeContext); }
