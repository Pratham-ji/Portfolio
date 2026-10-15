import React, { useRef } from 'react';
import styles from './Button.module.css';
import { MotionScheduler } from '../../motion/MotionScheduler';
import { MaterialSprings } from '../../motion/physics';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'toolbar' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

/**
 * <Button />
 * Tactile component using Material 03 (Soft Polymer) rules.
 * Consumes MotionScheduler for dynamic scaling based on variant.
 */
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'secondary',
  isLoading = false,
  className = '', 
  children, 
  ...props 
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const isCompact = variant === 'toolbar' || variant === 'icon';
  const pressScale = isCompact ? 0.98 : 0.96;

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (btnRef.current && !props.disabled && !isLoading) {
      MotionScheduler.schedule({
        targets: btnRef.current,
        scale: pressScale,
        duration: 150,
        easing: MaterialSprings.springPolymer
      });
    }
    props.onPointerDown?.(e);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (btnRef.current && !props.disabled && !isLoading) {
      MotionScheduler.schedule({
        targets: btnRef.current,
        scale: 1,
        duration: 180,
        easing: MaterialSprings.springPolymer
      });
    }
    props.onPointerUp?.(e);
  };

  const materialClass = variant === 'secondary' ? 'material-polymer' : '';
  
  return (
    <button
      ref={btnRef}
      className={`${styles.button} ${styles[`variant-${variant}`]} ${materialClass} ${className}`.trim()}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      disabled={props.disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? '...' : children}
    </button>
  );
};
