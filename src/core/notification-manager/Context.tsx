import { createContext, Dispatch } from 'react';
import { NotificationState, NotificationAction } from './types';

export interface NotificationContextValue {
  state: NotificationState;
  dispatch: Dispatch<NotificationAction>;
}

export const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);
