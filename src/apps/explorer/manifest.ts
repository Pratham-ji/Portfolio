import { AppContract } from '../shared/AppContract';
import { lazy } from 'react';

export const ExplorerManifest: AppContract = {
  metadata: {
    id: 'explorer',
    name: 'Explorer',
    icon: 'folder',
    version: '4.1.0',
    description: 'PrathamOS File Explorer'
  },
  windowDefaults: {
    preferredSize: { width: 800, height: 600 },
    minSize: { width: 400, height: 300 },
    isResizable: true,
    isMaximizable: true,
    isMinimizable: true
  },
  capabilities: {
    supportsMultipleInstances: true,
    handlesFiles: true,
    fileExtensions: ['*']
  },
  permissions: ['fs_read', 'fs_write'],
  searchKeywords: ['files', 'folders', 'explorer', 'finder'],
  commandPaletteEntries: [
    { id: 'explorer.open', label: 'Open Selected File', action: 'explorer.open' },
    { id: 'explorer.rename', label: 'Rename File', action: 'explorer.rename' },
    { id: 'explorer.delete', label: 'Delete File', action: 'explorer.delete' },
    { id: 'explorer.newFolder', label: 'New Folder', action: 'explorer.newFolder' },
    { id: 'explorer.search', label: 'Focus Search', shortcut: 'CmdOrCtrl+F', action: 'explorer.search' },
    { id: 'explorer.togglePreview', label: 'Toggle Preview Pane', shortcut: 'CmdOrCtrl+Shift+P', action: 'explorer.togglePreview' },
  ],
  RootComponent: lazy(() => import('./ExplorerApp').then(m => ({ default: m.ExplorerApp })))
};
