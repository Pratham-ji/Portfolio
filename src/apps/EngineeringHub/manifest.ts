import { AppContract } from '../shared/AppContract';
import { lazy } from 'react';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

export interface EngineeringHubAppContract extends AppContract {
  id?: string;
  name?: string;
  icon?: string;
  component?: React.ComponentType<any>;
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  singleton?: boolean;
}

const LazyEngineeringHub = lazy(() => import('./EngineeringHubApp').then(m => ({ default: m.EngineeringHubApp })));

export const EngineeringHubManifest: EngineeringHubAppContract = {
  // Backwards compatibility top-level properties
  id: 'prathamos.engineering',
  name: 'Engineering Hub',
  icon: 'cpu',
  component: LazyEngineeringHub,
  defaultSize: { width: 940, height: 640 },
  minSize: { width: 640, height: 460 },
  singleton: true,

  // AppContract specification
  metadata: {
    id: 'prathamos.engineering',
    name: 'Engineering Hub',
    icon: 'cpu',
    version: '5.0.0',
    description: 'Interactive Systems Architecture Explorer & Algorithmic Living Telemetry Matrix'
  },
  windowDefaults: {
    preferredSize: { width: 940, height: 640 },
    minSize: { width: 640, height: 460 },
    isResizable: true,
    isMaximizable: true,
    isMinimizable: true
  },
  capabilities: {
    supportsMultipleInstances: false,
    handlesFiles: false
  },
  permissions: ['process_execution', 'network'],
  searchKeywords: [
    'engineering',
    'systems',
    'architecture',
    'telemetry',
    'algorithms',
    'leetcode',
    'benchmark',
    'chaiscript',
    'queue',
    'redis',
    'supabase',
    'rag'
  ],
  commandPaletteEntries: [
    {
      id: 'engineering.open',
      label: 'Open Engineering Hub',
      action: 'OS_LAUNCH_APP',
      shortcut: isMac ? 'Cmd+Shift+E' : 'Ctrl+Shift+E'
    },
    {
      id: 'engineering.systems',
      label: 'Open Systems & Architecture',
      action: 'OS_LAUNCH_APP_TAB_ARCH'
    },
    {
      id: 'engineering.telemetry',
      label: 'Open Algorithmic Telemetry',
      action: 'OS_LAUNCH_APP_TAB_TELEMETRY'
    }
  ],
  RootComponent: LazyEngineeringHub
};

export default EngineeringHubManifest;
