import React, { useEffect, useRef, useState, useId } from 'react';
import { createRoot } from 'react-dom/client';
import styles from './Toast.module.css';
import { GlassPanel } from '../GlassPanel';
import { MotionScheduler } from '../../motion/MotionScheduler';
import { MaterialSprings, Durations } from '../../motion/physics';
import { useLayer } from '../../hooks/useLayer';

export interface ToastData {
  id: string;
  title: string;
  message?: string;
  duration?: number;
}

let toastIdCounter = 0;
let observers: ((toasts: ToastData[]) => void)[] = [];
let activeToasts: ToastData[] = [];

const MAX_VISIBLE = 3;

/**
 * Imperative API for triggering toasts anywhere in the OS.
 */
export const toast = {
  show: (title: string, message?: string, duration: number = 4000) => {
    const id = `toast-${++toastIdCounter}`;
    const newToast = { id, title, message, duration };
    
    activeToasts = [...activeToasts, newToast].slice(-MAX_VISIBLE);
    observers.forEach(obs => obs(activeToasts));

    if (duration > 0) {
      setTimeout(() => {
        toast.dismiss(id);
      }, duration);
    }
  },
  dismiss: (id: string) => {
    activeToasts = activeToasts.filter(t => t.id !== id);
    observers.forEach(obs => obs(activeToasts));
  }
};

const ToastItem: React.FC<{ data: ToastData; onDismiss: () => void }> = ({ data, onDismiss }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      // Entrance
      MotionScheduler.schedule({
        targets: ref.current,
        translateX: [40, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 400,
        easing: MaterialSprings.springGlass
      });
    }
  }, []);

  const handleDismiss = () => {
    if (ref.current) {
      // Exit
      MotionScheduler.schedule({
        targets: ref.current,
        translateX: [0, 40],
        opacity: [1, 0],
        duration: Durations.MEDIUM,
        easing: 'easeOutQuad'
      })?.finished.then(onDismiss);
    } else {
      onDismiss();
    }
  };

  return (
    <GlassPanel ref={ref} className={styles.toast} variant="dynamicContent">
      <div className={styles.toastContent}>
        <div className={styles.toastTitle}>{data.title}</div>
        {data.message && <div className={styles.toastMessage}>{data.message}</div>}
      </div>
      <button className={styles.closeButton} onClick={handleDismiss} aria-label="Dismiss toast">
        ✕
      </button>
    </GlassPanel>
  );
};

/**
 * <ToastContainer />
 * Renders the queue of active toasts. Place exactly one of these in the OS root.
 */
export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const id = useId();
  const { zIndex } = useLayer(`toast-container-${id}`);

  useEffect(() => {
    const observer = (newToasts: ToastData[]) => setToasts([...newToasts]);
    observers.push(observer);
    return () => {
      observers = observers.filter(obs => obs !== observer);
    };
  }, []);

  return (
    <div 
      className={styles.toastContainer} 
      style={{ zIndex: zIndex > 9000 ? zIndex : 9900 }} 
      role="status" 
      aria-live="polite"
    >
      {toasts.map(t => (
        <ToastItem key={t.id} data={t} onDismiss={() => toast.dismiss(t.id)} />
      ))}
    </div>
  );
};

export { ToastContainer as Toast };
