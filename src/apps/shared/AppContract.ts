import React from 'react';

export type AppPermission = 'fs_read' | 'fs_write' | 'network' | 'system_settings' | 'process_execution';

export interface AppDimensions {
  width: number;
  height: number;
}

export interface AppWindowDefaults {
  preferredSize: AppDimensions;
  minSize: AppDimensions;
  isResizable: boolean;
  isMaximizable: boolean;
  isMinimizable: boolean;
}

export interface AppCommandPaletteEntry {
  id: string;
  label: string;
  shortcut?: string;
  action: string;
}

export interface AppCapabilities {
  supportsMultipleInstances: boolean;
  handlesFiles: boolean;
  fileExtensions?: string[];
}

export interface AppMetadata {
  id: string;
  name: string;
  icon: string; // URL or identifier for the design system icon
  version: string;
  description: string;
}

export interface AppContract {
  metadata: AppMetadata;
  windowDefaults: AppWindowDefaults;
  capabilities: AppCapabilities;
  permissions: AppPermission[];
  searchKeywords: string[];
  commandPaletteEntries: AppCommandPaletteEntry[];
  
  // The root component to mount when launched
  RootComponent: React.ComponentType<any>;
}
