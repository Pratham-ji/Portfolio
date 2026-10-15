/**
 * ==========================================================================
 * PRATHAMOS v3.2 — MATERIAL SPRINGS
 * ==========================================================================
 */

export const MaterialSprings = {
  springGlass: 'spring(1, 90, 14, 0)',        // Heavy, fluid settling
  springMetal: 'cubicBezier(0.16, 1, 0.3, 1)', // Precise, immediate structural snap
  springPolymer: 'spring(1, 70, 10, 0)'        // Tactile, mechanical rebound
} as const;
