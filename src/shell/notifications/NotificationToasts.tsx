import { useEffect } from 'react';
import { useNotification } from '../../core/notification-manager';
import { AnimatePresence, motion } from 'motion/react';
import { BellIcon, XIcon } from 'lucide-react';

export const NotificationToasts: React.FC = () => {
  const { notifications, markAsRead } = useNotification();
  
  // Only show unread notifications
  const unreadNotifications = notifications.filter(n => !n.read).slice(0, 5); // Max 5 toasts

  return (
    <div className="absolute top-4 right-4 z-[10000] flex flex-col gap-2 pointer-events-none w-80">
      <AnimatePresence>
        {unreadNotifications.map(notification => (
          <NotificationToastItem 
            key={notification.id} 
            notification={notification} 
            onDismiss={() => markAsRead(notification.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastItemProps {
  notification: {
    id: string;
    title: string;
    message: string;
    timestamp: number;
  };
  onDismiss: () => void;
}

const NotificationToastItem: React.FC<ToastItemProps> = ({ notification, onDismiss }) => {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="pointer-events-auto bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 rounded-xl shadow-lg flex gap-3 group relative overflow-hidden"
    >
      <div className="text-os-blue mt-0.5">
        <BellIcon size={20} />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-sm font-semibold text-[var(--theme-text)]">{notification.title}</span>
        <span className="text-xs text-[var(--theme-text-muted)] mt-1 break-words">{notification.message}</span>
      </div>
      <button 
        onClick={onDismiss}
        className="absolute top-2 right-2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <XIcon size={16} />
      </button>
    </motion.div>
  );
};
