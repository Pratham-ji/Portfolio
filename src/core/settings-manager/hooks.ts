import { useContext, useCallback } from 'react';
import { SettingsContext } from './Context';
import { OS_Settings } from './types';

/**
 * Hook to access and modify the OS settings.
 * @returns Object containing settings and update methods.
 * @throws {Error} If used outside of SettingsProvider
 */
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }

  const updateSetting = useCallback(<K extends keyof OS_Settings>(key: K, value: OS_Settings[K]) => {
    context.dispatch({ type: 'UPDATE_SETTING', payload: { key, value } });
  }, [context]);

  const resetSettings = useCallback(() => {
    context.dispatch({ type: 'RESET_SETTINGS' });
  }, [context]);

  return {
    settings: context.state.settings,
    updateSetting,
    resetSettings
  };
};
