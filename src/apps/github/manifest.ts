import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const GithubManifest: AppManifest = {
  id: 'github',
  name: 'GitHub',
  icon: 'github',
  iconUrl: '/icons/github_icon.png',
  component: lazy(() => import('./GithubApp')),
  defaultSize: { width: 850, height: 600 },
  minSize: { width: 500, height: 400 },
  singleton: true,
};
