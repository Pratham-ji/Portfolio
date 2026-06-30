import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const ExperienceManifest: AppManifest = {
  id: 'experience',
  name: 'Experience',
  icon: 'briefcase',
  component: lazy(() => import('./ExperienceApp')),
  defaultSize: { width: 700, height: 600 },
  minSize: { width: 450, height: 400 },
  singleton: true,
};
