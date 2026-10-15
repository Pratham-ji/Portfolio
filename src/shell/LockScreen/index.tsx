import React, { useState, useEffect, useCallback } from 'react';
import styles from './LockScreen.module.css';
import { SoundEngine } from '../../design-system/audio/SoundEngine';
import { RecruiterDirectorController } from '../RecruiterDirector';
import { PaperViewerStore } from '../../apps/PaperViewer/store/PaperViewerStore';
import { ApplicationRegistry } from '../../apps/registry/ApplicationRegistry';

export interface LockScreenProps {
  onUnlock?: () => void;
  defaultLocked?: boolean;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, defaultLocked = false }) => {
  const [time, setTime] = useState(new Date());
  const [isLocked, setIsLocked] = useState(defaultLocked);

  const unlock = useCallback(() => {
    SoundEngine.playWindowSnap();
    setIsLocked(false);
    if (onUnlock) onUnlock();
  }, [onUnlock]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    const lockHandler = () => setIsLocked(true);
    window.addEventListener('os-lock', lockHandler);

    return () => {
      clearInterval(timer);
      window.removeEventListener('os-lock', lockHandler);
    };
  }, []);

  // Universal Keypress Unlock (Space, Enter, Escape or any alphanumeric key)
  useEffect(() => {
    if (!isLocked) return () => {};

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if modifiers alone are pressed
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      unlock();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLocked, unlock]);

  if (!isLocked) return null;

  const timeString = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const dateString = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const handleLaunchTour = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlock();
    setTimeout(() => {
      RecruiterDirectorController.startTour();
    }, 100);
  };

  const handleLaunchResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlock();
    PaperViewerStore.openByPathOrName('Resume_Prathamraj_Giri.paper');
    ApplicationRegistry.focusOrLaunch('prathamos.paper', {
      bounds: { x: 80, y: 50, width: 760, height: 600 }
    });
  };

  const handleLaunchDesktop = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlock();
  };

  return (
    <div 
      className={styles.lockScreenOverlay} 
      aria-label="Lock Screen"
      onClick={unlock}
    >
      <div 
        className={styles.portalContainer}
        onClick={(e) => {
          // Allow clicks directly on container to unlock as well
          if (e.target === e.currentTarget) unlock();
        }}
      >
        {/* Animated Clock & Date */}
        <div className={styles.clockContainer}>
          <div className={styles.time}>{timeString}</div>
          <div className={styles.date}>{dateString}</div>
        </div>

        {/* Optical Apex Biometric Scanner */}
        <div className={styles.biometricSection}>
          <div className={styles.scannerWrapper}>
            <svg viewBox="0 0 100 100" className={styles.scannerSvg} aria-hidden="true">
              {/* Outer structural track */}
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                stroke="rgba(255, 255, 255, 0.12)" 
                strokeWidth="2" 
                fill="none" 
              />
              {/* Pulsing scanning blue arc */}
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                stroke="#0A84FF" 
                strokeWidth="3.5" 
                strokeDasharray="65 190" 
                strokeLinecap="round" 
                fill="none" 
                className={styles.scannerArc} 
              />
              {/* Converging white apex bars */}
              <path d="M37 66 L47 34 L51 34 L43 66 Z" fill="#FFFFFF" opacity="0.95" />
              <path d="M63 66 L53 34 L49 34 L57 66 Z" fill="#FFFFFF" opacity="0.95" />
              {/* Crimson optical apex dot */}
              <circle 
                cx="50" 
                cy="28" 
                r="4" 
                fill="#D71921" 
                className={styles.apexDot} 
              />
            </svg>
          </div>

          <div className={styles.statusGroup}>
            <div className={styles.verifiedLabel}>Optical ID Verified</div>
            <div className={styles.accessSubtext}>Recruiter &amp; Guest Access Granted</div>
          </div>
        </div>

        {/* Tactile Entry Mode Cards */}
        <div className={styles.cardsRow} role="group" aria-label="Choose Entry Mode">
          {/* Card 1: Guided Recruiter Tour */}
          <button 
            type="button"
            className={styles.modeCard} 
            onClick={handleLaunchTour}
            aria-label="30s Guided Recruiter Tour"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>✦</span>
              <span className={styles.cardBadge}>Recommended</span>
            </div>
            <div className={styles.cardTitle}>30s Guided Recruiter Tour</div>
            <div className={styles.cardSubtitle}>
              Choreographed walkthrough through systems architecture, terminal &amp; telemetry
            </div>
          </button>

          {/* Card 2: Interactive Resume */}
          <button 
            type="button"
            className={styles.modeCard} 
            onClick={handleLaunchResume}
            aria-label="Read Interactive Resume"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>📄</span>
            </div>
            <div className={styles.cardTitle}>Read Interactive Resume</div>
            <div className={styles.cardSubtitle}>
              Full E-Ink CV for Prathamraj Giri (GEHU B.Tech 2026, internships &amp; skills)
            </div>
          </button>

          {/* Card 3: Direct Desktop Access */}
          <button 
            type="button"
            className={styles.modeCard} 
            onClick={handleLaunchDesktop}
            aria-label="Enter Desktop Workspace"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>⚡</span>
            </div>
            <div className={styles.cardTitle}>Enter Desktop Workspace</div>
            <div className={styles.cardSubtitle}>
              Explore freely with 60FPS Window Compositor, dock, and apps
            </div>
          </button>
        </div>

        {/* Universal Unlock Hint */}
        <div className={styles.universalHint}>
          Click anywhere or press <span className={styles.keyBadge}>Space</span> / <span className={styles.keyBadge}>Enter</span> / <span className={styles.keyBadge}>Esc</span> to enter
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
