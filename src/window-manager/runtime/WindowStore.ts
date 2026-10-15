import { WindowState, Bounds, Workspace, WindowStateStatus } from './WindowTypes';
import { WindowEvents, WindowEventType } from './WindowEvents';
import { WindowSpatialIndex } from './WindowSpatialIndex';
import { executeAndPushCommand, MoveCommand, ResizeCommand, StateChangeCommand } from './WindowCommands';
import { DefaultCapabilities } from './WindowCapabilities';

type Subscriber = () => void;

class Store {
  private windows: Map<string, WindowState> = new Map();
  private workspaces: Map<string, Workspace> = new Map();
  private activeWorkspaceId: string = 'default';
  private subscribers: Set<Subscriber> = new Set();
  
  private nextLayer: number = 10;

  constructor() {
    this.workspaces.set('default', {
      id: 'default',
      name: 'Desktop 1',
      windowIds: [],
      layout: 'floating'
    });
  }

  subscribe(callback: Subscriber) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notify() {
    this.subscribers.forEach(cb => cb());
  }

  getWindow(id: string): WindowState | undefined {
    return this.windows.get(id);
  }

  getAllWindows(): WindowState[] {
    return Array.from(this.windows.values());
  }
  
  getWindowsForWorkspace(workspaceId: string): WindowState[] {
    const ws = this.workspaces.get(workspaceId);
    if (!ws) return [];
    return ws.windowIds
      .map(id => this.windows.get(id))
      .filter((w): w is WindowState => w !== undefined);
  }

  getActiveWorkspace(): string {
    return this.activeWorkspaceId;
  }
  
  setActiveWorkspace(id: string) {
    if (this.workspaces.has(id)) {
      this.activeWorkspaceId = id;
      WindowEvents.emit(WindowEventType.WORKSPACE_CHANGED, { workspaceId: id });
      this.notify();
    }
  }

  addWindow(window: WindowState) {
    window.layer = this.nextLayer++;
    // Default visibility setup
    window.visibility = 'VISIBLE';
    
    this.windows.set(window.windowId, window);
    
    const ws = this.workspaces.get(window.workspaceId);
    if (ws) {
      ws.windowIds.push(window.windowId);
    }
    
    WindowSpatialIndex.update(window.windowId, window.bounds);
    WindowEvents.emit(WindowEventType.WINDOW_OPENED, { windowId: window.windowId });
    this.notify();
  }

  removeWindow(windowId: string) {
    const win = this.windows.get(windowId);
    if (win) {
      this.windows.delete(windowId);
      WindowSpatialIndex.remove(windowId);
      
      const ws = this.workspaces.get(win.workspaceId);
      if (ws) {
        ws.windowIds = ws.windowIds.filter(wid => wid !== windowId);
      }
      
      WindowEvents.emit(WindowEventType.WINDOW_CLOSED, { windowId });
      this.notify();
    }
  }

  // Called directly by commands
  updateBoundsInternal(windowId: string, bounds: Bounds) {
    const win = this.windows.get(windowId);
    if (win) {
      win.previousBounds = win.bounds;
      win.bounds = bounds;
      WindowSpatialIndex.update(windowId, bounds);
      WindowEvents.emit(WindowEventType.WINDOW_MOVED, { windowId, bounds });
      this.notify();
    }
  }

  updateStateInternal(windowId: string, state: WindowStateStatus) {
    const win = this.windows.get(windowId);
    if (win) {
      win.state = state;
      WindowEvents.emit(WindowEventType.WINDOW_STATE_CHANGED, { windowId, state });
      this.notify();
    }
  }

  // Public APIs for committing geometry (uses Command pattern)
  commitWindowMove(windowId: string, bounds: Bounds) {
    const win = this.windows.get(windowId);
    if (win && win.capabilities.move) {
      executeAndPushCommand(new MoveCommand(windowId, win.bounds, bounds));
    }
  }

  commitWindowResize(windowId: string, bounds: Bounds) {
    const win = this.windows.get(windowId);
    if (win && win.capabilities.resize) {
      executeAndPushCommand(new ResizeCommand(windowId, win.bounds, bounds));
    }
  }
  
  focusWindow(windowId: string) {
    const win = this.windows.get(windowId);
    if (win) {
      win.focused = true;
      win.layer = this.nextLayer++;
      
      this.windows.forEach((w, key) => {
        if (key !== windowId) w.focused = false;
      });
      
      WindowEvents.emit(WindowEventType.WINDOW_FOCUSED, { windowId });
      this.notify();
    }
  }
  
  setWindowState(windowId: string, state: WindowStateStatus) {
    const win = this.windows.get(windowId);
    if (win) {
      if (state === 'maximized' && !win.capabilities.maximize) return;
      if (state === 'minimized' && !win.capabilities.minimize) return;
      if (state === 'fullscreen' && !win.capabilities.fullscreen) return;
      
      if (state === 'maximized' || state === 'fullscreen') {
        win.restoreAnimationOrigin = win.bounds; // Store origin for authentic restore
      }
      executeAndPushCommand(new StateChangeCommand(windowId, win.state, state));
    }
  }
}

export const WindowStore = new Store();
