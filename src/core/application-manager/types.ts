
import { ComponentType } from 'react';

export interface AppManifest {
  id: string;
  name: string;
  icon: string; // Deprecated or fallback lucide name
  iconUrl?: string; // Path to custom PNG icon
  componentUrl?: string; // Path for lazy loading, if needed
  component?: ComponentType<Record<string, unknown>>; // React component for the app
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  singleton?: boolean;
}

export interface ApplicationState {
  registry: Record<string, AppManifest>;
}

export type ApplicationAction = 
  | { type: 'REGISTER_APP'; payload: AppManifest }
  | { type: 'UNREGISTER_APP'; payload: { id: string } };
