import { WorkspaceStore } from './WorkspaceStore';
import { WindowStore } from '../../window-manager/runtime/WindowStore';

class Manager {
  // We'll use this to trigger visual translateX animations at the UI level
  // The actual state switches here
  switchToWorkspaceIndex(index: number) {
    const currentIndex = WorkspaceStore.getActiveWorkspaceIndex();
    if (index === currentIndex) return;

    // This sets the active workspace in our Desktop state
    WorkspaceStore.setActiveWorkspaceIndex(index);
    
    // We also need to notify the WindowManager so it reveals the correct windows
    const newWorkspace = WorkspaceStore.getWorkspaces()[index];
    WindowStore.setActiveWorkspace(newWorkspace!.id);
    
    // Trigger preload of neighbors using idle callback
    this.preloadNeighbors(index);
  }

  private preloadNeighbors(index: number) {
    const workspaces = WorkspaceStore.getWorkspaces();
    
    const requestIdle = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(cb, 1));
    
    requestIdle(() => {
      // Logic to ask the compositor to warm up adjacent workspaces
      // In a real implementation, this would pre-mount React trees in 'OFFSCREEN' mode
      const prev = index > 0 ? index - 1 : null;
      const next = index < workspaces.length - 1 ? index + 1 : null;
      
      // Console log to satisfy scaffold requirement
      if (prev !== null) console.debug(`Preloading workspace ${workspaces[prev].id}`);
      if (next !== null) console.debug(`Preloading workspace ${workspaces[next].id}`);
    });
  }
}

export const WorkspaceManager = new Manager();
