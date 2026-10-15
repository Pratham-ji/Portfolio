export interface FileMetadata {
  size?: number;
  lastModified?: Date;
  created?: Date;
  mimeType?: string;
}

export interface FilePermissions {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface FileNode {
  id: string;
  name: string;
  isDirectory: boolean;
  parentId: string | null;
  childrenIds?: string[];
  metadata?: FileMetadata;
  permissions?: FilePermissions;
  thumbnail?: string;
  tags?: string[];
  content?: string;
}
