import { describe, it, expect } from 'vitest';
import { fileSystemReducer } from './reducer';
import { defaultFileSystem } from './defaultTree';

describe('FileSystem Reducer', () => {
  it('should create a node', () => {
    const initialState = { nodes: defaultFileSystem };
    const action = { 
      type: 'CREATE_NODE' as const, 
      payload: { 
        id: 'test_file_1',
        name: 'test.txt',
        type: 'file' as const,
        parentId: 'root',
        content: 'hello',
        size: 5,
        createdAt: 1,
        updatedAt: 1
      } 
    };
    
    const nextState = fileSystemReducer(initialState, action);
    expect(nextState.nodes['test_file_1']).toBeDefined();
    expect(nextState.nodes['test_file_1']!.type).toBe('file');
  });

  it('should delete a node', () => {
    const state = {
      nodes: {
        'test_file_1': { id: 'test_file_1', name: 'test', type: 'file' as const, parentId: 'root', createdAt: 1, updatedAt: 1 }
      }
    };
    const action = { type: 'DELETE_NODE' as const, payload: { id: 'test_file_1' } };
    const nextState = fileSystemReducer(state, action);
    expect(nextState.nodes['test_file_1']).toBeUndefined();
  });
});
