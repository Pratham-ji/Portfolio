import { WindowCapabilities } from './WindowCapabilities';

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowConstraints {
  minWidth: number;
  minHeight: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
}

export type WindowStateStatus = 
  | "normal"
  | "minimized"
  | "maximized"
  | "fullscreen"
  | "hidden";

export type WindowVisibility = 
  | "VISIBLE"
  | "PARTIALLY_VISIBLE"
  | "OFFSCREEN"
  | "OCCLUDED";

export interface WindowState {
  windowId: string;       // Permanent UUID
  applicationId: string;  // e.g. 'terminal', 'explorer'
  title: string;
  icon: string;
  
  bounds: Bounds;
  previousBounds?: Bounds;
  restoreAnimationOrigin?: Bounds; // For authentic restore animations
  
  state: WindowStateStatus;
  visibility: WindowVisibility;
  workspaceId: string;
  
  focused: boolean;
  layer: number;
  
  capabilities: WindowCapabilities;
  constraints: WindowConstraints;
}

export interface Workspace {
  id: string;
  name: string;
  windowIds: string[];
  wallpaper?: string;
  layout: "floating" | "tiling";
}

export type SnapZone = 
  | "none"
  | "left-half"
  | "right-half"
  | "top-half"
  | "bottom-half"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "maximize";
