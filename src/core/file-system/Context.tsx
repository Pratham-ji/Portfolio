import { createContext, Dispatch } from 'react';
import { FileSystemState, FileSystemAction, FileSystemNode } from './types';

export interface FileSystemContextValue {
  state: FileSystemState;
  dispatch: Dispatch<FileSystemAction>;
  getNode: (id: string) => FileSystemNode | undefined;
  getChildren: (parentId: string) => FileSystemNode[];
  getPath: (id: string) => string;
}

export const FileSystemContext = createContext<FileSystemContextValue | undefined>(undefined);
