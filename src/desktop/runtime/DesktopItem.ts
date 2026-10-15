export type DesktopItemType = 'file' | 'folder' | 'application' | 'shortcut';

export interface DesktopItemCapabilities {
  rename: boolean;
  delete: boolean;
  execute: boolean;
  move: boolean;
}

export interface DesktopItem {
  readonly id: string;
  readonly type: DesktopItemType;
  readonly name: string;
  readonly icon: string; // Refers to a BaseIcon name or URL
  readonly position: { x: number; y: number }; // Absolute grid coordinates
  readonly workspaceId: string;
  readonly capabilities: DesktopItemCapabilities;
  readonly metadata?: Record<string, any>;
}
