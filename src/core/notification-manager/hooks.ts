import { useContext, useCallback } from 'react';
import { NotificationContext } from './Context';

/**
 * Hook to access and modify OS notifications.
 * @returns Object containing notifications array and helper methods.
 * @throws {Error} If used outside of NotificationProvider
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }

  const addNotification = useCallback((title: string, message: string, icon?: string) => {
    context.dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: crypto.randomUUID(),
        title,
        message,
        icon,
        timestamp: Date.now(),
        read: false,
      }
    });
  }, [context]);

  const markAsRead = useCallback((id: string) => {
    context.dispatch({ type: 'MARK_AS_READ', payload: { id } });
  }, [context]);

  const clearAll = useCallback(() => {
    context.dispatch({ type: 'CLEAR_ALL' });
  }, [context]);

  return {
    notifications: context.state.notifications,
    addNotification,
    markAsRead,
    clearAll
  };
};
