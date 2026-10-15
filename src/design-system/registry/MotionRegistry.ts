import { MaterialSprings, Durations } from '../motion/physics';

/**
 * ==========================================================================
 * PRATHAMOS v3.2 — MOTION REGISTRY
 * ==========================================================================
 * Centralizes animation identities to existing physics presets.
 */

export type MotionIdentity = 
  | 'window.open'
  | 'window.close'
  | 'dock.hover'
  | 'button.press'
  | 'modal.open'
  | 'toast.enter'
  | 'context.open';

export interface MotionConfig {
  easing: string;
  duration?: number;
}

class MotionRegistrySingleton {
  private registry: Record<MotionIdentity, MotionConfig> = {
    'window.open': { easing: MaterialSprings.springGlass },
    'window.close': { easing: MaterialSprings.springGlass }, // Will be reverse animated
    'dock.hover': { easing: MaterialSprings.springPolymer, duration: Durations.MICRO },
    'button.press': { easing: MaterialSprings.springPolymer, duration: 150 },
    'modal.open': { easing: MaterialSprings.springGlass },
    'toast.enter': { easing: MaterialSprings.springPolymer, duration: Durations.MEDIUM },
    'context.open': { easing: 'easeOutQuad', duration: Durations.QUICK }
  };

  /**
   * Retrieve the physics preset for a specific motion identity.
   */
  public get(identity: MotionIdentity): MotionConfig {
    return this.registry[identity];
  }
}

export const MotionRegistry = new MotionRegistrySingleton();
