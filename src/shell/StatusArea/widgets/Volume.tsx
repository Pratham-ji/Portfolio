import React, { useState, useEffect } from 'react';
import styles from '../StatusArea.module.css';
import { SettingsStore } from '../../../apps/settings/store/SettingsStore';
import { SoundEngine } from '../../../design-system/audio/SoundEngine';

export const Volume: React.FC = () => {
  const [volume, setVolume] = useState(50);
  const [tactileEnabled, setTactileEnabled] = useState<boolean>(() => {
    return SettingsStore.getValue<boolean>('tactileSound') !== false;
  });

  useEffect(() => {
    const handleVolume = (e: CustomEvent) => setVolume(e.detail);
    window.addEventListener('os-volume-change' as any, handleVolume);

    const unsub = SettingsStore.subscribe(() => {
      const isEnabled = SettingsStore.getValue<boolean>('tactileSound') !== false;
      setTactileEnabled(isEnabled);
    });

    return () => {
      window.removeEventListener('os-volume-change' as any, handleVolume);
      unsub();
    };
  }, []);

  const handleClick = () => {
    const next = !tactileEnabled;
    SoundEngine.playSwitchClick();
    SettingsStore.updateValue('tactileSound', next);
    setTactileEnabled(next);
  };

  return (
    <div
      className={styles.widgetItem}
      title={`Volume: ${volume}% (${tactileEnabled ? 'Acoustics Active' : 'Muted'})`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{ cursor: 'pointer', gap: '4px' }}
      aria-label={`Volume ${volume} percent, tactile sound ${tactileEnabled ? 'enabled' : 'muted'}`}
    >
      <span aria-hidden="true">{tactileEnabled ? '🔊' : '🔇'}</span>
      <span>{tactileEnabled ? `Vol ${volume}%` : 'Muted'}</span>
    </div>
  );
};
