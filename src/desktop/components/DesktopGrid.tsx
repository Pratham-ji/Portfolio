import React, { useState, useEffect, useRef } from 'react';
import { DesktopItem } from '../runtime/DesktopItem';
import { DesktopIcon } from './DesktopIcon';
import { DesktopSession } from '../runtime/DesktopSession';
import { ApplicationRegistry } from '../../apps/registry/ApplicationRegistry';

interface DesktopGridProps {
  items: DesktopItem[];
}

export const DesktopGrid: React.FC<DesktopGridProps> = ({ items }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Roving tabindex - only one item focused at a time for keyboard nav
  const [focusedId, setFocusedId] = useState<string | null>(items.length > 0 ? items[0].id : null);
  const [announcement, setAnnouncement] = useState<string>('');

  useEffect(() => {
    // Mock subscription update from DesktopSession
    const timer = setInterval(() => {
      // setSelectedIds(DesktopSession.getSelectedIds());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (items.length === 0) return;
    const currentIndex = items.findIndex(i => i.id === focusedId);
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = Math.min(currentIndex + 1, items.length - 1);
        e.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = Math.max(currentIndex - 1, 0);
        e.preventDefault();
        break;
      case 'Home':
        nextIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        nextIndex = items.length - 1;
        e.preventDefault();
        break;
      case 'Enter':
        if (focusedId) {
          ApplicationRegistry.launch(focusedId);
        }
        e.preventDefault();
        return;
      case ' ':
        if (focusedId) {
          const newSet = new Set(selectedIds);
          if (newSet.has(focusedId)) newSet.delete(focusedId);
          else newSet.add(focusedId);
          setSelectedIds(newSet);
          setAnnouncement(`${newSet.has(focusedId) ? 'Selected' : 'Unselected'} ${items[currentIndex].name}`);
        }
        e.preventDefault();
        return;
      case 'Escape':
        setSelectedIds(new Set());
        setAnnouncement('Selection cleared');
        e.preventDefault();
        return;
    }

    if (nextIndex !== currentIndex) {
      const nextItem = items[nextIndex];
      setFocusedId(nextItem?.id);
      setAnnouncement(`Focused ${nextItem.name}`);
      
      // Auto focus the DOM element
      const el = document.getElementById(`desktop-icon-${nextItem?.id}`);
      if (el) el.focus();
    }
  };

  return (
    <div 
      ref={gridRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      onKeyDown={handleKeyDown}
    >
      <div 
        aria-live="polite" 
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
      >
        {announcement}
      </div>
      
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}>
        {items.map(item => (
          <div key={item.id} id={`desktop-icon-${item.id}`} tabIndex={focusedId === item.id ? 0 : -1} style={{ outline: 'none' }}>
            <DesktopIcon 
              item={item} 
              isSelected={selectedIds.has(item.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock usePlatform logic inside GridEngine
export const GridEngine = {
  CELL_WIDTH: 100,
  CELL_HEIGHT: 120,
  
  // Token integration
  RESERVED_TOP: 32, // --pos-shell-taskbar-height
  RESERVED_BOTTOM: 80, // --pos-shell-dock-height
  RESERVED_LEFT: 100,
  RESERVED_RIGHT: 100, // Adaptive for widgets
  
  reserveShellZones(width: number, height: number) {
    return {
      x: this.RESERVED_LEFT,
      y: this.RESERVED_TOP,
      width: width - this.RESERVED_LEFT - this.RESERVED_RIGHT,
      height: height - this.RESERVED_TOP - this.RESERVED_BOTTOM
    };
  },
  
  snapToGrid(x: number, y: number, screenWidth: number, screenHeight: number) {
    const bounds = this.reserveShellZones(screenWidth, screenHeight);
    
    // Clamp to reserved bounds
    const clampedX = Math.max(bounds.x, Math.min(x, bounds.x + bounds.width - this.CELL_WIDTH));
    const clampedY = Math.max(bounds.y, Math.min(y, bounds.y + bounds.height - this.CELL_HEIGHT));
    
    return {
      x: Math.round((clampedX - bounds.x) / this.CELL_WIDTH) * this.CELL_WIDTH + bounds.x,
      y: Math.round((clampedY - bounds.y) / this.CELL_HEIGHT) * this.CELL_HEIGHT + bounds.y
    };
  },
  
  findNearestCell(x: number, y: number, screenW: number, screenH: number) {
    return this.snapToGrid(x, y, screenW, screenH);
  },
  
  calculateVisibleCells(viewportBounds: any) {
    // Virtualization API prep
    return [];
  },
  
  autoArrange(items: DesktopItem[], screenW: number, screenH: number, platform: 'desktop' | 'tablet' | 'mobile') {
    // Desktop: vertical icon lane on the left
    // Tablet: adaptive multi-column grid
    // Mobile: centered paginated application grid
    return items;
  }
};
