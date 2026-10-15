import { DragPhysics } from '../physics/dragPhysics';
import { WindowStore } from '../runtime/WindowStore';
import { WindowSession } from '../runtime/WindowSession';

export const useWindowDrag = (windowId: string, elementRef: React.RefObject<HTMLElement>) => {
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (!elementRef.current) return;
    
    WindowStore.focusWindow(windowId);
    
    e.preventDefault();
    e.stopPropagation();
    
    DragPhysics.startDrag(windowId, e, elementRef.current);
  };

  return { onPointerDown };
};
