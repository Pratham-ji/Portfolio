import { useEffect, useRef } from 'react';

// We implement pointer-based drag & drop using LayerManager ghosting
// instead of raw HTML5 drag & drop, as requested by the Engineering Council.

export function useExplorerDrag() {
  const dragState = useRef<{
    isDragging: boolean;
    startPos: { x: number, y: number };
    element: HTMLElement | null;
    ghost: HTMLElement | null;
  }>({
    isDragging: false,
    startPos: { x: 0, y: 0 },
    element: null,
    ghost: null
  });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragState.current.isDragging && dragState.current.element) {
        // Threshold check to start dragging
        const dx = e.clientX - dragState.current.startPos.x;
        const dy = e.clientY - dragState.current.startPos.y;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          dragState.current.isDragging = true;
          
          // Create ghost layer element
          const ghost = document.createElement('div');
          ghost.style.position = 'fixed';
          ghost.style.pointerEvents = 'none';
          ghost.style.zIndex = '99999';
          ghost.style.opacity = '0.8';
          ghost.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          
          const clone = dragState.current.element.cloneNode(true) as HTMLElement;
          clone.style.margin = '0';
          clone.style.width = dragState.current.element.offsetWidth + 'px';
          ghost.appendChild(clone);
          
          document.body.appendChild(ghost);
          dragState.current.ghost = ghost;
        }
      }

      if (dragState.current.isDragging && dragState.current.ghost) {
        requestAnimationFrame(() => {
          if (dragState.current.ghost) {
            dragState.current.ghost.style.transform = `translate3d(${e.clientX + 10}px, ${e.clientY + 10}px, 0)`;
          }
        });
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (dragState.current.ghost) {
        document.body.removeChild(dragState.current.ghost);
        dragState.current.ghost = null;
      }
      dragState.current.isDragging = false;
      dragState.current.element = null;
      
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    // We expose a start handler that can be bound to items
    const handlePointerDown = (e: PointerEvent, element: HTMLElement) => {
      dragState.current.startPos = { x: e.clientX, y: e.clientY };
      dragState.current.element = element;
      
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    };

    // Attach to window object globally as a hack, or return the attach fn
    (window as any).startExplorerDrag = handlePointerDown;

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      delete (window as any).startExplorerDrag;
    };
  }, []);

  return null;
}
