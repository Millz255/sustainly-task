'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  /** HTML attribute modified based on theme */
  attribute?: string;
  /** Default theme */
  defaultTheme?: Theme;
  /** Enable system theme detection */
  enableSystem?: boolean;
  /** Disable transition on theme change */
  disableTransitionOnChange?: boolean;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ 
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = false
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemTheme = enableSystem ? 'system' : defaultTheme;
    setTheme(savedTheme || systemTheme);
  }, [defaultTheme, enableSystem]);

  useEffect(() => {
    const handleThemeChange = () => {
      if (disableTransitionOnChange) {
        const css = document.createElement('style');
        css.appendChild(
          document.createTextNode(
            `* {
               -webkit-transition: none !important;
               -moz-transition: none !important;
               -o-transition: none !important;
               -ms-transition: none !important;
               transition: none !important;
             }`
          )
        );
        document.head.appendChild(css);

        const forceReflow = () => void document.body.offsetHeight;
        forceReflow();

        setTimeout(() => {
          document.head.removeChild(css);
        }, 1);
      }

      localStorage.setItem('theme', theme);
      if (theme === 'system' && enableSystem) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute(attribute, prefersDark ? 'dark' : 'light');
      } else {
        document.documentElement.setAttribute(attribute, theme);
      }
    };

    handleThemeChange();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system' && enableSystem) {
        document.documentElement.setAttribute(attribute, e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme, attribute, enableSystem, disableTransitionOnChange]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};