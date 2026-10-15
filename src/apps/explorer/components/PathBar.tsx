import React from 'react';
import styles from '../Explorer.module.css';
import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';

export interface PathBarProps {
  activeFolderId: string;
  onNavigate: (id: string) => void;
}

export const PathBar: React.FC<PathBarProps> = ({ activeFolderId, onNavigate }) => {
  const path = FileSystemStore.getPath(activeFolderId);

  return (
    <div className={styles.breadcrumbs} role="navigation" aria-label="Breadcrumbs">
      {path.map((node, index) => (
        <React.Fragment key={node.id}>
          <div 
            className={styles.crumb} 
            onClick={() => onNavigate(node.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate(node.id);
              }
            }}
          >
            {node.name}
          </div>
          {index < path.length - 1 && (
            <span className={styles.crumbSeparator}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
