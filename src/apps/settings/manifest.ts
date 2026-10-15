import { AppContract } from '../shared/AppContract';
import { lazy } from 'react';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

export interface SettingsAppContract extends AppContract {
  id?: string;
  name?: string;
}

export const SettingsManifest: SettingsAppContract = {
  id: 'settings',
  name: 'Settings',
  metadata: {
    id: 'prathamos.settings',
    name: 'Settings',
    icon: 'icon-settings',
    version: '4.3.0',
    description: 'PrathamOS System Preferences'
  },
  windowDefaults: {
    preferredSize: { width: 820, height: 560 },
    minSize: { width: 600, height: 400 },
    isResizable: true,
    isMaximizable: true,
    isMinimizable: true
  },
  capabilities: {
    supportsMultipleInstances: false,
    handlesFiles: false
  },
  permissions: ['system_settings'],
  searchKeywords: ['settings', 'preferences', 'theme', 'wallpaper', 'accessibility'],
  commandPaletteEntries: [
    {
      id: 'settings.open',
      label: 'Open Settings',
      action: 'OS_LAUNCH_APP',
      shortcut: isMac ? 'Cmd+,' : 'Ctrl+,'
    }
  ],
  RootComponent: lazy(() => import('./SettingsApp').then((m) => ({ default: m.SettingsApp })))
};

export default SettingsManifest;
