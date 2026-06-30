import { useReducer, ReactNode, useMemo } from 'react';
import { WindowContext, WindowContextValue } from './Context';
import { windowReducer } from './reducer';
import { WindowManagerState } from './types';
import { OS_CONSTANTS } from '../../utils/constants';

/**
 * Provider for the OS Window Management system.
 * @param children - React children components
 */
export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const initialState: WindowManagerState = {
    windows: [],
    activeWindowId: null,
    highestZIndex: OS_CONSTANTS.WINDOWS_BASE_ZINDEX || 100,
  };
  const [state, dispatch] = useReducer(windowReducer, initialState);

  const value: WindowContextValue = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <WindowContext.Provider value={value}>
      {children}
    </WindowContext.Provider>
  );
};
