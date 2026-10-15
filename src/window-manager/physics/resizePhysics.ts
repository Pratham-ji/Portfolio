import { WindowSession } from '../runtime/WindowSession';
import { WindowStore } from '../runtime/WindowStore';
import { RenderScheduler, RenderPriority } from '../runtime/RenderScheduler';
import { DirtyRegionManager } from '../runtime/DirtyRegionManager';

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export class ResizePhysics {
  static startResize(windowId: string, initialEvent: React.PointerEvent, element: HTMLElement, direction: ResizeDirection) {
    const win = WindowStore.getWindow(windowId);
    if (!win || !win.capabilities.resize || win.state !== 'normal') return;

    const initialBounds = { ...win.bounds };
    const constraints = win.constraints;
    const startX = initialEvent.clientX;
    const startY = initialEvent.clientY;
    
    WindowSession.updateSession(windowId, {
      pointerCaptured: true,
      resizing: true
    });
    
    element.style.willChange = 'width, height, transform';

    let currentBounds = { ...initialBounds };

    const handlePointerMove = (e: PointerEvent) => {
      const session = WindowSession.getSession(windowId);
      if (!session.resizing) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = initialBounds.width;
      let newHeight = initialBounds.height;
      let newX = initialBounds.x;
      let newY = initialBounds.y;

      if (direction.includes('e')) newWidth += deltaX;
      if (direction.includes('s')) newHeight += deltaY;
      if (direction.includes('w')) {
        newWidth -= deltaX;
        newX += deltaX;
      }
      if (direction.includes('n')) {
        newHeight -= deltaY;
        newY += deltaY;
      }

      // Constrain
      if (newWidth < constraints.minWidth) {
        if (direction.includes('w')) newX -= (constraints.minWidth - newWidth);
        newWidth = constraints.minWidth;
      }
      if (newHeight < constraints.minHeight) {
        if (direction.includes('n')) newY -= (constraints.minHeight - newHeight);
        newHeight = constraints.minHeight;
      }
      
      currentBounds = { x: newX, y: newY, width: newWidth, height: newHeight };

      RenderScheduler.schedule(RenderPriority.CRITICAL, () => {
        element.style.width = `${currentBounds.width}px`;
        element.style.height = `${currentBounds.height}px`;
        element.style.transform = `translate3d(${currentBounds.x}px, ${currentBounds.y}px, 0)`;
        
        DirtyRegionManager.markDirty(currentBounds);
      });
    };

    const handlePointerUp = () => {
      WindowSession.recoverSession(windowId, element);
      
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);

      WindowStore.commitWindowResize(windowId, currentBounds);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }
}
