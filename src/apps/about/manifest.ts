import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const AboutManifest: AppManifest = {
  id: 'about',
  name: 'About',
  icon: 'info',
  component: lazy(() => import('./AboutApp')),
  defaultSize: { width: 600, height: 500 },
  minSize: { width: 400, height: 400 },
  singleton: true,
};
