import React, { useState } from 'react';
import { DesktopInputRouter } from './runtime/DesktopInputRouter';
import { DesktopSelectionOverlay } from './components/DesktopSelectionOverlay';
import { DesktopGrid } from './components/DesktopGrid';
import { DesktopContextMenu } from './context-menu/DesktopContextMenu';
import { useWorkspace } from './WorkspaceProvider';
import { WindowManager } from '../window-manager/renderer/WindowManager';
import { DebugOverlay } from './DebugOverlay';

export const DesktopCanvas: React.FC = () => {
  const { activeWorkspace } = useWorkspace();
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only handle if clicking directly on the canvas, not on windows or icons
    if (e.target === e.currentTarget) {
      if (e.button === 2) { // Right click
        setContextMenu({ x: e.clientX, y: e.clientY });
        e.preventDefault();
      } else {
        setContextMenu(null);
        DesktopInputRouter.handlePointerDown(e, 'desktop');
      }
    } else {
      setContextMenu(null);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      role="application"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        userSelect: 'none',
        // In reality, this background comes from WallpaperService mapped to activeWorkspace
        backgroundImage: 'url(/assets/wallpapers/default.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onPointerDown={handlePointerDown}
      onContextMenu={handleContextMenu}
    >
      {/* 
        The DesktopGrid handles layout of icons.
        We pass a mocked list of icons for scaffolding. 
      */}
      <DesktopGrid 
        items={[
          { 
            id: 'prathamos.engineering', 
            type: 'application', 
            name: 'Engineering Hub', 
            icon: 'engineering', 
            position: { x: 24, y: 48 }, 
            workspaceId: activeWorkspace.id, 
            capabilities: { move: true, execute: true, delete: false, rename: false } 
          },
          { 
            id: 'prathamos.paper', 
            type: 'application', 
            name: 'Resume & Docs', 
            icon: 'paper', 
            position: { x: 24, y: 160 }, 
            workspaceId: activeWorkspace.id, 
            capabilities: { move: true, execute: true, delete: false, rename: false } 
          },
          { 
            id: 'terminal', 
            type: 'application', 
            name: 'Terminal', 
            icon: 'terminal', 
            position: { x: 24, y: 272 }, 
            workspaceId: activeWorkspace.id, 
            capabilities: { move: true, execute: true, delete: false, rename: false } 
          },
          { 
            id: 'explorer', 
            type: 'application', 
            name: 'Explorer', 
            icon: 'explorer', 
            position: { x: 24, y: 384 }, 
            workspaceId: activeWorkspace.id, 
            capabilities: { move: true, execute: true, delete: false, rename: false } 
          },
          { 
            id: 'settings', 
            type: 'application', 
            name: 'Settings', 
            icon: 'settings', 
            position: { x: 24, y: 496 }, 
            workspaceId: activeWorkspace.id, 
            capabilities: { move: true, execute: true, delete: false, rename: false } 
          },
        ]} 
      />

      {/* Rubber-band selection visualizer */}
      <DesktopSelectionOverlay />

      {/* The WindowManager renders all active windows */}
      <WindowManager />

      {/* Desktop Context Menu */}
      {contextMenu && (
        <DesktopContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          onClose={() => setContextMenu(null)} 
        />
      )}

      {/* Development Overlay */}
      {process.env.NODE_ENV === 'development' && <DebugOverlay />}
    </div>
  );
};
