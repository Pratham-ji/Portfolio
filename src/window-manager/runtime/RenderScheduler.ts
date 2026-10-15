import { DirtyRegionManager } from './DirtyRegionManager';

export enum RenderPriority {
  CRITICAL = 0, // Drag, Resize
  HIGH = 1,     // Focus, Snap Preview
  NORMAL = 2,   // Open, Close
  LOW = 3,      // Background
  IDLE = 4      // Cleanup
}

type RenderTask = () => void;

class Scheduler {
  private queues: Map<RenderPriority, Set<RenderTask>> = new Map([
    [RenderPriority.CRITICAL, new Set()],
    [RenderPriority.HIGH, new Set()],
    [RenderPriority.NORMAL, new Set()],
    [RenderPriority.LOW, new Set()],
    [RenderPriority.IDLE, new Set()]
  ]);
  
  private isFrameScheduled = false;

  schedule(priority: RenderPriority, task: RenderTask) {
    this.queues.get(priority)!.add(task);
    this.requestFrame();
  }

  private requestFrame() {
    if (this.isFrameScheduled) return;
    this.isFrameScheduled = true;
    
    requestAnimationFrame(() => {
      this.isFrameScheduled = false;
      this.flush();
    });
  }

  private flush() {
    const start = performance.now();
    let processed = 0;

    // Process in priority order
    for (const priority of [
      RenderPriority.CRITICAL, 
      RenderPriority.HIGH, 
      RenderPriority.NORMAL, 
      RenderPriority.LOW
    ]) {
      const queue = this.queues.get(priority)!;
      queue.forEach(task => {
        task();
        processed++;
      });
      queue.clear();
      
      // If we exceed 16.6ms frame budget and are out of critical/high tasks, yield
      if (priority >= RenderPriority.NORMAL && performance.now() - start > 15) {
        this.requestFrame();
        return; 
      }
    }

    // Process IDLE tasks using requestIdleCallback if available
    const idleQueue = this.queues.get(RenderPriority.IDLE)!;
    if (idleQueue.size > 0) {
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(() => {
          idleQueue.forEach(task => task());
          idleQueue.clear();
        });
      } else {
        // Fallback
        setTimeout(() => {
          idleQueue.forEach(task => task());
          idleQueue.clear();
        }, 0);
      }
    }

    DirtyRegionManager.clear();
  }
}

export const RenderScheduler = new Scheduler();
