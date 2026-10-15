import React, { useState, useEffect } from 'react';
import styles from '../StatusArea.module.css';

export const Battery: React.FC = () => {
  const [level, setLevel] = useState(100);

  useEffect(() => {
    // Mock battery drain
    const timer = setInterval(() => {
      setLevel(prev => (prev > 0 ? prev - 1 : 100));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.widgetItem} title={`Battery: ${level}%`}>
      {level}% 
      {/* Real implementation would use an icon SVG dependent on level */}
    </div>
  );
};
