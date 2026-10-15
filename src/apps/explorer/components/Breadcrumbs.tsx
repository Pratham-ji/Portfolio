import React from 'react';
import styles from '../Explorer.module.css';
import { FileSystemStore, FileNode } from '../store/FileSystemStore';

interface BreadcrumbsProps {
  activeFolderId: string;
  onNavigate: (id: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeFolderId, onNavigate }) => {
  const path = FileSystemStore.getPath(activeFolderId);

  return (
    <div className={styles.breadcrumbs} role="navigation" aria-label="Breadcrumb">
      {path.map((node, i) => (
        <React.Fragment key={node.id}>
          <div 
            className={styles.crumb} 
            onClick={() => onNavigate(node.id)}
            role="button"
            tabIndex={0}
          >
            {node.name}
          </div>
          {i < path.length - 1 && <div className={styles.crumbSeparator}>/</div>}
        </React.Fragment>
      ))}
    </div>
  );
};
