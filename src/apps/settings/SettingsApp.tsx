import React, { useState, useCallback, useEffect, useContext } from 'react';
import styles from './Settings.module.css';
import { Sidebar, PageRenderer } from './components/SettingsComponents';
import { SettingsStore } from './store/SettingsStore';
import { SettingsContext } from '../../core/settings-manager/Context';
import { OS_Settings } from '../../core/settings-manager/types';
import { ThemeContext } from '../../design-system/providers/ThemeProvider';

export const SettingsApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('appearance');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [, forceUpdate] = useState<number>(0);

  // Safely consume SettingsContext if mounted inside SettingsProvider
  const settingsCtx = useContext(SettingsContext);
  // Safely consume ThemeContext if mounted inside ThemeProvider
  const themeCtx = useContext(ThemeContext);

  // Synchronize OS settings state into SettingsStore
  useEffect(() => {
    if (settingsCtx?.state?.settings) {
      SettingsStore.syncWithOS(settingsCtx.state.settings);
    }
  }, [settingsCtx?.state?.settings]);

  // Subscribe to store updates for reactive local state
  useEffect(() => {
    return SettingsStore.subscribe(() => {
      forceUpdate((n) => n + 1);
    });
  }, []);

  // Dispatch setting changes to both local store and OS providers
  const handleSettingChange = useCallback(
    (id: string, value: any) => {
      // 1. Update SettingsStore
      SettingsStore.updateValue(id, value);

      // 2. Dispatch to OS settings-manager if context is available
      if (settingsCtx?.dispatch) {
        switch (id) {
          case 'theme': {
            settingsCtx.dispatch({
              type: 'UPDATE_SETTING',
              payload: { key: 'theme', value: value as OS_Settings['theme'] }
            });
            break;
          }
          case 'accentColor': {
            settingsCtx.dispatch({
              type: 'UPDATE_SETTING',
              payload: { key: 'accentColor', value: String(value) }
            });
            break;
          }
          case 'wallpaper': {
            settingsCtx.dispatch({
              type: 'UPDATE_SETTING',
              payload: { key: 'wallpaper', value: String(value) }
            });
            break;
          }
          case 'platformTheme': {
            settingsCtx.dispatch({
              type: 'UPDATE_SETTING',
              payload: {
                key: 'platformTheme',
                value: value as OS_Settings['platformTheme']
              }
            });
            break;
          }
          case 'reducedMotion': {
            // Note: reducedMotion toggle is inverse of animationsEnabled
            settingsCtx.dispatch({
              type: 'UPDATE_SETTING',
              payload: { key: 'animationsEnabled', value: !value }
            });
            break;
          }
          default:
            break;
        }
      }

      // 3. Dispatch to ThemeProvider if theme is modified
      if (id === 'theme' && themeCtx?.setTheme) {
        try {
          themeCtx.setTheme(value);
        } catch (err) {
          console.warn('ThemeProvider setTheme error:', err);
        }
      }
    },
    [settingsCtx, themeCtx]
  );

  // Handle system reset
  const handleResetSettings = useCallback(() => {
    if (settingsCtx?.dispatch) {
      settingsCtx.dispatch({ type: 'RESET_SETTINGS' });
    }
    SettingsStore.resetToDefaults();
    if (themeCtx?.setTheme) {
      try {
        themeCtx.setTheme('dark');
      } catch (err) {
        console.warn('ThemeProvider setTheme error:', err);
      }
    }
  }, [settingsCtx, themeCtx]);

  // Sub-millisecond filter search
  const isSearching = searchQuery.trim() !== '';
  const searchResults = isSearching ? SettingsStore.search(searchQuery) : [];

  return (
    <div className={styles.settingsLayout} aria-label="System Settings">
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className={styles.mainArea}>
        <PageRenderer
          category={activeCategory}
          isSearching={isSearching}
          searchResults={searchResults}
          searchQuery={searchQuery}
          onSettingChange={handleSettingChange}
          onResetSettings={handleResetSettings}
        />
      </main>
    </div>
  );
};

export default SettingsApp;
