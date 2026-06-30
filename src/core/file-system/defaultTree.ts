export interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  parentId: string | null;
  content?: string; // For text files
  appId?: string; // If it opens a specific app (like resume.pdf opens PDF Viewer or triggers download)
  icon?: string;
  createdAt: number;
  updatedAt: number;
}

export const defaultFileSystem: Record<string, FileSystemNode> = {
  'root': { id: 'root', name: 'C:', type: 'directory', parentId: null, createdAt: Date.now(), updatedAt: Date.now() },
  'users': { id: 'users', name: 'Users', type: 'directory', parentId: 'root', createdAt: Date.now(), updatedAt: Date.now() },
  'pratham': { id: 'pratham', name: 'Pratham', type: 'directory', parentId: 'users', createdAt: Date.now(), updatedAt: Date.now() },
  'desktop': { id: 'desktop', name: 'Desktop', type: 'directory', parentId: 'pratham', createdAt: Date.now(), updatedAt: Date.now() },
  'documents': { id: 'documents', name: 'Documents', type: 'directory', parentId: 'pratham', createdAt: Date.now(), updatedAt: Date.now() },
  'projects': { id: 'projects', name: 'Projects', type: 'directory', parentId: 'pratham', createdAt: Date.now(), updatedAt: Date.now() },
  'resume_pdf': { 
    id: 'resume_pdf', 
    name: 'Resume.pdf', 
    type: 'file', 
    parentId: 'documents', 
    appId: 'resume',
    icon: 'FileText',
    createdAt: Date.now(), 
    updatedAt: Date.now() 
  },
  'readme_md': {
    id: 'readme_md',
    name: 'README.md',
    type: 'file',
    parentId: 'desktop',
    appId: 'terminal',
    content: '# Welcome to PrathamOS\\nType `help` in terminal for commands.',
    icon: 'FileCode',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
};
