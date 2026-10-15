import { AppContract } from '../shared/AppContract';
import { lazy } from 'react';

export const PaperViewerManifest: AppContract = {
  metadata: {
    id: 'prathamos.paper',
    name: 'Paper',
    icon: 'file-text',
    version: '5.0.0',
    description: 'Material 05 (Paper) Glare-Free Document & Code Viewer'
  },
  windowDefaults: {
    preferredSize: { width: 880, height: 680 },
    minSize: { width: 500, height: 400 },
    isResizable: true,
    isMaximizable: true,
    isMinimizable: true
  },
  capabilities: {
    supportsMultipleInstances: true,
    handlesFiles: true,
    fileExtensions: ['.paper', '.md', '.txt', '.code', '.cpp']
  },
  permissions: ['fs_read'],
  searchKeywords: ['paper', 'viewer', 'doc', 'document', 'resume', 'markdown', 'notes', 'code'],
  commandPaletteEntries: [
    { id: 'paper.copyEmail', label: 'Copy Email Address', action: 'paper.copyEmail' },
    { id: 'paper.print', label: 'Print / Export to PDF', shortcut: 'CmdOrCtrl+P', action: 'paper.print' },
    { id: 'paper.toggleSidebar', label: 'Toggle Document Sidebar', shortcut: 'CmdOrCtrl+B', action: 'paper.toggleSidebar' }
  ],
  RootComponent: lazy(() => import('./PaperViewerApp').then(m => ({ default: m.PaperViewerApp })))
};
