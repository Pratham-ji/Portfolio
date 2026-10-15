import React from 'react';
import styles from '../StatusArea.module.css';

export const Bluetooth: React.FC = () => {
  return (
    <div className={styles.widgetItem} title="Bluetooth: On">
      BT
    </div>
  );
};
