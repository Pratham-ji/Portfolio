import React from 'react';
import { Bounds } from '../runtime/WindowTypes';

export type SnapOverlayState = 'idle' | 'preview' | 'commit' | 'cancel';

interface SnapOverlayProps {
  state: SnapOverlayState;
  bounds?: Bounds;
}

export const SnapOverlay: React.FC<SnapOverlayProps> = ({ state, bounds }) => {
  if (state === 'idle' || !bounds) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: bounds.width,
        height: bounds.height,
        transform: `translate3d(${bounds.x}px, ${bounds.y}px, 0)`,
        backgroundColor: 'rgba(10, 132, 255, 0.2)', // Interactive Blue with opacity
        border: '2px solid rgba(10, 132, 255, 0.8)',
        borderRadius: 'var(--pos-radius-lg)',
        pointerEvents: 'none',
        zIndex: 99999, // Overlay above all
        transition: 'all 150ms ease-out',
        opacity: state === 'preview' ? 1 : 0
      }}
    />
  );
};
