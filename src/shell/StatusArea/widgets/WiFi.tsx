import React from 'react';
import styles from '../StatusArea.module.css';

export const WiFi: React.FC = () => {
  return (
    <div className={styles.widgetItem} title="Wi-Fi: Connected">
      Wi-Fi
    </div>
  );
};
