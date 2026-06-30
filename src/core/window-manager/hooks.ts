import { useContext, useCallback } from 'react';
import { WindowContext } from './Context';

/**
 * Hook to access and manipulate OS windows.
 * @returns Object containing window array, active ID, and window lifecycle methods.
 * @throws {Error} If used outside of WindowProvider
 */
export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowContext must be used within WindowProvider');
  }

  const openWindow = useCallback((appId: string, customTitle?: string) => {
    // Basic defaults; production values should derive from AppManifest or user settings
    const defaultWidth = 700;
    const defaultHeight = 500;
    const defaultX = window.innerWidth / 2 - defaultWidth / 2;
    const defaultY = window.innerHeight / 2 - defaultHeight / 2;

    context.dispatch({
      type: 'OPEN_WINDOW',
      payload: {
        id: `${appId}-${crypto.randomUUID()}`,
        appId,
        title: customTitle || appId,
        defaultPosition: { x: defaultX, y: defaultY },
        defaultSize: { width: defaultWidth, height: defaultHeight },
      }
    });
  }, [context]);

  const closeWindow = useCallback((id: string) => {
    context.dispatch({ type: 'CLOSE_WINDOW', payload: { id } });
  }, [context]);

  const minimizeWindow = useCallback((id: string) => {
    context.dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } });
  }, [context]);

  const maximizeWindow = useCallback((id: string) => {
    context.dispatch({ type: 'MAXIMIZE_WINDOW', payload: { id } });
  }, [context]);

  const focusWindow = useCallback((id: string) => {
    context.dispatch({ type: 'FOCUS_WINDOW', payload: { id } });
  }, [context]);

  const updateWindowTransform = useCallback((id: string, position?: { x: number; y: number }, size?: { width: number; height: number }) => {
    context.dispatch({ type: 'UPDATE_TRANSFORM', payload: { id, position, size } });
  }, [context]);

  return {
    windows: context.state.windows,
    activeWindowId: context.state.activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowTransform
  };
};
