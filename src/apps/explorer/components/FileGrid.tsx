import React, { useRef, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styles from '../Explorer.module.css';
import { FileNode } from '../../../runtime/filesystem/FileSystemTypes';
import { SelectionManager } from '../../../runtime/filesystem/SelectionManager';
import { ContextMenuService } from '../../../runtime/services/ContextMenuService';
import { PaperViewerStore } from '../../PaperViewer/store/PaperViewerStore';
import { ApplicationRegistry } from '../../registry/ApplicationRegistry';

interface FileGridProps {
  files: FileNode[];
  onNavigate: (id: string) => void;
  onPreview: (node: FileNode) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({ files, onNavigate, onPreview }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(SelectionManager.getSelected()));

  useEffect(() => {
    const unsub = SelectionManager.subscribe(() => {
      setSelectedIds(new Set(SelectionManager.getSelected()));
    });
    return unsub;
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: files.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 28, // ITEM_HEIGHT
    overscan: 5,
    initialRect: { width: 800, height: 600 },
  });

  const handleSelect = (e: React.MouseEvent, file: FileNode, index: number) => {
    SelectionManager.select(
      file.id, 
      e.metaKey || e.ctrlKey, 
      e.shiftKey, 
      files.map(f => f.id)
    );
    onPreview(file);
  };

  const handleOpenFile = (file: FileNode) => {
    if (file.isDirectory) {
      onNavigate(file.id);
      return;
    }
    const lower = file.name.toLowerCase();
    const isDoc = ['.paper', '.md', '.code', '.cpp', '.txt'].some(ext => lower.endsWith(ext));
    if (isDoc) {
      PaperViewerStore.openFile(file);
      ApplicationRegistry.launch('prathamos.paper');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, file: FileNode) => {
    e.preventDefault();
    if (!SelectionManager.has(file.id)) {
      SelectionManager.select(file.id);
    }
    onPreview(file);
    ContextMenuService.show({
      x: e.clientX,
      y: e.clientY,
      items: [
        { id: 'open', label: 'Open', action: () => handleOpenFile(file) },
        { id: 'rename', label: 'Rename', action: () => console.log('Rename', file.id) },
        { id: 'delete', label: 'Delete', action: () => console.log('Delete', file.id) }
      ]
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (files.length === 0) return;

    // A more complex keyboard navigation could be implemented in useExplorerKeyboard hook
    // We just handle some basics here
    const selected = Array.from(selectedIds);
    let currentIndex = files.findIndex(f => selected.includes(f.id));
    if (currentIndex === -1) currentIndex = 0;

    let newIndex = currentIndex;

    if (e.key === 'ArrowDown') {
      newIndex = Math.min(files.length - 1, currentIndex + 1);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      newIndex = Math.max(0, currentIndex - 1);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      const file = files[currentIndex];
      if (file) {
        handleOpenFile(file);
      }
      e.preventDefault();
      return;
    }

    if (newIndex !== currentIndex) {
      const file = files[newIndex];
      SelectionManager.select(file.id, e.metaKey || e.ctrlKey, e.shiftKey, files.map(f => f.id));
      rowVirtualizer.scrollToIndex(newIndex);
      onPreview(file);
    }
  };

  return (
    <div
      ref={parentRef}
      className={styles.gridContainer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="grid"
      aria-rowcount={files.length}
      style={{ overflowY: 'auto', outline: 'none', height: '100%', width: '100%' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {(() => {
          const virtualItems = rowVirtualizer.getVirtualItems();
          const itemsToRender = virtualItems.length > 0
            ? virtualItems.map(vr => ({ file: files[vr.index], key: vr.key, size: vr.size, start: vr.start, index: vr.index }))
            : files.map((file, idx) => ({ file, key: file.id, size: 28, start: idx * 28, index: idx }));

          return itemsToRender.map((item) => {
            const file = item.file;
            if (!file) return null;
            const isSelected = selectedIds.has(file.id);

            return (
              <div
                key={item.key}
                className={`${styles.fileRow} ${isSelected ? styles.selected : ''}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${item.size}px`,
                  transform: `translateY(${item.start}px)`,
                }}
                onClick={(e) => handleSelect(e, file, item.index)}
                onContextMenu={(e) => handleContextMenu(e, file)}
                onDoubleClick={() => handleOpenFile(file)}
                role="row"
                aria-rowindex={item.index + 1}
                aria-selected={isSelected}
              >
                <div className={styles.cellIcon}>{file.isDirectory ? '📁' : '📄'}</div>
                <div className={styles.cellName}>{file.name}</div>
                <div className={styles.cellDate}>{file.metadata?.lastModified ? file.metadata.lastModified.toLocaleDateString() : '--'}</div>
                <div className={styles.cellSize}>{file.metadata?.size ? `${(file.metadata.size / 1024).toFixed(0)} KB` : '--'}</div>
              </div>
            );
          });
        })()}
      </div>
      {files.length === 0 && (
        <div className={styles.emptyState}>Folder is empty</div>
      )}
    </div>
  );
};
