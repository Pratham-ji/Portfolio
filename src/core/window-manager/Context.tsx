import { createContext, Dispatch } from 'react';
import { WindowManagerState, WindowAction } from './types';

export interface WindowContextValue {
  state: WindowManagerState;
  dispatch: Dispatch<WindowAction>;
}

export const WindowContext = createContext<WindowContextValue | undefined>(undefined);
