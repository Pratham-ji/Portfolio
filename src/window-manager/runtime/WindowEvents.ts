import { Bounds, WindowStateStatus } from './WindowTypes';

export enum WindowEventType {
  WINDOW_OPENED = 'WINDOW_OPENED',
  WINDOW_CLOSED = 'WINDOW_CLOSED',
  WINDOW_FOCUSED = 'WINDOW_FOCUSED',
  WINDOW_MOVED = 'WINDOW_MOVED',
  WINDOW_RESIZED = 'WINDOW_RESIZED',
  WINDOW_STATE_CHANGED = 'WINDOW_STATE_CHANGED',
  WORKSPACE_CHANGED = 'WORKSPACE_CHANGED',
  SNAP_PREVIEW_ACTIVATED = 'SNAP_PREVIEW_ACTIVATED',
  SNAP_PREVIEW_CLEARED = 'SNAP_PREVIEW_CLEARED'
}

// Typed Payloads
export interface WindowEventPayloads {
  [WindowEventType.WINDOW_OPENED]: { windowId: string };
  [WindowEventType.WINDOW_CLOSED]: { windowId: string };
  [WindowEventType.WINDOW_FOCUSED]: { windowId: string };
  [WindowEventType.WINDOW_MOVED]: { windowId: string; bounds: Bounds };
  [WindowEventType.WINDOW_RESIZED]: { windowId: string; bounds: Bounds };
  [WindowEventType.WINDOW_STATE_CHANGED]: { windowId: string; state: WindowStateStatus };
  [WindowEventType.WORKSPACE_CHANGED]: { workspaceId: string };
  [WindowEventType.SNAP_PREVIEW_ACTIVATED]: { windowId: string; previewBounds: Bounds };
  [WindowEventType.SNAP_PREVIEW_CLEARED]: { windowId: string };
}

type EventCallback<T extends WindowEventType> = (payload: WindowEventPayloads[T]) => void;

class WindowEventBus {
  private subscribers: Map<WindowEventType, Set<Function>> = new Map();

  subscribe<T extends WindowEventType>(event: T, callback: EventCallback<T>): () => void {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event)!.add(callback);
    return () => this.subscribers.get(event)!.delete(callback);
  }

  emit<T extends WindowEventType>(event: T, payload: WindowEventPayloads[T]) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event)!.forEach(cb => cb(payload));
    }
  }
}

export const WindowEvents = new WindowEventBus();
