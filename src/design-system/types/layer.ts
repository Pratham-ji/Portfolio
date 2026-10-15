/**
 * ==========================================================================
 * PRATHAMOS v3.2 — LAYER TYPES
 * ==========================================================================
 */

export enum LayerEnum {
  Desktop = 0,
  DesktopIcons = 10,
  // Windows start dynamically from LayerEnum.WindowBase
  WindowBase = 100,
  Dock = 1000,
  Spotlight = 2000,
  ContextMenu = 3000,
  Modal = 9000,
  Boot = 9999
}

export type LayerId = string;

export interface LayerRegistration {
  id: LayerId;
  zIndex: number;
}
