// @ts-nocheck
import React, { useEffect, useRef, useState, useId } from 'react';
import styles from './Tooltip.module.css';
import { MotionScheduler } from '../../motion/MotionScheduler';
import { useLayer } from '../../hooks/useLayer';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
}

/**
 * <Tooltip />
 * High-elevation, low-latency overlay (Surface 5).
 * Motion: MICRO (100ms), 0 delay.
 * Edge detection available via 'auto' position.
 */
export const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'auto'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [computedPos, setComputedPos] = useState<Exclude<TooltipPosition, 'auto'>>(
    position === 'auto' ? 'top' : position
  );
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const id = useId();
  
  // Tooltips are transient high-layer elements
  const { zIndex } = useLayer(`tooltip-${id}`);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      
      // Edge Detection Logic for 'auto'
      if (position === 'auto') {
        const rect = containerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        
        let newPos: Exclude<TooltipPosition, 'auto'> = 'top';
        
        // Very basic collision checks
        if (rect.top - tooltipRect.height - 8 < 0) {
          newPos = 'bottom';
        } else if (rect.left - tooltipRect.width - 8 < 0 && rect.right + tooltipRect.width + 8 < window.innerWidth) {
          newPos = 'right'; // fallback if left is tight but right is free
        }
        
        setComputedPos(newPos);
      } else {
        setComputedPos(position);
      }

      // We need to re-apply the correct transform values for Anime.js
      // Since anime.js overwrites transform, we must explicitly combine the positioning translations with scale
      const translateX = computedPos === 'top' || computedPos === 'bottom' ? '-50%' : '0%';
      const translateY = computedPos === 'left' || computedPos === 'right' ? '-50%' : '0%';
      const offsetTranslateY = computedPos === 'top' ? 4 : computedPos === 'bottom' ? -4 : 0;
      
      MotionScheduler.schedule({
        targets: tooltipRef.current,
        opacity: [0, 1],
        scale: [0.94, 1],
        translateX: [translateX, translateX], // Preserve the CSS centering
        translateY: [`calc(${translateY} + ${offsetTranslateY}px)`, translateY],
        duration: 100, // MICRO
        easing: 'easeOutQuad',
      });
    }
  }, [isVisible, position, computedPos]);

  return (
    <div 
      ref={containerRef}
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`${styles.tooltip} ${styles[`pos-${computedPos}`]}`}
          style={{ zIndex }}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};
