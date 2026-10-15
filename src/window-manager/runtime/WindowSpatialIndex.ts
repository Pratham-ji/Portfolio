import { Bounds } from './WindowTypes';

export class SpatialIndex {
  private windows: Map<string, Bounds> = new Map();

  update(windowId: string, bounds: Bounds) {
    this.windows.set(windowId, bounds);
  }

  remove(windowId: string) {
    this.windows.delete(windowId);
  }

  hitTest(x: number, y: number): string[] {
    const hits: string[] = [];
    for (const [id, bounds] of Array.from(this.windows.entries())) {
      if (
        x >= bounds.x &&
        x <= bounds.x + bounds.width &&
        y >= bounds.y &&
        y <= bounds.y + bounds.height
      ) {
        hits.push(id);
      }
    }
    return hits;
  }
}

export const WindowSpatialIndex = new SpatialIndex();
