import React from 'react';
import styles from './WindowFrame.module.css';
import { useLayer } from '../../hooks/useLayer';
import { useFocus } from '../../hooks/useFocus';

export interface WindowFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string; // Required for LayerManager and FocusManager
  title?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: React.ReactNode;
}

/**
 * <WindowFrame />
 * A structural shell implementing Material 02 (Matte Aluminum).
 * Includes native OS traffic lights and strict 40px draggable hit area.
 * Consumes LayerManager for z-index and FocusManager for interactions.
 */
export const WindowFrame: React.FC<WindowFrameProps> = ({
  id,
  title = 'Application',
  onClose,
  onMinimize,
  onMaximize,
  className = '',
  style,
  children,
  ...props
}) => {
  const { zIndex, bringToFront } = useLayer(id);
  const { focus } = useFocus();

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    bringToFront();
    focus(id);
    props.onPointerDown?.(e);
  };

  return (
    <div 
      className={`material-metal ${styles.windowFrame} ${className}`.trim()}
      style={{ ...style, zIndex }}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {/* 40px Title Bar (Drag Region) */}
      <div className={styles.titleBar}>
        {/* Traffic Lights */}
        <div className={styles.trafficLights}>
          <button 
            className={`${styles.trafficLight} ${styles.lightClose}`} 
            onClick={(e) => { e.stopPropagation(); onClose?.(); }} 
            aria-label="Close" 
          />
          <button 
            className={`${styles.trafficLight} ${styles.lightMinimize}`} 
            onClick={(e) => { e.stopPropagation(); onMinimize?.(); }} 
            aria-label="Minimize" 
          />
          <button 
            className={`${styles.trafficLight} ${styles.lightMaximize}`} 
            onClick={(e) => { e.stopPropagation(); onMaximize?.(); }} 
            aria-label="Maximize" 
          />
        </div>
        
        {/* Title */}
        <div className={styles.title}>
          {title}
        </div>
        
        {/* Spacer for centering title */}
        <div className={styles.spacer} />
      </div>

      {/* Content Area */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
