import { useReducer, useEffect, ReactNode, useMemo } from 'react';
import { SettingsContext, SettingsContextValue } from './Context';
import { settingsReducer } from './reducer';
import { defaultSettings } from './defaultSettings';
import { SettingsState } from './types';

/**
 * Provider for the OS Settings. Loads from and persists to localStorage.
 * @param children - React children components
 */
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const initialState: SettingsState = useMemo(() => {
    try {
      const saved = localStorage.getItem('pratham_os_settings');
      return saved ? { settings: { ...defaultSettings, ...JSON.parse(saved) } } : { settings: defaultSettings };
    } catch {
      return { settings: defaultSettings };
    }
  }, []);

  const [state, dispatch] = useReducer(settingsReducer, initialState);

  useEffect(() => {
    localStorage.setItem('pratham_os_settings', JSON.stringify(state.settings));
  }, [state.settings]);

  const value: SettingsContextValue = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
