import { createContext, Dispatch } from 'react';
import { SettingsState, SettingsAction } from './types';

export interface SettingsContextValue {
  state: SettingsState;
  dispatch: Dispatch<SettingsAction>;
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);
