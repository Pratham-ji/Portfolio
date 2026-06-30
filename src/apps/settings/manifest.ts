import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const SettingsManifest: AppManifest = {
  id: 'settings',
  name: 'Settings',
  icon: 'settings',
  component: lazy(() => import('./SettingsApp')),
  defaultSize: { width: 700, height: 500 },
  minSize: { width: 500, height: 400 },
  singleton: true,
};
