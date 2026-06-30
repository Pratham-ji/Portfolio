import { useContext, useCallback } from 'react';
import { DesktopContext } from './Context';

/**
 * Hook to access and modify OS desktop UI state (Start menu, Search).
 * @returns Object containing state booleans and dispatch helpers.
 * @throws {Error} If used outside of DesktopProvider
 */
export const useDesktopContext = () => {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktopContext must be used within DesktopProvider');
  }

  const toggleStartMenu = useCallback(() => {
    context.dispatch({ type: 'TOGGLE_START_MENU' });
  }, [context]);

  const closeStartMenu = useCallback(() => {
    context.dispatch({ type: 'CLOSE_START_MENU' });
  }, [context]);

  const toggleSearch = useCallback(() => {
    context.dispatch({ type: 'TOGGLE_SEARCH' });
  }, [context]);

  const closeSearch = useCallback(() => {
    context.dispatch({ type: 'CLOSE_SEARCH' });
  }, [context]);

  return {
    isStartMenuOpen: context.state.isStartMenuOpen,
    isSearchOpen: context.state.isSearchOpen,
    toggleStartMenu,
    closeStartMenu,
    toggleSearch,
    closeSearch
  };
};
