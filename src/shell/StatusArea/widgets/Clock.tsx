import React, { useState, useEffect } from 'react';
import styles from '../StatusArea.module.css';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Run exactly on the minute boundary for efficiency in a real OS,
    // but a 1s interval is fine for the mock
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatted = time.toLocaleTimeString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  return <div className={styles.widgetItem}>{formatted}</div>;
};
