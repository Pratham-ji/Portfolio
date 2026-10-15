import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import styles from './Sidebar.module.css';
import { Splitter } from '../Splitter';
import { usePlatform } from '../../hooks/usePlatform';
import { MotionScheduler } from '../../motion/MotionScheduler';
import { MaterialSprings } from '../../motion/physics';

export type SidebarDensity = 'compact' | 'comfortable' | 'expanded';

export interface SidebarProps {
  density?: SidebarDensity;
  isCollapsed?: boolean;
  onResize?: (width: number) => void;
  onCollapseToggle?: (collapsed: boolean) => void;
  children: React.ReactNode;
}

export interface SidebarRef {
  collapse: () => void;
  expand: () => void;
}

const getPlatformWidths = (os: string) => {
  if (os === 'macos') return { compact: 200, comfortable: 260, expanded: 320 };
  if (os === 'windows') return { compact: 220, comfortable: 280, expanded: 340 };
  return { compact: 180, comfortable: 240, expanded: 300 }; // linux default
};

/**
 * <Sidebar />
 * Navigation backbone. Implements Material 02.
 */
export const Sidebar = forwardRef<SidebarRef, SidebarProps>(({
  density = 'comfortable',
  isCollapsed = false,
  onResize,
  onCollapseToggle,
  children
}, ref) => {
  const { os } = usePlatform();
  const widths = getPlatformWidths(os);
  const defaultWidth = widths[density];
  
  const [currentWidth, setCurrentWidth] = useState(defaultWidth);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync density changes if user hasn't heavily customized width
  useEffect(() => {
    setCurrentWidth(widths[density]);
  }, [density, os]); // intentionally omitting widths to avoid obj reference loops

  useImperativeHandle(ref, () => ({
    collapse: () => {
      onCollapseToggle?.(true);
    },
    expand: () => {
      onCollapseToggle?.(false);
    }
  }));

  useEffect(() => {
    if (containerRef.current) {
      MotionScheduler.schedule({
        targets: containerRef.current,
        width: isCollapsed ? 0 : currentWidth,
        duration: 250,
        easing: MaterialSprings.springMetal
      });
    }
  }, [isCollapsed, currentWidth]);

  const handleResize = (delta: number) => {
    const newWidth = Math.max(widths.compact - 50, Math.min(widths.expanded + 200, currentWidth + delta));
    setCurrentWidth(newWidth);
    onResize?.(newWidth);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Basic structural keyboard navigation trapping (Home/End/Arrows)
    // In a real tree view, this would be delegated to the Tree component
    if (e.key === 'Home') {
      // jump to first focusable
    } else if (e.key === 'End') {
      // jump to last focusable
    }
  };

  return (
    <div 
      ref={containerRef}
      className={styles.sidebarContainer}
      style={{ width: isCollapsed ? 0 : currentWidth }}
      onKeyDown={handleKeyDown}
      role="complementary"
    >
      <div className={styles.contentWrapper}>
        {children}
      </div>
      {!isCollapsed && (
        <div className={styles.splitterWrapper}>
          <Splitter orientation="vertical" onResize={handleResize} />
        </div>
      )}
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

// @ts-ignore - appending static metadata property
Sidebar.metadata = {
  material: "Material 02",
  motion: "springMetal",
  elevation: 0,
  accessibility: "AA",
  since: "2.5.3"
};
