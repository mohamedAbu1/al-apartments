'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextValue = { darkMode: boolean; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue>({ darkMode:true, toggleTheme:()=>{} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const saved = window.localStorage.getItem('al-aroum-theme');
    const next = saved ? saved === 'dark' : true;
    setDarkMode(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
  }, []);
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
