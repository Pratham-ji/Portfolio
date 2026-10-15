import React, { useRef } from 'react';
import styles from './GlassPanel.module.css';
import { MotionScheduler } from '../../motion/MotionScheduler';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dynamicContent' | 'highContrast';
  blur?: number; // Though constitution says 20px, allows override if specifically requested
  interactive?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * <GlassPanel />
 * Implements Material 01 (Frosted Glass).
 */
export const GlassPanel: React.FC<GlassPanelProps> = ({ 
  variant = 'default',
  blur = 20,
  interactive = false,
  className = '', 
  style,
  children, 
  ...props 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && ref.current) {
      MotionScheduler.schedule({
        targets: ref.current,
        scale: 0.98,
        duration: 150,
        easing: 'easeOutQuad'
      });
    }
    props.onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && ref.current) {
      MotionScheduler.schedule({
        targets: ref.current,
        scale: 1,
        duration: 250,
        easing: 'easeOutQuad'
      });
    }
    props.onMouseUp?.(e);
  };

  const dynamicStyle: React.CSSProperties = {
    ...style,
    ...(blur !== 20 ? { 
      backdropFilter: `blur(${blur}px) saturate(145%)`, 
      WebkitBackdropFilter: `blur(${blur}px) saturate(145%)` 
    } : {})
  };

  return (
    <div 
      ref={ref}
      className={`${styles.glassPanel} ${styles[`variant-${variant}`]} ${interactive ? styles.interactive : ''} ${className}`.trim()} 
      style={dynamicStyle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      {...props}
    >
      {children}
    </div>
  );
};
