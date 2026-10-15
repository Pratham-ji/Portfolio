import React, { useState, useEffect, useRef } from 'react';
import styles from './WorkspaceSwitcher.module.css';
import { WorkspacePhysics } from './WorkspacePhysics';

// Mock dependencies
// import { WorkspaceManager } from '../../desktop/runtime/WorkspaceManager';

const mockWorkspaces = [
  { id: 'ws-1', name: 'Desktop 1', active: true },
  { id: 'ws-2', name: 'Desktop 2', active: false },
  { id: 'ws-3', name: 'Desktop 3', active: false }
];

export const WorkspaceSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState(mockWorkspaces);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = (e: KeyboardEvent) => {
      // Ctrl+Up to open Mission Control / Workspace Switcher
      if (e.ctrlKey && e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleToggle);
    return () => window.removeEventListener('keydown', handleToggle);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      WorkspacePhysics.init(containerRef.current);
    }
    return () => WorkspacePhysics.cleanup();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div 
        className={styles.switcherTopBar} 
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        role="region"
        aria-label="Workspace Switcher"
      >
        <div className={styles.workspaceTrack}>
          {workspaces.map((ws, index) => (
            <div 
              key={ws.id} 
              className={`${styles.workspaceCard} ${ws.active ? styles.active : ''}`}
              data-workspace-id={ws.id}
              tabIndex={0}
              role="button"
              onClick={() => {
                // WorkspaceManager.switchTo(ws.id);
                setIsOpen(false);
              }}
            >
              <div className={styles.previewPlaceholder} />
              <div className={styles.workspaceName}>{ws.name}</div>
            </div>
          ))}
          
          <div className={styles.addWorkspaceBtn} tabIndex={0} role="button">
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSwitcher;
