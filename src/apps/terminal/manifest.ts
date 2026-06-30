import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const TerminalManifest: AppManifest = {
  id: 'terminal',
  name: 'Terminal',
  icon: 'terminal', // You might map this to a Lucide icon in the registry later
  component: lazy(() => import('./TerminalApp')),
  defaultSize: { width: 800, height: 500 },
  minSize: { width: 400, height: 300 },
  singleton: false, // Allow multiple instances
};
