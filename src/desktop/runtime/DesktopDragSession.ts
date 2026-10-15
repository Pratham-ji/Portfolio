export class DragSession {
  private activeItemIds: string[] = [];
  private startX: number = 0;
  private startY: number = 0;
  
  start(itemIds: string[], x: number, y: number) {
    this.activeItemIds = itemIds;
    this.startX = x;
    this.startY = y;
  }
  
  update(x: number, y: number) {
    // Calculate delta and animate generic drag overlays
    // Not implemented yet
  }
  
  commit() {
    // Drop logic goes here
    this.activeItemIds = [];
  }
  
  isActive() {
    return this.activeItemIds.length > 0;
  }
}

export const DesktopDragSession = new DragSession();
