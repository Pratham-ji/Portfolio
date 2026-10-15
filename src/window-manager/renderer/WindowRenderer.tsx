// @ts-nocheck
import React from 'react';
import { WindowState } from '../runtime/WindowTypes';
import { useWindowDrag } from '../hooks/useWindowDrag';
import { useWindowResize } from '../hooks/useWindowResize';
import { WindowFrame } from '../../design-system/components/WindowFrame';
import { WindowStore } from '../runtime/WindowStore';
import { ApplicationRegistry } from '../../apps/registry/ApplicationRegistry';
import { SoundEngine } from '../../design-system/audio/SoundEngine';

interface WindowRendererProps {
  windowState: WindowState;
  compositorRef: React.RefObject<HTMLDivElement>;
}

export const WindowRenderer: React.FC<WindowRendererProps> = ({ windowState, compositorRef }) => {
  const { onPointerDown: onDragStart } = useWindowDrag(windowState.windowId, compositorRef);
  const { getResizeHandler } = useWindowResize(windowState.windowId, compositorRef);
  const app = ApplicationRegistry.getApp(windowState.applicationId);

  return (
    <WindowFrame 
      id={windowState.windowId}
      title={windowState.title}
      isActive={windowState.focused}
      onPointerDownTitleBar={windowState.capabilities.move ? onDragStart : undefined}
      onClose={() => {
        SoundEngine.playWindowSnap();
        WindowStore.removeWindow(windowState.windowId);
      }}
      onMinimize={() => {
        SoundEngine.playWindowSnap();
        WindowStore.setWindowState(windowState.windowId, 'minimized');
      }}
      onMaximize={() => {
        SoundEngine.playWindowSnap();
        WindowStore.setWindowState(windowState.windowId, windowState.state === 'maximized' ? 'normal' : 'maximized');
      }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
        {app ? (
          <React.Suspense fallback={<div style={{ padding: 20, color: 'var(--pos-color-primary)' }}>Loading {app.metadata.name}...</div>}>
            <app.RootComponent />
          </React.Suspense>
        ) : (
          <div style={{ padding: 20, color: 'var(--pos-color-primary)' }}>
            App Payload: {windowState.applicationId}
          </div>
        )}
      </div>
      
      {windowState.capabilities.resize && windowState.state === 'normal' && (
        <>
          <div 
            style={{ position: 'absolute', bottom: -5, right: -5, width: 20, height: 20, cursor: 'nwse-resize', zIndex: 100 }} 
            onPointerDown={getResizeHandler('se')}
          />
          <div 
            style={{ position: 'absolute', bottom: -5, left: -5, width: 20, height: 20, cursor: 'nesw-resize', zIndex: 100 }} 
            onPointerDown={getResizeHandler('sw')}
          />
          <div 
            style={{ position: 'absolute', top: -5, right: -5, width: 20, height: 20, cursor: 'nesw-resize', zIndex: 100 }} 
            onPointerDown={getResizeHandler('ne')}
          />
          <div 
            style={{ position: 'absolute', top: -5, left: -5, width: 20, height: 20, cursor: 'nwse-resize', zIndex: 100 }} 
            onPointerDown={getResizeHandler('nw')}
          />
        </>
      )}
    </WindowFrame>
  );
};
