import React from 'react';
import styles from './Dock.module.css';
import { ApplicationRegistry } from '../../apps/registry/ApplicationRegistry';
import { SystemAppIcon } from '../../design-system/registry/IconRegistry';

interface DockItemProps {
  id: string;
  name: string;
  index: number;
  isRunning?: boolean;
  isActive?: boolean;
}

export const DockItem: React.FC<DockItemProps> = ({ id, name, index, isRunning, isActive }) => {
  const handleLaunch = () => {
    ApplicationRegistry.focusOrLaunch(id);
  };

  return (
    <div 
      className={styles.dockItemWrapper} 
      data-dock-index={index}
      role="button"
      tabIndex={0}
      aria-label={name}
      title={name}
      onClick={handleLaunch}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleLaunch();
          e.preventDefault();
        }
      }}
    >
      <div className={`${styles.dockItem} ${isActive ? styles.active : ''}`}>
        <div className={styles.dockIconContainer}>
          <SystemAppIcon id={id} size="L" />
        </div>
      </div>
      {isRunning && <div className={styles.runningIndicator} />}
    </div>
  );
};

