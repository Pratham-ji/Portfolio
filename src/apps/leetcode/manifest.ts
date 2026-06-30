import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const LeetcodeManifest: AppManifest = {
  id: 'leetcode',
  name: 'LeetCode',
  icon: 'code',
  iconUrl: '/icons/leetcode_icon.png',
  component: lazy(() => import('./LeetcodeApp')),
  defaultSize: { width: 700, height: 500 },
  minSize: { width: 500, height: 400 },
  singleton: true,
};
