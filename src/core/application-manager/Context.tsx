import { createContext, Dispatch } from 'react';
import { ApplicationState, ApplicationAction, AppManifest } from './types';

export interface ApplicationContextValue {
  state: ApplicationState;
  dispatch: Dispatch<ApplicationAction>;
  getAppManifest: (id: string) => AppManifest | undefined;
  getAllApps: () => AppManifest[];
}

export const ApplicationContext = createContext<ApplicationContextValue | undefined>(undefined);
