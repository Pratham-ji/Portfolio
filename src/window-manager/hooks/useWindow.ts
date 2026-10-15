// @ts-nocheck
import { useState, useEffect } from 'react';
import { WindowStore } from '../runtime/WindowStore';
import { WindowState } from '../runtime/WindowTypes';

export const useWindow = (windowId: string): WindowState | undefined => {
  const [windowState, setWindowState] = useState<WindowState | undefined>(() => WindowStore.getWindow(windowId));

  useEffect(() => {
    const unsubscribe = WindowStore.subscribe(() => {
      setWindowState(WindowStore.getWindow(windowId));
    });
    return unsubscribe;
  }, [windowId]);

  return windowState;
};
