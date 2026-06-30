import { AppManifest } from '../../core/application-manager/types';
import { lazy } from 'react';

export const ContactManifest: AppManifest = {
  id: 'contact',
  name: 'Contact',
  icon: 'mail',
  iconUrl: '/icons/gmail_icon.png',
  component: lazy(() => import('./ContactApp')),
  defaultSize: { width: 500, height: 400 },
  minSize: { width: 400, height: 350 },
  singleton: true,
};
