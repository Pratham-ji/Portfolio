import React, { useState, useEffect } from 'react';
import styles from './QuickSettings.module.css';

export const QuickSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(80);

  useEffect(() => {
    const handleToggle = (e: CustomEvent) => setIsOpen(e.detail !== undefined ? e.detail : !isOpen);
    window.addEventListener('toggle-quick-settings' as any, handleToggle);
    return () => window.removeEventListener('toggle-quick-settings' as any, handleToggle);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div 
        className={styles.panel} 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Quick Settings"
      >
        <div className={styles.grid}>
          {/* Network & Bluetooth (pill modules) */}
          <div className={styles.moduleBlock} style={{ gridColumn: 'span 2' }}>
            <div className={styles.toggleRow}>
              <div className={styles.toggleIcon} data-active="true" />
              <div className={styles.toggleLabel}>Wi-Fi</div>
            </div>
            <div className={styles.toggleRow}>
              <div className={styles.toggleIcon} />
              <div className={styles.toggleLabel}>Bluetooth</div>
            </div>
          </div>

          {/* Theme & Motion */}
          <div className={styles.moduleBlock}>
            <div className={styles.toggleIcon} data-active="true" style={{ margin: '0 auto 8px' }} />
            <div className={styles.centerLabel}>Dark Mode</div>
          </div>
          <div className={styles.moduleBlock}>
            <div className={styles.toggleIcon} style={{ margin: '0 auto 8px' }} />
            <div className={styles.centerLabel}>Accessibility</div>
          </div>
        </div>

        {/* Sliders */}
        <div className={styles.sliderGroup}>
          <div className={styles.sliderRow}>
            <span>☀️</span>
            <input 
              type="range" 
              className={styles.slider} 
              value={brightness} 
              onChange={e => setBrightness(Number(e.target.value))} 
              aria-label="Brightness"
            />
          </div>
          <div className={styles.sliderRow}>
            <span>🔊</span>
            <input 
              type="range" 
              className={styles.slider} 
              value={volume} 
              onChange={e => {
                setVolume(Number(e.target.value));
                window.dispatchEvent(new CustomEvent('os-volume-change', { detail: Number(e.target.value) }));
              }} 
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button 
            className={styles.settingsBtn}
            onClick={() => {
              console.log('OS_LAUNCH_APP', 'settings');
              setIsOpen(false);
            }}
          >
            System Settings...
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickSettings;
