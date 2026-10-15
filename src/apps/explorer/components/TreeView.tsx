import React, { useState } from 'react';
import styles from '../Explorer.module.css';
import { FileSystemStore, FileNode } from '../store/FileSystemStore';

interface TreeViewProps {
  activeFolderId: string;
  onSelect: (id: string) => void;
}

export const TreeView: React.FC<TreeViewProps> = ({ activeFolderId, onSelect }) => {
  // Render just favorites and quick access to avoid rendering 100k nodes in the sidebar itself
  // Real implementation would use react-window or similar for a full deep tree
  const quickAccess = [
    FileSystemStore.getNode('pratham'),
    FileSystemStore.getNode('desktop'),
    FileSystemStore.getNode('documents'),
    FileSystemStore.getNode('downloads')
  ].filter(Boolean) as FileNode[];

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarHeader}>Favorites</div>
        {quickAccess.map(node => (
          <div 
            key={node.id} 
            className={`${styles.sidebarItem} ${activeFolderId === node.id ? styles.active : ''}`}
            onClick={() => onSelect(node.id)}
            role="treeitem"
            aria-selected={activeFolderId === node.id}
          >
            <span className={styles.icon}>📁</span>
            <span className={styles.label}>{node.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
