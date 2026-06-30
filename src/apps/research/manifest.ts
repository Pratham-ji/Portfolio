import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const ResearchManifest: AppManifest = {
  id: 'research',
  name: 'Research',
  icon: 'book-open',
  component: lazy(() => import('./ResearchApp')),
  defaultSize: { width: 700, height: 600 },
  minSize: { width: 500, height: 400 },
  singleton: true,
};
