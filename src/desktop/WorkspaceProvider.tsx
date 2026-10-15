// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WorkspaceStore, DesktopWorkspace } from './runtime/WorkspaceStore';

interface WorkspaceContextValue {
  workspaces: DesktopWorkspace[];
  activeIndex: number;
  activeWorkspace: DesktopWorkspace;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WorkspaceContextValue>({
    workspaces: WorkspaceStore.getWorkspaces(),
    activeIndex: WorkspaceStore.getActiveWorkspaceIndex(),
    activeWorkspace: WorkspaceStore.getActiveWorkspace()
  });

  useEffect(() => {
    const unsubscribe = WorkspaceStore.subscribe(() => {
      setState({
        workspaces: WorkspaceStore.getWorkspaces(),
        activeIndex: WorkspaceStore.getActiveWorkspaceIndex(),
        activeWorkspace: WorkspaceStore.getActiveWorkspace()
      });
    });
    return unsubscribe;
  }, []);

  return (
    <WorkspaceContext.Provider value={state}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return ctx;
};
