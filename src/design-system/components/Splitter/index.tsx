import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './Splitter.module.css';

export interface SplitterProps {
  orientation?: 'horizontal' | 'vertical';
  onResize?: (delta: number) => void;
  onResizeEnd?: () => void;
  className?: string;
  min?: number;
  max?: number;
}

/**
 * <Splitter />
 * A 1px visual boundary with an 8px interactive hit area.
 * Supports pointer dragging and keyboard navigation.
 */
export const Splitter: React.FC<SplitterProps> = ({ 
  orientation = 'vertical',
  onResize,
  onResizeEnd,
  className = '',
  min,
  max
}) => {
  const isDragging = useRef(false);
  const lastPosition = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPosition.current = orientation === 'horizontal' ? e.clientY : e.clientX;
    document.body.style.cursor = orientation === 'horizontal' ? 'row-resize' : 'col-resize';
    
    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;

    const currentPos = orientation === 'horizontal' ? e.clientY : e.clientX;
    const delta = currentPos - lastPosition.current;
    
    if (onResize) {
      onResize(delta);
    }
    
    lastPosition.current = currentPos;
  }, [orientation, onResize]);

  const handlePointerUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      document.body.style.cursor = '';
      if (onResizeEnd) onResizeEnd();
    }
  }, [onResizeEnd]);

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let delta = 0;
    const step = e.shiftKey ? 10 : 1;
    
    if (orientation === 'vertical') {
      if (e.key === 'ArrowLeft') delta = -step;
      if (e.key === 'ArrowRight') delta = step;
    } else {
      if (e.key === 'ArrowUp') delta = -step;
      if (e.key === 'ArrowDown') delta = step;
    }

    if (delta !== 0 && onResize) {
      onResize(delta);
      if (onResizeEnd) onResizeEnd(); // Trigger commit for keyboard
    }
  };

  return (
    <div 
      className={`${styles.splitterContainer} ${styles[orientation]} ${className}`.trim()}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="separator"
      aria-orientation={orientation}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <div className={styles.divider} />
    </div>
  );
};
