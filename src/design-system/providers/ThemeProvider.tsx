import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

const STORAGE_KEY = 'prathamos-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (t: Theme) => {
      const isDark = t === 'dark' || (t === 'system' && mediaQuery.matches);
      const targetTheme = isDark ? 'dark' : 'light';
      
      setResolvedTheme(targetTheme);
      document.documentElement.setAttribute('data-theme', t); // Set 'dark' | 'light' | 'system'
      
      // If we specifically want the resolved theme on the root, some systems do `data-theme="dark"`
      // But prompt says "Support dark, light, system... Automatically update data-theme on the document root."
      // I will set it exactly to the preference, and CSS handles `[data-theme="system"]` media query, 
      // but for strictness, `tokens.css` handles `[data-theme="system"]` falling back to dark.
      
      localStorage.setItem(STORAGE_KEY, t);
    };

    applyTheme(theme);

    const listener = () => applyTheme(theme);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark'); // simple toggle ignores 'system'
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
