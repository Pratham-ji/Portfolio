import { useReducer, ReactNode, useMemo } from 'react';
import { DesktopContext, DesktopContextValue } from './Context';
import { desktopReducer } from './reducer';
import { DesktopState } from './types';

/**
 * Provider for the OS Desktop UI state.
 * @param children - React children components
 */
export const DesktopProvider = ({ children }: { children: ReactNode }) => {
  const initialState: DesktopState = {
    isStartMenuOpen: false,
    isSearchOpen: false,
  };
  const [state, dispatch] = useReducer(desktopReducer, initialState);

  const value: DesktopContextValue = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
};
