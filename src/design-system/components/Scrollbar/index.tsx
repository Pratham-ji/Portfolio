// @ts-nocheck
import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Scrollbar.module.css';
import { usePlatform } from '../../hooks/usePlatform';
import { AccessibilityProvider } from '../../providers/AccessibilityProvider'; // Assume this exports a hook or we read media query
// Note: In 2.5.1 we built AccessibilityProvider. We can read prefers-reduced-transparency natively here if needed.

export interface ScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * <Scrollbar />
 * Platform-adaptive custom scrollbar.
 * - macOS: Overlay, fade in/out
 * - Windows: Persistent, blocky track
 * - Linux: Minimal
 */
export const Scrollbar: React.FC<ScrollbarProps> = ({
  orientation = 'vertical',
  platform,
  children,
  className = '',
  ...props
}) => {
  const { os } = usePlatform();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [reducedTransparency, setReducedTransparency] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-transparency: reduce)');
    setReducedTransparency(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedTransparency(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const updateScroll = useCallback(() => {
    if (!viewportRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = viewportRef.current;
    
    // Calculate thumb height
    const ratio = clientHeight / scrollHeight;
    const newHeight = Math.max(ratio * clientHeight, 20); // Min thumb height 20px
    setThumbHeight(ratio >= 1 ? 0 : newHeight); // Hide if no scroll needed

    // Calculate thumb position
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    const newTop = scrollRatio * (clientHeight - newHeight);
    setThumbTop(newTop || 0);
  }, []);

  useEffect(() => {
    updateScroll();
    const viewport = viewportRef.current;
    if (viewport) {
      const resizeObserver = new ResizeObserver(() => updateScroll());
      resizeObserver.observe(viewport);
      return () => resizeObserver.disconnect();
    }
  }, [updateScroll, children]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartScrollTop.current = viewportRef.current?.scrollTop || 0;
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!viewportRef.current) return;
      const { scrollHeight, clientHeight } = viewportRef.current;
      
      const deltaY = e.clientY - dragStartY.current;
      const scrollRatio = scrollHeight / clientHeight;
      viewportRef.current.scrollTop = dragStartScrollTop.current + (deltaY * scrollRatio);
    };

    const handlePointerUp = () => setIsDragging(false);

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  const platformClass = os === 'macos' ? styles['platform-mac'] : os === 'windows' ? styles['platform-windows'] : styles['platform-linux'];
  const rtClass = reducedTransparency ? styles['reduced-transparency'] : '';

  return (
    <div className={`${styles.scrollbarContainer} ${rtClass} ${className}`.trim()} {...props}>
      <div 
        className={styles.viewport} 
        ref={viewportRef} 
        onScroll={updateScroll}
      >
        {children}
      </div>
      
      {thumbHeight > 0 && (
        <div 
          className={`${styles.track} ${platformClass} ${isDragging ? styles.active : ''}`} 
          ref={trackRef}
        >
          <div 
            className={styles.thumb} 
            style={{ height: thumbHeight, transform: `translateY(${thumbTop}px)` }}
            onPointerDown={handlePointerDown}
          />
        </div>
      )}
    </div>
  );
};
