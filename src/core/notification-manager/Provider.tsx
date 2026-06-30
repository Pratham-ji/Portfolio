import { useReducer, ReactNode, useMemo } from 'react';
import { NotificationContext, NotificationContextValue } from './Context';
import { notificationReducer } from './reducer';
import { NotificationState } from './types';

/**
 * Provider for the OS Notifications.
 * @param children - React children components
 */
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const initialState: NotificationState = { notifications: [] };
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const value: NotificationContextValue = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
