/**
 * ==========================================================================
 * PRATHAMOS v3.2 — MOTION TYPES
 * ==========================================================================
 */

export type AnimationMode = 'Idle' | 'Interactive' | 'RapidNavigation' | 'ReducedMotion';

export interface MotionContextConfig {
  scrollVelocity: number;
  cpuFrameTime: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  batterySaver: boolean;
}
