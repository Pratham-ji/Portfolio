export interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  parentId: string | null;
  content?: string;
  appId?: string;
  icon?: string;
  createdAt: number;
  updatedAt: number;
}

export interface FileSystemState {
  nodes: Record<string, FileSystemNode>;
}

export type FileSystemAction =
  | { type: 'CREATE_NODE'; payload: FileSystemNode }
  | { type: 'DELETE_NODE'; payload: { id: string } }
  | { type: 'UPDATE_NODE'; payload: { id: string; updates: Partial<FileSystemNode> } };
