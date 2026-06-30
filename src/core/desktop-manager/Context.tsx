import { createContext, Dispatch } from 'react';
import { DesktopState, DesktopAction } from './types';

export interface DesktopContextValue {
  state: DesktopState;
  dispatch: Dispatch<DesktopAction>;
}

export const DesktopContext = createContext<DesktopContextValue | undefined>(undefined);
