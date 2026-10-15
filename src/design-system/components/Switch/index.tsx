import React, { useRef, useEffect } from 'react';
import styles from './Switch.module.css';
import { MotionScheduler } from '../../motion/MotionScheduler';
import { MaterialSprings } from '../../motion/physics';
import { SoundEngine } from '../../audio/SoundEngine';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

/**
 * <Switch />
 * Implements Material Polymer.
 * Strictly uses Interactive Blue, not OS green defaults.
 */
export const Switch: React.FC<SwitchProps> & { metadata: any } = ({
  checked,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Motion physics
  useEffect(() => {
    if (thumbRef.current) {
      // Calculate translate distance
      let travel = 0;
      if (size === 'sm') travel = 12; // 28 - 12 - 4
      if (size === 'md') travel = 20; // 44 - 20 - 4
      if (size === 'lg') travel = 20; // 52 - 28 - 4
      
      MotionScheduler.schedule({
        targets: thumbRef.current,
        translateX: checked ? travel : 0,
        duration: 300,
        easing: MaterialSprings.springPolymer
      });
    }
  }, [checked, size]);

  const toggle = () => {
    if (!disabled) {
      SoundEngine.playSwitchClick();
      onChange(!checked);
    }
  };

  const handlePointerDown = () => {
    if (disabled || !trackRef.current) return;
    const scale = size === 'sm' ? 0.98 : 0.96;
    MotionScheduler.schedule({
      targets: trackRef.current,
      scale,
      duration: 100,
      easing: 'easeOutQuad'
    });
  };

  const handlePointerUp = () => {
    if (disabled || !trackRef.current) return;
    MotionScheduler.schedule({
      targets: trackRef.current,
      scale: 1,
      duration: 250,
      easing: MaterialSprings.springPolymer
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
      handlePointerDown();
      setTimeout(handlePointerUp, 150);
    }
  };

  return (
    <div
      id={id}
      className={`${styles.switchContainer} ${styles[`size-${size}`]} ${className}`.trim()}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      data-disabled={disabled}
    >
      <div 
        ref={trackRef} 
        className={styles.track} 
        data-checked={checked}
      >
        <div ref={thumbRef} className={styles.thumb} />
      </div>
    </div>
  );
};

Switch.metadata = {
  material: "Material 03 (Polymer)",
  motion: "springPolymer",
  elevation: 0,
  accessibility: "AA",
  since: "2.5.3"
};
