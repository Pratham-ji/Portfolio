import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const ContactManifest: AppManifest = {
  id: 'contact',
  name: 'Contact',
  icon: 'mail',
  component: lazy(() => import('./ContactApp')),
  defaultSize: { width: 500, height: 400 },
  minSize: { width: 400, height: 350 },
  singleton: true,
};
