import { FileSystemState, FileSystemAction, FileSystemNode } from './types';

/**
 * FileSystem reducer handling all state mutations immutably.
 */
export const fileSystemReducer = (state: FileSystemState, action: FileSystemAction): FileSystemState => {
  switch (action.type) {
    case 'CREATE_NODE':
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [action.payload.id]: action.payload,
        },
      };
      
    case 'DELETE_NODE': {
      const { [action.payload.id]: _deleted, ...remainingNodes } = state.nodes;
      // Also delete children (shallow, ideally needs recursive deletion if directory)
      const cleanedNodes = Object.fromEntries(
        Object.entries(remainingNodes).filter(([, node]) => node.parentId !== action.payload.id)
      );
      return { ...state, nodes: cleanedNodes };
    }
    
    case 'UPDATE_NODE':
      if (!state.nodes[action.payload.id]) return state;
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [action.payload.id]: {
            ...state.nodes[action.payload.id],
            ...action.payload.updates,
            id: action.payload.id,
            updatedAt: Date.now(),
          } as FileSystemNode,
        },
      };
      
    default:
      return state;
  }
};
