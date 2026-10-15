import React, { useEffect, useState } from 'react';
import { RuntimeMetrics } from '../runtime/RuntimeMetrics';
import { DirtyRegionManager } from '../runtime/DirtyRegionManager';
import { Bounds } from '../runtime/WindowTypes';
import { RenderScheduler } from '../runtime/RenderScheduler';

export const DevToolsOverlay: React.FC = () => {
  const [fps, setFps] = useState(60);
  const [worst, setWorst] = useState(16.6);
  const [dropped, setDropped] = useState(0);
  const [dirtyRegions, setDirtyRegions] = useState<Bounds[]>([]);

  useEffect(() => {
    // Poll metrics every 500ms
    const interval = setInterval(() => {
      setFps(RuntimeMetrics.getAverageFPS());
      setWorst(RuntimeMetrics.getWorstFrame());
      setDropped(RuntimeMetrics.droppedFrames);
      setDirtyRegions([...DirtyRegionManager.getDirtyRegions()]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 999999 }}>
      {/* Telemetry Panel */}
      <div style={{ 
        position: 'absolute', top: 10, right: 10, 
        background: 'rgba(0,0,0,0.8)', color: '#0f0', 
        padding: 10, fontFamily: 'monospace', fontSize: 12,
        borderRadius: 4
      }}>
        <div>FPS: {fps}</div>
        <div>Worst Frame: {worst.toFixed(1)}ms</div>
        <div>Dropped: {dropped}</div>
      </div>

      {/* Dirty Regions Visualization */}
      {dirtyRegions.map((region, i) => (
        <div 
          key={i}
          style={{
            position: 'absolute',
            border: '1px solid red',
            backgroundColor: 'rgba(255,0,0,0.1)',
            left: region.x,
            top: region.y,
            width: region.width,
            height: region.height
          }}
        />
      ))}
    </div>
  );
};
