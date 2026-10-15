import { ResizePhysics, ResizeDirection } from '../physics/resizePhysics';
import { WindowStore } from '../runtime/WindowStore';

export const useWindowResize = (windowId: string, elementRef: React.RefObject<HTMLElement>) => {
  const getResizeHandler = (direction: ResizeDirection) => (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (!elementRef.current) return;
    
    WindowStore.focusWindow(windowId);
    
    e.preventDefault();
    e.stopPropagation();
    
    ResizePhysics.startResize(windowId, e, elementRef.current, direction);
  };

  return { getResizeHandler };
};
