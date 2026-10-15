import { Bounds } from './WindowTypes';

export class RegionManager {
  private dirtyRects: Bounds[] = [];

  markDirty(bounds: Bounds) {
    this.dirtyRects.push(bounds);
  }

  clear() {
    this.dirtyRects = [];
  }

  getDirtyRegions(): Bounds[] {
    return this.dirtyRects;
  }

  // Future GPU compositing prep: calculate intersecting regions
  intersectsDirtyRegion(bounds: Bounds): boolean {
    if (this.dirtyRects.length === 0) return true; // Default to redraw if unmanaged
    
    for (const rect of this.dirtyRects) {
      if (
        bounds.x < rect.x + rect.width &&
        bounds.x + bounds.width > rect.x &&
        bounds.y < rect.y + rect.height &&
        bounds.y + bounds.height > rect.y
      ) {
        return true;
      }
    }
    return false;
  }
}

export const DirtyRegionManager = new RegionManager();
