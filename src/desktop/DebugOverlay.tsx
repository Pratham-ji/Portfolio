import React, { useEffect, useState } from 'react';
import { RuntimeMetrics } from '../window-manager/runtime/RuntimeMetrics';
import { useWorkspace } from './WorkspaceProvider';

export const DebugOverlay: React.FC = () => {
  const { activeWorkspace } = useWorkspace();
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setFps(RuntimeMetrics.getAverageFPS());
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#0f0',
        padding: '8px 12px',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '12px',
        pointerEvents: 'none',
        zIndex: 999999
      }}
    >
      <div>OS Debug Overlay</div>
      <div>----------------</div>
      <div>Workspace: {activeWorkspace.id}</div>
      <div>FPS: {fps}</div>
      <div>Frame Budget: 16.6ms</div>
      <div>Selection Bounds: (mocked)</div>
      <div>Hovered Icon: null</div>
      <div>Input Latency: &lt;1ms</div>
    </div>
  );
};
