import { WindowSession } from '../runtime/WindowSession';
import { WindowStore } from '../runtime/WindowStore';
import { RenderScheduler, RenderPriority } from '../runtime/RenderScheduler';
import { DirtyRegionManager } from '../runtime/DirtyRegionManager';

export class DragPhysics {
  static startDrag(windowId: string, initialEvent: React.PointerEvent, element: HTMLElement) {
    const win = WindowStore.getWindow(windowId);
    if (!win || !win.capabilities.move || win.state !== 'normal') return;

    const initialBounds = { ...win.bounds };
    const startX = initialEvent.clientX;
    const startY = initialEvent.clientY;
    
    WindowSession.updateSession(windowId, {
      pointerCaptured: true,
      dragging: true,
      lastPointer: { x: startX, y: startY }
    });
    
    // GPU Promotion
    element.style.willChange = 'transform, opacity';

    let currentX = initialBounds.x;
    let currentY = initialBounds.y;

    const handlePointerMove = (e: PointerEvent) => {
      const session = WindowSession.getSession(windowId);
      if (!session.dragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      currentX = initialBounds.x + deltaX;
      currentY = initialBounds.y + deltaY;

      if (currentY < 0) currentY = 0; // Collision enforcement for top bar

      WindowSession.updateSession(windowId, {
        lastPointer: { x: e.clientX, y: e.clientY },
        currentVelocity: { x: e.movementX, y: e.movementY }
      });

      // Schedule render via RenderScheduler instead of raw rAF
      RenderScheduler.schedule(RenderPriority.CRITICAL, () => {
        // Direct DOM mutation for 60FPS
        element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        
        // Mark dirty region for compositor
        DirtyRegionManager.markDirty({
          x: currentX,
          y: currentY,
          width: initialBounds.width,
          height: initialBounds.height
        });
      });
    };

    const handlePointerUp = () => {
      WindowSession.recoverSession(windowId, element);
      
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);

      // Commit geometry to persistent store
      WindowStore.commitWindowMove(windowId, {
        ...initialBounds,
        x: currentX,
        y: currentY
      });
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }
}
