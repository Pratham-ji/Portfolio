import React, { useState } from 'react';
import styles from './NotificationCenter.module.css';
// import { Sidebar, Toast, LayerManager } from '../../design-system/components';

// Mock data
interface Notification {
  id: string;
  appId: string;
  title: string;
  message: string;
  timestamp: Date;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', appId: 'Mail', title: 'New Email', message: 'You have a new meeting invitation.', timestamp: new Date() },
  { id: '2', appId: 'Mail', title: 'GitHub update', message: 'PR merged successfully.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: '3', appId: 'System', title: 'Update Available', message: 'PrathamOS v3.3 is ready to install.', timestamp: new Date(Date.now() - 1000 * 60 * 60) }
];

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Controlled by LayerManager in reality
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Group notifications by App
  const grouped = notifications.reduce((acc, notif) => {
    if (!acc[notif.appId]) acc[notif.appId] = [];
    acc[notif.appId].push(notif);
    return acc;
  }, {} as Record<string, Notification[]>);

  // Expose toggle globally for mock integration
  React.useEffect(() => {
    const handleToggle = (e: CustomEvent) => setIsOpen(e.detail !== undefined ? e.detail : !isOpen);
    window.addEventListener('toggle-notification-center' as any, handleToggle);
    return () => window.removeEventListener('toggle-notification-center' as any, handleToggle);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      {/* Real impl would wrap this in <Sidebar position="right"> */}
      <div 
        className={styles.sidebar} 
        onClick={e => e.stopPropagation()}
        role="complementary"
        aria-label="Notification Center"
      >
        <div className={styles.header}>
          <h2>Notifications</h2>
          <button onClick={() => setNotifications([])} className={styles.clearBtn}>Clear All</button>
        </div>

        <div className={styles.scrollArea}>
          {Object.entries(grouped).map(([appId, notifs]) => (
            <div key={appId} className={styles.group}>
              <div className={styles.groupHeader}>{appId}</div>
              {notifs.map(notif => (
                <div key={notif.id} className={styles.toastCard}>
                  <div className={styles.toastTitle}>{notif.title}</div>
                  <div className={styles.toastMessage}>{notif.message}</div>
                  <div className={styles.toastTime}>
                    {notif.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          ))}
          {notifications.length === 0 && (
            <div className={styles.emptyState}>No new notifications</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
