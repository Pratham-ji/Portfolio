import React, { useEffect, useRef } from 'react';
import { DesktopSession } from '../runtime/DesktopSession';

export const DesktopSelectionOverlay: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    DesktopSession.setOverlayElement(ref.current);
    return () => DesktopSession.setOverlayElement(null);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'var(--pos-selection-bg, rgba(10, 132, 255, 0.25))',
        border: '1px solid var(--pos-selection-border, rgba(10, 132, 255, 0.60))',
        pointerEvents: 'none',
        opacity: 0, // Hidden by default, animated by physics engine
        zIndex: 999, // Above desktop icons
        // Enforcing GPU-accelerated translate3d only with no backdrop-filters
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none'
      }}
    />
  );
};
