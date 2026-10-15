/**
 * ==========================================================================
 * PRATHAMOS v3.2 — PLATFORM TYPES
 * ==========================================================================
 */

export type PlatformOs = 'macOS' | 'Windows' | 'Linux' | 'Unknown';

export type ModifierKey = '⌘' | 'Ctrl' | 'Unknown';
export type SecondaryModifierKey = '⌥' | 'Alt' | 'Unknown';
export type WindowControlsPosition = 'left' | 'right' | 'Unknown';

export interface PlatformConfig {
  os: PlatformOs;
  modifierKey: ModifierKey;
  secondaryModifier: SecondaryModifierKey;
  windowControlsPosition: WindowControlsPosition;
}
