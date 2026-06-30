import { describe, it, expect } from 'vitest';
import { windowReducer } from './reducer';
import { WindowManagerState } from './types';

describe('Window Manager Reducer', () => {
  const initialState: WindowManagerState = {
    windows: [],
    activeWindowId: null,
    highestZIndex: 100,
  };

  it('should open a new window', () => {
    const action = {
      type: 'OPEN_WINDOW' as const,
      payload: { id: 'app1', appId: 'app1', title: 'Test App', defaultPosition: { x: 0, y: 0 }, defaultSize: { width: 400, height: 300 } },
    };
    const state = windowReducer(initialState, action);
    expect(state.windows.length).toBe(1);
    expect(state.windows[0]!.id).toBe('app1');
    expect(state.activeWindowId).toBe('app1');
  });

  it('should close a window', () => {
    const stateWithWindow: WindowManagerState = {
      ...initialState,
      windows: [{ id: 'app1', appId: 'app1', title: 'Test App', isMinimized: false, isMaximized: false, position: {x:0, y:0}, size: {width: 400, height: 300}, zIndex: 101 }],
      activeWindowId: 'app1'
    };
    const action = { type: 'CLOSE_WINDOW' as const, payload: { id: 'app1' } };
    const state = windowReducer(stateWithWindow, action);
    expect(state.windows.length).toBe(0);
    expect(state.activeWindowId).toBeNull();
  });
});
