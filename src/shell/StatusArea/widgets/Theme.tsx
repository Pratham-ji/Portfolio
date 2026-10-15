import React, { useState, useEffect } from 'react';
import styles from '../StatusArea.module.css';

export const Theme: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check initial global theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'dark' : 'light');

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const current = document.documentElement.getAttribute('data-theme');
          setTheme(current === 'dark' ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.widgetItem} title={`Theme: ${theme}`}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </div>
  );
};
