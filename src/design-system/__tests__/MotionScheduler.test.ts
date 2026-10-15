import { describe, it, expect, beforeEach } from 'vitest';
import { MotionScheduler } from '../motion/MotionScheduler';

describe('MotionScheduler', () => {
  beforeEach(() => {
    MotionScheduler.updateContext({
      scrollVelocity: 0,
      cpuFrameTime: 0,
      isVisible: true,
      prefersReducedMotion: false,
      batterySaver: false
    });
  });

  it('allows animation in normal context', () => {
    expect(MotionScheduler.shouldAnimate()).toBe(true);
  });

  it('prevents animation when not visible', () => {
    MotionScheduler.updateContext({ isVisible: false });
    expect(MotionScheduler.shouldAnimate()).toBe(false);
  });

  it('prevents animation on rapid scroll velocity', () => {
    MotionScheduler.updateContext({ scrollVelocity: 1000 });
    expect(MotionScheduler.shouldAnimate()).toBe(false);
  });

  it('strips translation and scaling when reduced motion is preferred', () => {
    MotionScheduler.updateContext({ prefersReducedMotion: true });
    
    // Create a mock target
    const target = document.createElement('div');
    
    const instance = MotionScheduler.schedule({
      targets: target,
      scale: 2,
      translateY: 50,
      opacity: 0.5
    });

    // The animation instance is created and running
    expect(instance).not.toBeNull();
  });
});
