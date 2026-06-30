import { NotificationState, NotificationAction } from './types';

/**
 * Notification reducer handling state immutably.
 */
export const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
      
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload.id ? { ...n, read: true } : n
        ),
      };
      
    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: [],
      };
      
    default:
      return state;
  }
};
