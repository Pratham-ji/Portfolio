// @ts-nocheck
import React, { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { GlassPanel } from '../GlassPanel';
import { useLayer } from '../../hooks/useLayer';
import { useFocus } from '../../hooks/useFocus';
import { MotionScheduler } from '../../motion/MotionScheduler';
import { MaterialSprings } from '../../motion/physics';
import { LayerEnum } from '../../types/layer';

export type ModalVariant = 'dialog' | 'sheet' | 'popover' | 'fullscreen';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: ModalVariant;
  closeOnBackdropClick?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * <Modal />
 * High-priority structural overlay consuming Material 01 Glass.
 * Manages its own focus trapping and layer elevation.
 */
export const Modal: React.FC<ModalProps> & { metadata: any } = ({
  isOpen,
  onClose,
  variant = 'dialog',
  closeOnBackdropClick = true,
  children,
  className = ''
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const id = useId();
  // Request a layer starting at the ModalBase elevation
  const { zIndex } = useLayer(`modal-${id}`); // auto;
  const { focus, restorePreviousFocus } = useFocus();

  useEffect(() => {
    if (isOpen && modalRef.current) {
      focus(`modal-${id}`, undefined, modalRef.current);
      
      // Entrance Animation
      const isSheet = variant === 'sheet';
      MotionScheduler.schedule({
        targets: modalRef.current,
        opacity: [0, 1],
        scale: isSheet || variant === 'fullscreen' ? [1, 1] : [0.95, 1],
        translateY: isSheet ? ['100%', '0%'] : ['0%', '0%'],
        duration: 400,
        easing: MaterialSprings.springGlass
      });

      if (overlayRef.current) {
        MotionScheduler.schedule({
          targets: overlayRef.current,
          opacity: [0, 1],
          duration: 200,
          easing: 'easeOutQuad'
        });
      }
    } else if (!isOpen) {
      restorePreviousFocus();
    }
    
    return () => {
      if (isOpen) restorePreviousFocus();
    };
  }, [isOpen, id, focus, restorePreviousFocus, variant]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const content = (
    <div 
      ref={overlayRef}
      className={styles.overlay} 
      style={{ zIndex }}
      onClick={handleBackdropClick}
    >
      <GlassPanel
        ref={modalRef}
        variant="dynamicContent"
        className={`${styles.modal} ${styles[`variant-${variant}`]} ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()} // Prevent bubbling to backdrop
      >
        {children}
      </GlassPanel>
    </div>
  );

  // In a real app we'd portal to document.body, but for component library stability we'll check if document exists.
  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
};

Modal.metadata = {
  material: "Material 01 (Glass)",
  motion: "springGlass",
  elevation: 2000,
  accessibility: "AA",
  since: "2.5.3"
};
