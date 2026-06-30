import { useReducer, ReactNode, useMemo, useCallback } from 'react';
import { FileSystemContext, FileSystemContextValue } from './Context';
import { fileSystemReducer } from './reducer';
import { defaultFileSystem } from './defaultTree';
import { FileSystemState, FileSystemNode } from './types';

/**
 * Provider for the virtual OS FileSystem.
 * @param children - React children components
 */
export const FileSystemProvider = ({ children }: { children: ReactNode }) => {
  const initialState: FileSystemState = { nodes: defaultFileSystem };
  const [state, dispatch] = useReducer(fileSystemReducer, initialState);

  const getNode = useCallback((id: string): FileSystemNode | undefined => {
    return state.nodes[id];
  }, [state.nodes]);

  const getChildren = useCallback((parentId: string): FileSystemNode[] => {
    return Object.values(state.nodes).filter(node => node.parentId === parentId);
  }, [state.nodes]);

  const getPath = useCallback((id: string): string => {
    const node = state.nodes[id];
    if (!node) return '';
    if (node.parentId === null) return node.name;
    // We cannot recurse easily inside useCallback if we don't have a stable reference to it,
    // so we define a helper function inside.
    const recursePath = (nodeId: string): string => {
      const n = state.nodes[nodeId];
      if (!n) return '';
      if (n.parentId === null) return n.name;
      return `${recursePath(n.parentId)}\\${n.name}`;
    };
    return recursePath(id);
  }, [state.nodes]);

  const value: FileSystemContextValue = useMemo(() => ({
    state,
    dispatch,
    getNode,
    getChildren,
    getPath
  }), [state, getNode, getChildren, getPath]);

  return (
    <FileSystemContext.Provider value={value}>
      {children}
    </FileSystemContext.Provider>
  );
};
