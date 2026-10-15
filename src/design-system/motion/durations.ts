/**
 * ==========================================================================
 * PRATHAMOS v3.2 — MOTION DURATIONS
 * ==========================================================================
 */

export const Durations = {
  MICRO: 100,  // Hovers, checkboxes, focus rings
  QUICK: 180,  // Button clicks, context menus
  MEDIUM: 280, // Panel collapses, toasts
  LARGE: 450,  // Window dock minimization/maximization
  HERO: 700    // OS boot sequence, workspace reveal
} as const;

export type DurationKey = keyof typeof Durations;
