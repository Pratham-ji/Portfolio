import React, { useState, useCallback, KeyboardEvent } from 'react';
import { useFileSystem } from '../../core/file-system';
import { useWindowContext } from '../../core/window-manager';
import { DesktopIcon } from './DesktopIcon';
import { useApplication } from '../../core/application-manager';

/**
 * Renders the grid of desktop icons.
 * Handles selection, double-clicks, and keyboard navigation.
 */
import { handleGridNavigation } from './utils/navigation';

export const DesktopGrid: React.FC = () => {
  const { getChildren } = useFileSystem();
  const { openWindow } = useWindowContext();
  const { getAppManifest } = useApplication();
  
  const desktopNodes = getChildren('desktop');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelect = useCallback((id: string, multi: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(multi ? prev : []);
      if (multi && prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleDoubleClick = useCallback((id: string) => {
    const node = desktopNodes.find(n => n.id === id);
    if (!node) return;

    if (node.type === 'directory') {
      openWindow('explorer', node.name);
    } else if (node.appId) {
      const manifest = getAppManifest(node.appId);
      openWindow(node.appId, manifest?.name || node.name);
    } else {
      openWindow('notepad', node.name);
    }
    
    setSelectedIds(new Set());
  }, [desktopNodes, openWindow, getAppManifest]);

  const handleBackgroundClick = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const cols = Math.floor(window.innerHeight / 100);
    handleGridNavigation({ e, desktopNodes, selectedIds, handleSelect, cols });
  }, [desktopNodes, selectedIds, handleSelect]);

  return (
    <div 
      className="absolute inset-0 outline-none flex flex-col flex-wrap content-start p-2 gap-1 z-0"
      onClick={handleBackgroundClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="grid"
      aria-label="Desktop Icons"
    >
      {desktopNodes.map(node => (
        <DesktopIcon
          key={node.id}
          id={node.id}
          name={node.name}
          icon={node.icon || '📁'}
          isSelected={selectedIds.has(node.id)}
          onSelect={handleSelect}
          onDoubleClick={handleDoubleClick}
        />
      ))}
    </div>
  );
};
