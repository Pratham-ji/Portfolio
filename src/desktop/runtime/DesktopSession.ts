import { Bounds } from '../../window-manager/runtime/WindowTypes';
import { RenderScheduler, RenderPriority } from '../../window-manager/runtime/RenderScheduler';
import { DesktopDragSession } from './DesktopDragSession';

class Session {
  private selectionStart = { x: 0, y: 0 };
  private selectionCurrent = { x: 0, y: 0 };
  private selecting = false;
  private selectedItemIds: Set<string> = new Set();
  
  // Selection Physics / Overlay sync
  private overlayElement: HTMLElement | null = null;

  setOverlayElement(el: HTMLElement | null) {
    this.overlayElement = el;
  }

  startSelection(x: number, y: number) {
    this.selecting = true;
    this.selectionStart = { x, y };
    this.selectionCurrent = { x, y };
    this.selectedItemIds.clear(); // Shift to add to selection can be supported later
    this.updateOverlay();
  }

  updateSelection(x: number, y: number) {
    if (!this.selecting) return;
    this.selectionCurrent = { x, y };
    this.updateOverlay();
  }

  commitSelection() {
    this.selecting = false;
    if (this.overlayElement) {
      this.overlayElement.style.opacity = '0';
      this.overlayElement.style.willChange = 'auto'; // GPU cleanup
    }
    // Tell DesktopGrid to calculate intersections and highlight
  }

  isSelecting() {
    return this.selecting;
  }
  
  private updateOverlay() {
    if (!this.overlayElement) return;
    
    const x = Math.min(this.selectionStart.x, this.selectionCurrent.x);
    const y = Math.min(this.selectionStart.y, this.selectionCurrent.y);
    const w = Math.abs(this.selectionCurrent.x - this.selectionStart.x);
    const h = Math.abs(this.selectionCurrent.y - this.selectionStart.y);
    
    RenderScheduler.schedule(RenderPriority.CRITICAL, () => {
      if (this.overlayElement) {
        this.overlayElement.style.opacity = '1';
        this.overlayElement.style.willChange = 'transform, width, height, opacity';
        this.overlayElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        this.overlayElement.style.width = `${w}px`;
        this.overlayElement.style.height = `${h}px`;
      }
    });
  }

  // --- Icon Dragging ---
  startIconDrag(itemId: string, x: number, y: number) {
    let idsToDrag = Array.from(this.selectedItemIds);
    if (!idsToDrag.includes(itemId)) {
      idsToDrag = [itemId];
      this.selectedItemIds = new Set(idsToDrag);
    }
    DesktopDragSession.start(idsToDrag, x, y);
  }

  updateIconDrag(x: number, y: number) {
    DesktopDragSession.update(x, y);
  }

  commitIconDrag() {
    DesktopDragSession.commit();
  }

  isDraggingIcon() {
    return DesktopDragSession.isActive();
  }

  // --- Keyboard ---
  navigateSelection(direction: string) {
    // Arrow Key navigation logic
  }

  executeSelected() {
    // Double click / Enter logic
  }
}

export const DesktopSession = new Session();
