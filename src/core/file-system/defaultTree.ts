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
  },
  'terminal_app': { id: 'terminal_app', name: 'Terminal', type: 'file', parentId: 'desktop', appId: 'terminal', icon: 'Terminal', createdAt: Date.now(), updatedAt: Date.now() },
  'projects_app': { id: 'projects_app', name: 'Projects', type: 'file', parentId: 'desktop', appId: 'projects', icon: 'Folder', createdAt: Date.now(), updatedAt: Date.now() },
  'github_app': { id: 'github_app', name: 'GitHub', type: 'file', parentId: 'desktop', appId: 'github', icon: 'Github', createdAt: Date.now(), updatedAt: Date.now() },
  'leetcode_app': { id: 'leetcode_app', name: 'LeetCode', type: 'file', parentId: 'desktop', appId: 'leetcode', icon: 'Code', createdAt: Date.now(), updatedAt: Date.now() },
  'skills_app': { id: 'skills_app', name: 'Skills', type: 'file', parentId: 'desktop', appId: 'skills', icon: 'Cpu', createdAt: Date.now(), updatedAt: Date.now() },
  'experience_app': { id: 'experience_app', name: 'Experience', type: 'file', parentId: 'desktop', appId: 'experience', icon: 'Briefcase', createdAt: Date.now(), updatedAt: Date.now() },
  'resume_app': { id: 'resume_app', name: 'Resume', type: 'file', parentId: 'desktop', appId: 'resume', icon: 'FileText', createdAt: Date.now(), updatedAt: Date.now() },
  'contact_app': { id: 'contact_app', name: 'Contact', type: 'file', parentId: 'desktop', appId: 'contact', icon: 'Mail', createdAt: Date.now(), updatedAt: Date.now() },
  'about_app': { id: 'about_app', name: 'About', type: 'file', parentId: 'desktop', appId: 'about', icon: 'User', createdAt: Date.now(), updatedAt: Date.now() }
};
