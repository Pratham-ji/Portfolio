import { useState, useEffect } from 'react';

export interface PerformanceMetrics {
  fps: number;
  memoryUsageMB?: number;
}

export const usePerformanceMetrics = (isActive: boolean): PerformanceMetrics => {
  const [fps, setFps] = useState(0);
  const [memoryUsageMB, setMemoryUsageMB] = useState<number | undefined>();

  useEffect(() => {
    if (!isActive) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;

        // Extract memory if available (Chrome specific)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const perf = performance as any;
        if (perf.memory && perf.memory.usedJSHeapSize) {
          setMemoryUsageMB(Math.round(perf.memory.usedJSHeapSize / 1024 / 1024));
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  return { fps, memoryUsageMB };
};
