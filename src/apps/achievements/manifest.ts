import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const AchievementsManifest: AppManifest = {
  id: 'achievements',
  name: 'Achievements',
  icon: 'award',
  component: lazy(() => import('./AchievementsApp')),
  defaultSize: { width: 650, height: 500 },
  minSize: { width: 400, height: 400 },
  singleton: true,
};
