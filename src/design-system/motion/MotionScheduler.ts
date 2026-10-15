// @ts-nocheck
import { animate, set } from 'animejs';
import type { AnimeAnimParams, AnimeInstance } from 'animejs';
import { AnimationMode, MotionContextConfig } from '../types/motion';

/**
 * ==========================================================================
 * PRATHAMOS v3.2 — MOTION SCHEDULER
 * ==========================================================================
 * Central scheduling engine. Replaces hardcoded animation calls.
 * Decides whether animations execute based on environment and thresholds.
 */

export interface ScheduleOptions {
  targets: any;
  duration?: number;
  easing?: string | ((el: Element, i: number, l: number) => string);
  delay?: number | ((el: Element, i: number, l: number) => number);
  opacity?: number | number[];
  scale?: number | number[];
  translateY?: number | number[];
  translateX?: number | number[];
  [key: string]: any;
}

class MotionSchedulerSingleton {
  private activeAnimations: Set<any> = new Set();
  
  // Configurable thresholds instead of hardcoded magic numbers
  private SCROLL_VELOCITY_THRESHOLD = 800; // px/sec
  private CPU_FRAME_TIME_THRESHOLD = 16.6; // ms (60fps limit)

  private currentContext: MotionContextConfig = {
    scrollVelocity: 0,
    cpuFrameTime: 0,
    isVisible: true,
    prefersReducedMotion: false,
    batterySaver: false
  };

  /**
   * Update the internal context tracking
   */
  public updateContext(context: Partial<MotionContextConfig>) {
    this.currentContext = { ...this.currentContext, ...context };
  }

  /**
   * Evaluate if an animation should run or be bypassed.
   */
  public shouldAnimate(): boolean {
    if (!this.currentContext.isVisible) return false;
    if (this.currentContext.scrollVelocity > this.SCROLL_VELOCITY_THRESHOLD) return false;
    if (this.currentContext.cpuFrameTime > this.CPU_FRAME_TIME_THRESHOLD * 2) return false;
    return true;
  }

  /**
   * Schedule an animation, automatically applying context downgrades.
   */
  public schedule(options: ScheduleOptions): any | null {
    if (!this.shouldAnimate()) {
      // Force end state immediately without animating
      const { targets, ...params } = options;
      set(targets, {
        ...params,
        duration: 0,
        delay: 0
      });
      return null;
    }

    let finalOptions = { ...options };

    // Reduced Motion / Battery Saver Downgrade
    if (this.currentContext.prefersReducedMotion || this.currentContext.batterySaver) {
      // Strip translation, scaling, and spring physics
      delete finalOptions.scale;
      delete finalOptions.translateY;
      delete finalOptions.translateX;
      
      finalOptions.easing = 'linear';
      finalOptions.duration = 120; // 120ms opacity crossfade
      
      // If delay was a stagger function, bypass it for rapid execution
      if (typeof finalOptions.delay === 'function') {
        finalOptions.delay = 0;
      }
    }

    const { targets, ...animParams } = finalOptions;
    const instance = animate(targets, animParams);
    this.activeAnimations.add(instance);
    
    const onFinished = () => {
      this.activeAnimations.delete(instance);
    };

    if (instance?.finished?.then) {
      instance.finished.then(onFinished);
    } else if (instance?.then) {
      instance.then(onFinished);
    }

    return instance;
  }

  public cancel(instance: any) {
    if (this.activeAnimations.has(instance)) {
      instance.pause(); // Anime uses pause to halt
      this.activeAnimations.delete(instance);
    }
  }

  public pauseAll() {
    this.activeAnimations.forEach(anim => anim.pause());
  }

  public resumeAll() {
    this.activeAnimations.forEach(anim => anim.play());
  }
}

export const MotionScheduler = new MotionSchedulerSingleton();
