import React, { useEffect, useState } from 'react';
import styles from '../Explorer.module.css';
import { TreeController } from './TreeController';
import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';
import { FileNode } from '../../../runtime/filesystem/FileSystemTypes';

interface TreeItemProps {
  node: FileNode;
  level: number;
  onSelect: (id: string) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, level, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(TreeController.isExpanded(node.id));
  const [isActive, setIsActive] = useState(TreeController.getActive() === node.id);

  useEffect(() => {
    const unsub = TreeController.subscribe(() => {
      setIsExpanded(TreeController.isExpanded(node.id));
      setIsActive(TreeController.getActive() === node.id);
    });
    return unsub;
  }, [node.id]);

  const hasChildren = node.isDirectory && node.childrenIds && node.childrenIds.length > 0;
  
  // Filter out the benchmark folder from the tree to avoid massive tree rendering
  // The user will navigate it through the main FileGrid
  const children = hasChildren 
    ? FileSystemStore.getChildren(node.id).filter(c => c.isDirectory && c.id !== 'benchmark')
    : [];

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      TreeController.toggleExpand(node.id);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    TreeController.setActive(node.id);
    onSelect(node.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    } else if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
      e.preventDefault();
      TreeController.expand(node.id);
    } else if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
      e.preventDefault();
      TreeController.collapse(node.id);
    }
  };

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isActive}>
      <div 
        className={`${styles.sidebarItem} ${isActive ? styles.active : ''}`}
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div 
          className={styles.icon} 
          onClick={handleToggle}
          style={{ visibility: hasChildren ? 'visible' : 'hidden', cursor: 'pointer', opacity: 0.5 }}
        >
          {isExpanded ? '▼' : '▶'}
        </div>
        <div className={styles.icon}>
          {node.isDirectory ? '📁' : '📄'}
        </div>
        <div className={styles.cellName}>
          {node.name}
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div role="group">
          {children.map(child => (
            <TreeItem 
              key={child.id} 
              node={child} 
              level={level + 1} 
              onSelect={onSelect} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeRenderer: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const rootNode = FileSystemStore.getNode(TreeController.getRoot());

  if (!rootNode) return null;

  const children = FileSystemStore.getChildren(rootNode.id).filter(c => c.isDirectory);

  return (
    <div role="tree" aria-label="File System Tree" className={styles.sidebarSection}>
      <div className={styles.sidebarHeader}>Macintosh HD</div>
      {children.map(child => (
        <TreeItem key={child.id} node={child} level={0} onSelect={onNavigate} />
      ))}
    </div>
  );
};
