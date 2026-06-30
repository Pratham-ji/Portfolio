import { useContext, useCallback } from 'react';
import { ApplicationContext } from './Context';
import { AppManifest } from './types';

/**
 * Hook to access and modify the OS application registry.
 * @returns Object containing manifest accessors and registry helpers.
 * @throws {Error} If used outside of ApplicationProvider
 */
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within ApplicationProvider');
  }

  const registerApp = useCallback((manifest: AppManifest) => {
    context.dispatch({ type: 'REGISTER_APP', payload: manifest });
  }, [context]);

  const unregisterApp = useCallback((id: string) => {
    context.dispatch({ type: 'UNREGISTER_APP', payload: { id } });
  }, [context]);

  return {
    getAppManifest: context.getAppManifest,
    getAllApps: context.getAllApps,
    registerApp,
    unregisterApp
  };
};
