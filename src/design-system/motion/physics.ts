// @ts-nocheck
/**
 * ==========================================================================
 * PRATHAMOS v3.2 — PHYSICS MASTER EXPORTER
 * ==========================================================================
 */
// Physics constants
import { set, createTimeline, stagger } from 'animejs';
import { Durations } from './durations';
import { Easing } from './easing';
import { MaterialSprings } from './springs';

export * from './durations';
export * from './easing';
export * from './springs';

/**
 * SINGLE-ANIMATION ORCHESTRATION WRAPPER
 * 
 * Enforces the PrathamOS Motion Constitution:
 * - Parent scales and fades.
 * - Children only translate and fade, staggered.
 * 
 * @param windowRef The parent window container element
 * @param contentChildren Array of child HTMLElements inside the window content
 */
export function orchestrateWindowOpen(windowRef: HTMLElement, contentChildren: HTMLElement[]): void {
  // Reset initial states to prevent flickering before animation begins
  set(windowRef, {
    scale: 0.92,
    opacity: 0
  });
  
  if (contentChildren.length > 0) {
    set(contentChildren, {
      translateY: 12,
      opacity: 0
    });
  }

  // Timeline ensures synchronized execution
  const tl = createTimeline({
    autoplay: true
  });

  // Parent Window Animation (springGlass physics)
  tl.add({
    targets: windowRef,
    scale: [0.92, 1],
    opacity: [0, 1],
    easing: MaterialSprings.springGlass
  }, 0);

  // Child Content Orchestration
  // Strict translation and opacity only. No scaling of children.
  if (contentChildren.length > 0) {
    tl.add({
      targets: contentChildren,
      translateY: [12, 0],
      opacity: [0, 1],
      duration: Durations.MEDIUM,
      easing: Easing.easeOutQuad, // Smooth fade in for children
      delay: stagger(30)
    }, 50); // Start 50ms after the window begins opening for fluid sequence
  }
}
