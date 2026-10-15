export interface DesktopWorkspace {
  id: string;
  name: string;
  displayId: string; // Preps for multi-monitor
  wallpaperId?: string;
}

class Store {
  private workspaces: DesktopWorkspace[] = [];
  private activeWorkspaceIndex: number = 0;
  private subscribers: Set<() => void> = new Set();
  
  constructor() {
    // Generate 10 virtual workspaces by default
    for (let i = 0; i < 10; i++) {
      this.workspaces.push({
        id: `workspace_${i}`,
        name: `Desktop ${i + 1}`,
        displayId: 'display_0' // Default primary display
      });
    }
  }

  subscribe(callback: () => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach(cb => cb());
  }

  getWorkspaces(): DesktopWorkspace[] {
    return this.workspaces;
  }

  getActiveWorkspaceIndex(): number {
    return this.activeWorkspaceIndex;
  }

  getActiveWorkspace(): DesktopWorkspace {
    return this.workspaces[this.activeWorkspaceIndex];
  }

  setActiveWorkspaceIndex(index: number) {
    if (index >= 0 && index < this.workspaces.length && index !== this.activeWorkspaceIndex) {
      this.activeWorkspaceIndex = index;
      this.notify();
    }
  }
}

export const WorkspaceStore = new Store();
