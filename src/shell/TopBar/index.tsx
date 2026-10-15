import React from 'react';
import styles from './TopBar.module.css';
import { RecruiterDirectorController } from '../RecruiterDirector';

export const TopBar: React.FC = () => {
  return (
    <div className={styles.topBar}>
      <div className={styles.leftSection}>
        <div className={styles.menuItem} style={{ fontWeight: 'bold' }}>
          {/* OS Logo */}
          <span>P</span>
        </div>
        <div className={styles.menuItem} style={{ fontWeight: 600 }}>
          {/* Active Workspace or Active App Name */}
          PrathamOS
        </div>
        <div className={styles.menuItem}>File</div>
        <div className={styles.menuItem}>Edit</div>
        <div className={styles.menuItem}>View</div>
      </div>

      <div className={styles.centerSection}>
        <button
          className={styles.recruiterTourPill}
          onClick={() => RecruiterDirectorController.startTour()}
          aria-label="Start Recruiter Tour (30s)"
        >
          <span className={styles.tourSparkle}>✦</span>
          <span className={styles.tourText}>Recruiter Tour (30s)</span>
        </button>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.menuItem}>
          {/* Network */}
          <span className={styles.icon}>Wi-Fi</span>
        </div>
        <div className={styles.menuItem}>
          {/* Battery */}
          <span className={styles.icon}>100%</span>
        </div>
        <div className={styles.menuItem}>
          {/* Search Button */}
          <span className={styles.icon}>Search</span>
        </div>
        <div className={styles.menuItem}>
          {/* Clock */}
          <span>Mon 9:41 AM</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
