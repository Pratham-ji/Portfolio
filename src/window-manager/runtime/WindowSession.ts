import { Bounds } from './WindowTypes';

export interface WindowSessionData {
  sessionId: string; // Generated per mount
  pointerCaptured: boolean;
  dragging: boolean;
  resizing: boolean;
  snapPreview: boolean;
  currentVelocity: { x: number; y: number };
  lastPointer: { x: number; y: number };
  animationHandle: number | null;
}

class WindowSessionManager {
  private sessions = new Map<string, WindowSessionData>();

  private generateSessionId(): string {
    return `session_${Math.random().toString(36).substr(2, 9)}`;
  }

  getSession(windowId: string): WindowSessionData {
    if (!this.sessions.has(windowId)) {
      this.sessions.set(windowId, {
        sessionId: this.generateSessionId(),
        pointerCaptured: false,
        dragging: false,
        resizing: false,
        snapPreview: false,
        currentVelocity: { x: 0, y: 0 },
        lastPointer: { x: 0, y: 0 },
        animationHandle: null
      });
    }
    return this.sessions.get(windowId)!;
  }

  updateSession(windowId: string, updates: Partial<WindowSessionData>) {
    const session = this.getSession(windowId);
    Object.assign(session, updates);
  }

  clearSession(windowId: string) {
    this.sessions.delete(windowId);
  }
  
  // Failure Recovery (11)
  recoverSession(windowId: string, element?: HTMLElement) {
    const session = this.getSession(windowId);
    if (session.animationHandle) {
      cancelAnimationFrame(session.animationHandle);
    }
    this.updateSession(windowId, {
      pointerCaptured: false,
      dragging: false,
      resizing: false,
      snapPreview: false,
      animationHandle: null
    });
    if (element) {
      element.style.willChange = 'auto'; // Release GPU
    }
  }
}

export const WindowSession = new WindowSessionManager();
