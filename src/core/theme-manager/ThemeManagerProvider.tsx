import { useEffect, ReactNode } from 'react';
import { useSettings } from '../settings-manager/hooks';

/**
 * ThemeManager listens to SettingsContext and injects CSS variables and classes into the document root.
 */
export const ThemeManagerProvider = ({ children }: { children: ReactNode }) => {
  const { settings } = useSettings();

  useEffect(() => {
    const root = document.documentElement;

    // Handle Theme (dark/light)
    let isDark = settings.theme === 'dark';
    if (settings.theme === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Handle Animations
    if (!settings.animationsEnabled) {
      root.style.setProperty('--motion-reduce', '1');
      // Adding a global class is sometimes easier for complex Tailwind rules
      root.classList.add('reduce-motion');
    } else {
      root.style.setProperty('--motion-reduce', '0');
      root.classList.remove('reduce-motion');
    }

  }, [settings.theme, settings.animationsEnabled, settings.accentColor]);

  // The ThemeManager doesn't actually provide a context, it just manages DOM side-effects of settings
  return <>{children}</>;
};
