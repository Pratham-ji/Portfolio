import React, { useRef } from 'react';
import { WindowState } from '../runtime/WindowTypes';
import { useWindow } from '../hooks/useWindow';
import { WindowRenderer } from './WindowRenderer';

interface WindowCompositorProps {
  windowId: string;
}

export const WindowCompositor: React.FC<WindowCompositorProps> = ({ windowId }) => {
  const windowState = useWindow(windowId);
  const compositorRef = useRef<HTMLDivElement>(null);

  if (!windowState || windowState.visibility === 'OFFSCREEN' || windowState.state === 'hidden') {
    return null; // Virtualize completely outside of viewport/hidden
  }

  // Occlusion tracking optimization could inject a class to pause animations internally
  const isOccluded = windowState.visibility === 'OCCLUDED';

  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowState.bounds.width,
    height: windowState.bounds.height,
    transform: `translate3d(${windowState.bounds.x}px, ${windowState.bounds.y}px, 0)`,
    zIndex: windowState.layer,
    pointerEvents: 'auto',
    display: windowState.state === 'minimized' ? 'none' : 'block',
    opacity: isOccluded ? 0.99 : 1 // Minor hack to trigger stacking context or pause repaints
  };

  return (
    <div 
      ref={compositorRef}
      style={style}
      data-window-id={windowId}
      data-focused={windowState.focused}
      data-state={windowState.state}
      data-occluded={isOccluded}
    >
      <WindowRenderer windowState={windowState} compositorRef={compositorRef} />
    </div>
  );
};
