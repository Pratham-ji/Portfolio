import React, { useEffect, useRef, useState, useId } from 'react';
import styles from './ContextMenu.module.css';
import { GlassPanel } from '../GlassPanel';
import { MotionScheduler } from '../../motion/MotionScheduler';
import { useLayer } from '../../hooks/useLayer';
import { useFocus } from '../../hooks/useFocus';

export interface ContextMenuItem {
  id: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
  subItems?: ContextMenuItem[];
}

export interface ContextMenuProps {
  items: (ContextMenuItem | 'separator')[];
  x: number;
  y: number;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, x, y, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const { zIndex } = useLayer(`context-menu-${id}`);
  const { focus, restorePreviousFocus } = useFocus();

  const [position, setPosition] = useState({ left: x, top: y });
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Filter out separators for keyboard navigation indexing
  const focusableItems = items.filter(item => item !== 'separator') as ContextMenuItem[];

  // Viewport Edge Detection
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      let newLeft = x;
      let newTop = y;

      if (x + rect.width > window.innerWidth) {
        newLeft = window.innerWidth - rect.width - 8;
      }
      if (y + rect.height > window.innerHeight) {
        newTop = window.innerHeight - rect.height - 8;
      }

      setPosition({ left: Math.max(8, newLeft), top: Math.max(8, newTop) });

      // Entrance animation
      MotionScheduler.schedule({
        targets: menuRef.current,
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 150, // QUICK-ish
        easing: 'easeOutQuad'
      });
    }
  }, [x, y]);

  // Outside Click & Focus Trapping
  useEffect(() => {
    const handleGlobalPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % focusableItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 < 0 ? focusableItems.length - 1 : prev - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < focusableItems.length) {
          const item = focusableItems[focusedIndex];
          if (!item.disabled && item.onClick) {
            item.onClick();
            onClose();
          }
        }
      }
    };

    document.addEventListener('pointerdown', handleGlobalPointerDown);
    document.addEventListener('keydown', handleKeyDown);

    // Initial focus trap
    focus(`context-menu-${id}`, undefined, menuRef.current!);

    return () => {
      document.removeEventListener('pointerdown', handleGlobalPointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      restorePreviousFocus();
    };
  }, [onClose, focusableItems, focusedIndex, id, focus, restorePreviousFocus]);

  // Keep internal DOM focus synced with virtual focusedIndex
  useEffect(() => {
    if (focusedIndex >= 0 && menuRef.current) {
      const buttons = Array.from(menuRef.current.querySelectorAll('button'));
      const target = buttons[focusedIndex];
      if (target) {
        target.focus();
      }
    }
  }, [focusedIndex]);

  return (
    <GlassPanel 
      ref={menuRef}
      className={styles.contextMenu}
      style={{ left: position.left, top: position.top, zIndex }}
      role="menu"
      tabIndex={-1}
    >
      {items.map((item, index) => {
        if (item === 'separator') {
          return <div key={`sep-${index}`} className={styles.separator} role="separator" />;
        }

        return (
          <button
            key={item.id}
            className={styles.item}
            role="menuitem"
            aria-disabled={item.disabled}
            onClick={() => {
              if (!item.disabled) {
                item.onClick?.();
                onClose();
              }
            }}
            onMouseEnter={() => {
              const focusIdx = focusableItems.findIndex(i => i.id === item.id);
              setFocusedIndex(focusIdx);
            }}
            tabIndex={-1}
          >
            <span>{item.label}</span>
            {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
            {item.subItems && <span className={styles.shortcut}>▶</span>}
          </button>
        );
      })}
    </GlassPanel>
  );
};
