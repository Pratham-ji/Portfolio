import React, { useState, useEffect, useCallback } from 'react';
import styles from './WelcomeBanner.module.css';
import { RecruiterDirectorController } from './RecruiterDirector';
import { PaperViewerStore } from '../apps/PaperViewer/store/PaperViewerStore';
import { ApplicationRegistry } from '../apps/registry/ApplicationRegistry';
import { SoundEngine } from '../design-system/audio/SoundEngine';

export interface WelcomeBannerProps {
  onDismiss?: () => void;
}

const STORAGE_KEY = 'prathamos_welcome_dismissed';

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  const dismiss = useCallback(() => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors in restricted contexts
    }
    if (onDismiss) onDismiss();
  }, [onDismiss]);

  // Automatically hide when Recruiter Tour begins
  useEffect(() => {
    const unsub = RecruiterDirectorController.subscribe((state) => {
      if (state.isActive) {
        setIsVisible(false);
      }
    });
    return unsub;
  }, []);

  if (!isVisible) return null;

  const handleTourClick = () => {
    SoundEngine.playTourStep();
    dismiss();
    setTimeout(() => {
      RecruiterDirectorController.startTour();
    }, 50);
  };

  const handleResumeClick = () => {
    SoundEngine.playSwitchClick();
    dismiss();
    PaperViewerStore.openByPathOrName('Resume_Prathamraj_Giri.paper');
    ApplicationRegistry.focusOrLaunch('prathamos.paper', {
      bounds: { x: 80, y: 50, width: 760, height: 600 }
    });
  };

  const handleArchClick = () => {
    SoundEngine.playSwitchClick();
    dismiss();
    ApplicationRegistry.focusOrLaunch('prathamos.engineering', {
      tab: 'architecture',
      bounds: { x: 80, y: 50, width: 880, height: 640 }
    });
  };

  return (
    <aside 
      className={styles.welcomeBanner} 
      role="region" 
      aria-label="Welcome and quick navigation"
    >
      <div className={styles.bannerHeader}>
        <div className={styles.headerText}>
          <span className={styles.sparkIcon} aria-hidden="true">✨</span>
          <span>Welcome to PrathamOS — Choose how you&apos;d like to explore:</span>
        </div>
        <button 
          type="button" 
          className={styles.dismissButton} 
          onClick={dismiss}
          aria-label="Dismiss welcome banner"
          title="Dismiss banner"
        >
          ×
        </button>
      </div>

      <div className={styles.buttonRow} role="toolbar" aria-label="Quick launch actions">
        <button 
          type="button" 
          className={`${styles.actionPill} ${styles.tourPill}`}
          onClick={handleTourClick}
        >
          <span>✦</span>
          <span>Auto-Play 30s Tour</span>
        </button>

        <button 
          type="button" 
          className={`${styles.actionPill} ${styles.secondaryPill}`}
          onClick={handleResumeClick}
        >
          <span>📄</span>
          <span>Fullscreen Resume</span>
        </button>

        <button 
          type="button" 
          className={`${styles.actionPill} ${styles.secondaryPill}`}
          onClick={handleArchClick}
        >
          <span>🏗️</span>
          <span>View System Architectures</span>
        </button>
      </div>
    </aside>
  );
};

export default WelcomeBanner;
