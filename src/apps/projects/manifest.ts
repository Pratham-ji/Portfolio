import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const ProjectsManifest: AppManifest = {
  id: 'projects',
  name: 'Projects',
  icon: 'code', 
  component: lazy(() => import('./ProjectsApp')),
  defaultSize: { width: 900, height: 600 },
  minSize: { width: 600, height: 400 },
  singleton: true, 
};
