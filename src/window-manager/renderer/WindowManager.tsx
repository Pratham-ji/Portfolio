// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { WindowStore } from '../runtime/WindowStore';
import { WindowCompositor } from './WindowCompositor';
import { useKeyboardManager } from '../hooks/useKeyboardManager';
import { SnapOverlay, SnapOverlayState } from './SnapOverlay';
import { WindowEvents, WindowEventType } from '../runtime/WindowEvents';
import { Bounds } from '../runtime/WindowTypes';
import { DevToolsOverlay } from './DevToolsOverlay';

export const WindowWorkspace: React.FC<{ workspaceId: string }> = ({ workspaceId }) => {
  const [windowIds, setWindowIds] = useState<string[]>([]);
  
  // Local state for Snap Preview independent of WindowStore (transient)
  const [snapPreview, setSnapPreview] = useState<{ state: SnapOverlayState, bounds?: Bounds }>({ state: 'idle' });

  useEffect(() => {
    const sync = () => {
      setWindowIds(WindowStore.getWindowsForWorkspace(workspaceId).map(w => w.windowId));
    };
    sync();
    const unsub = WindowStore.subscribe(sync);
    return unsub;
  }, [workspaceId]);

  useEffect(() => {
    const unsubOn = WindowEvents.subscribe(WindowEventType.SNAP_PREVIEW_ACTIVATED, (payload) => {
      setSnapPreview({ state: 'preview', bounds: payload.previewBounds });
    });
    const unsubOff = WindowEvents.subscribe(WindowEventType.SNAP_PREVIEW_CLEARED, () => {
      setSnapPreview({ state: 'idle' });
    });
    
    return () => { unsubOn(); unsubOff(); };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {windowIds.map(id => (
        <WindowCompositor key={id} windowId={id} />
      ))}
      <SnapOverlay state={snapPreview.state} bounds={snapPreview.bounds} />
    </div>
  );
};

export const WindowManager: React.FC = () => {
  const [activeWorkspace, setActiveWorkspace] = useState(WindowStore.getActiveWorkspace());
  useKeyboardManager();

  useEffect(() => {
    const unsub = WindowEvents.subscribe(WindowEventType.WORKSPACE_CHANGED, (payload) => {
      setActiveWorkspace(payload.workspaceId);
    });
    return unsub;
  }, []);

  return (
    <>
      <WindowWorkspace workspaceId={activeWorkspace} />
      {/* DevTools enabled manually for dev */}
      {process.env.NODE_ENV === 'development' && <DevToolsOverlay />}
    </>
  );
};
