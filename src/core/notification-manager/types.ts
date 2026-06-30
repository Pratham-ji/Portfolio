export interface AppNotification {
  id: string;
  title: string;
  message: string;
  icon?: string;
  timestamp: number;
  read: boolean;
}

export interface NotificationState {
  notifications: AppNotification[];
}

export type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: AppNotification }
  | { type: 'MARK_AS_READ'; payload: { id: string } }
  | { type: 'CLEAR_ALL' };
