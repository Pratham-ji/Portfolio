import React, { useRef, useEffect, useState } from 'react';
import styles from './Dock.module.css';
import { DockItem } from './DockItem';
import { DockPhysics } from './DockPhysics';
import { WindowStore } from '../../window-manager/runtime/WindowStore';

interface PinnedApp {
  id: string;
  name: string;
  matchIds: string[];
}

const PINNED_APPS: PinnedApp[] = [
  { id: 'explorer', name: 'Explorer', matchIds: ['explorer', 'finder'] },
  { id: 'terminal', name: 'Terminal', matchIds: ['terminal', 'prathamos.terminal'] },
  { id: 'prathamos.engineering', name: 'Engineering Hub', matchIds: ['prathamos.engineering', 'engineering'] },
  { id: 'prathamos.paper', name: 'Resume & Docs', matchIds: ['prathamos.paper', 'paper', 'resume'] },
  { id: 'settings', name: 'Settings', matchIds: ['settings', 'prathamos.settings'] },
];

export const Dock: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windows, setWindows] = useState(() => WindowStore.getAllWindows());

  useEffect(() => {
    const sync = () => setWindows(WindowStore.getAllWindows());
    const unsub = WindowStore.subscribe(sync);
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      DockPhysics.init(containerRef.current);
    }
    return () => DockPhysics.cleanup();
  }, []);

  return (
    <div className={styles.dockWrapper}>
      <div className={styles.dockContainer} ref={containerRef} role="toolbar" aria-label="Dock">
        {PINNED_APPS.map((app, index) => {
          const isRunning = windows.some(w => app.matchIds.includes(w.applicationId));
          const isActive = windows.some(w => app.matchIds.includes(w.applicationId) && w.focused);

          return (
            <DockItem 
              key={app.id} 
              id={app.id}
              name={app.name}
              index={index}
              isRunning={isRunning}
              isActive={isActive}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dock;

