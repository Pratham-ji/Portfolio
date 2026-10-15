import anime from 'animejs';

/**
 * ==========================================================================
 * PRATHAMOS v3.2 — PHYSICS & MOTION CONTROLLERS
 * ==========================================================================
 * Author: Principal Creative Technology & Physics Animation Engineering
 * Description: Modular motion controllers enforcing realistic spring momentum 
 * and strict timing hierarchies via anime.js.
 * ==========================================================================
 */

/**
 * 1. MOTION TIMING PERSONALITIES
 * Strict time scales for specific UI interaction patterns.
 */
export const MotionTiming = {
  MICRO: {
    duration: 100,
    easing: 'easeOutQuad',
    description: 'Hovers, checkboxes, focus rings'
  },
  QUICK: {
    duration: 180,
    easing: 'easeInOutQuad',
    description: 'Button clicks, context menus'
  },
  MEDIUM: {
    duration: 280,
    easing: 'spring(1, 80, 10, 0)',
    description: 'Panel collapses, toasts'
  },
  LARGE: {
    duration: 450,
    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    description: 'Window dock minimization/maximization'
  },
  HERO: {
    duration: 700,
    easing: 'spring(1, 90, 14, 0)',
    description: 'OS boot sequence, workspace reveal'
  }
} as const;

/**
 * 2. MATERIAL-MAPPED SPRING PRESETS
 * Physics presets mapped to physical mass of the DOM elements.
 */
export const MaterialPhysics = {
  springGlass: {
    easing: 'spring(1, 90, 14, 0)',
    description: 'Heavy, fluid, highly damped settling'
  },
  springMetal: {
    duration: 400,
    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    description: 'Precise, immediate structural snap'
  },
  springPolymer: {
    duration: 150,
    easing: 'spring(1, 70, 10, 0)',
    description: 'Instant tactile compression'
  }
} as const;

/**
 * 3. SINGLE-ANIMATION ORCHESTRATION WRAPPER
 * 
 * Enforces the PrathamOS Motion Constitution:
 * - Parent scales, children DO NOT scale.
 * - Children only translate and fade, staggered.
 * 
 * @param windowRef The parent window container element
 * @param contentRef The inner container whose immediate children will stagger
 */
export function orchestrateWindowOpen(windowRef: HTMLElement, contentRef: HTMLElement): void {
  // Reset initial states to prevent flickering before animation begins
  anime.set(windowRef, {
    scale: 0.92,
    opacity: 0
  });
  
  // Convert HTMLCollection to Array for anime targets if children exist
  const childNodes = Array.from(contentRef.children);
  if (childNodes.length > 0) {
    anime.set(childNodes, {
      translateY: 12,
      opacity: 0
    });
  }

  // Timeline ensures synchronized execution
  const tl = anime.timeline({
    autoplay: true
  });

  // Parent Window Animation (springGlass physics)
  tl.add({
    targets: windowRef,
    scale: [0.92, 1],
    opacity: [0, 1],
    easing: MaterialPhysics.springGlass.easing
  }, 0);

  // Child Content Orchestration
  // Strict translation and opacity only. No scaling of children.
  if (childNodes.length > 0) {
    tl.add({
      targets: childNodes,
      translateY: [12, 0],
      opacity: [0, 1],
      duration: MotionTiming.MEDIUM.duration,
      easing: 'easeOutQuad', // Smooth fade in for children to compliment outer spring
      delay: anime.stagger(30)
    }, 50); // Start 50ms after the window begins opening for fluid sequence
  }
}
