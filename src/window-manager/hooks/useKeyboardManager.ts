import { useEffect } from 'react';
import { WindowStore } from '../runtime/WindowStore';
import { SnapPhysics } from '../physics/snapPhysics';
import { useViewport } from '../layout/viewport';
import { Bounds } from '../runtime/WindowTypes';
import { executeAndPushCommand, MoveCommand } from '../runtime/WindowCommands';

export const useKeyboardManager = () => {
  const viewport = useViewport();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Logic for Alt+Space (future menu), Arrows to move/snap
      // We need to identify the currently focused window
      const windows = WindowStore.getAllWindows();
      const activeWindow = windows.find(w => w.focused);
      if (!activeWindow) return;
      
      const { windowId, capabilities, bounds } = activeWindow;

      const STEP = 20;

      if (e.altKey && e.code === 'Space') {
        e.preventDefault();
        // Trigger window context menu logic here in future
      } else if (e.metaKey && e.code === 'ArrowLeft') {
        e.preventDefault();
        if (capabilities.snap) {
          // Mock element passing since we aren't directly ref'd here 
          // (In a real implementation, keyboard commands might bypass MotionScheduler for direct store commit, 
          // or we emit a typed event that the compositor catches to trigger the animation)
          WindowStore.setWindowState(windowId, 'normal');
          WindowStore.commitWindowResize(windowId, {
            x: 0, y: 0, width: viewport.width / 2, height: viewport.height
          });
        }
      } else if (e.metaKey && e.code === 'ArrowRight') {
        e.preventDefault();
        if (capabilities.snap) {
          WindowStore.setWindowState(windowId, 'normal');
          WindowStore.commitWindowResize(windowId, {
            x: viewport.width / 2, y: 0, width: viewport.width / 2, height: viewport.height
          });
        }
      } else if (e.code === 'ArrowLeft') {
        if (capabilities.move) WindowStore.commitWindowMove(windowId, { ...bounds, x: bounds.x - STEP });
      } else if (e.code === 'ArrowRight') {
        if (capabilities.move) WindowStore.commitWindowMove(windowId, { ...bounds, x: bounds.x + STEP });
      } else if (e.code === 'ArrowUp') {
        if (capabilities.move) WindowStore.commitWindowMove(windowId, { ...bounds, y: bounds.y - STEP });
      } else if (e.code === 'ArrowDown') {
        if (capabilities.move) WindowStore.commitWindowMove(windowId, { ...bounds, y: bounds.y + STEP });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewport]);
};
