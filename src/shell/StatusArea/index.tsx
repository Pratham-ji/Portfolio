import React from 'react';
import styles from './StatusArea.module.css';
import { Clock } from './widgets/Clock';
import { Battery } from './widgets/Battery';
import { WiFi } from './widgets/WiFi';
import { Bluetooth } from './widgets/Bluetooth';
import { Volume } from './widgets/Volume';
import { Theme } from './widgets/Theme';

// The StatusArea is usually integrated into the TopBar's right section
export const StatusArea: React.FC = () => {
  return (
    <div className={styles.statusAreaContainer} role="group" aria-label="Status area">
      <Theme />
      <Bluetooth />
      <WiFi />
      <Volume />
      <Battery />
      <Clock />
    </div>
  );
};

export default StatusArea;
