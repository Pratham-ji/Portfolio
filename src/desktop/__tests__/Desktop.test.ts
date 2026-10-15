import { describe, it, expect, beforeEach } from 'vitest';
import { WorkspaceStore } from '../runtime/WorkspaceStore';
import { WorkspaceManager } from '../runtime/WorkspaceManager';

describe('Desktop Workspace Engine', () => {
  beforeEach(() => {
    // Reset state if necessary
  });

  it('initializes with 10 virtual workspaces', () => {
    const workspaces = WorkspaceStore.getWorkspaces();
    expect(workspaces.length).toBe(10);
    expect(workspaces[0].id).toBe('workspace_0');
  });

  it('switches active workspace', () => {
    expect(WorkspaceStore.getActiveWorkspaceIndex()).toBe(0);
    
    WorkspaceManager.switchToWorkspaceIndex(3);
    
    expect(WorkspaceStore.getActiveWorkspaceIndex()).toBe(3);
    expect(WorkspaceStore.getActiveWorkspace().id).toBe('workspace_3');
  });
});
