import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const SkillsManifest: AppManifest = {
  id: 'skills',
  name: 'Skills',
  icon: 'zap',
  component: lazy(() => import('./SkillsApp')),
  defaultSize: { width: 750, height: 550 },
  minSize: { width: 400, height: 400 },
  singleton: true,
};
