import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const ResumeManifest: AppManifest = {
  id: 'resume',
  name: 'Resume',
  icon: 'file-text',
  component: lazy(() => import('./ResumeApp')),
  defaultSize: { width: 800, height: 700 },
  minSize: { width: 500, height: 500 },
  singleton: true,
};
