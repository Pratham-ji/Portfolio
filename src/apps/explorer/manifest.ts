import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const ExplorerManifest: AppManifest = {
  id: 'explorer',
  name: 'File Explorer',
  icon: 'folder', // Using lucide icon names broadly
  component: lazy(() => import('./ExplorerApp')),
  defaultSize: { width: 800, height: 600 },
  minSize: { width: 400, height: 300 },
  singleton: false, // You can open multiple explorers
};
