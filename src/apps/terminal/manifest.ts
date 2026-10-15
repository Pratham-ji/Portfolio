import { AppContract } from '../shared/AppContract';
import { lazy } from 'react';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

export const TerminalManifest: AppContract = {
  metadata: {
    id: 'prathamos.terminal',
    name: 'Terminal',
    icon: 'icon-terminal',
    version: '4.2.1',
    description: 'PrathamOS Command Line Interface'
  },
  windowDefaults: {
    preferredSize: { width: 700, height: 450 },
    minSize: { width: 400, height: 250 },
    isResizable: true,
    isMaximizable: true,
    isMinimizable: true
  },
  capabilities: {
    supportsMultipleInstances: true,
    handlesFiles: false
  },
  permissions: ['fs_read', 'fs_write', 'process_execution'],
  searchKeywords: ['terminal', 'cli', 'command', 'shell', 'bash'],
  commandPaletteEntries: [
    { id: 'terminal.new', label: 'New Terminal', action: 'OS_LAUNCH_APP', shortcut: isMac ? 'Cmd+T' : 'Ctrl+T' }
  ],
  RootComponent: lazy(() => import('./TerminalApp').then(m => ({ default: m.TerminalApp })))
};
