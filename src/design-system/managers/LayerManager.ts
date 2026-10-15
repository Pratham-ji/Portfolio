import { LayerEnum, LayerId } from '../types/layer';

/**
 * ==========================================================================
 * PRATHAMOS v3.2 — LAYER MANAGER
 * ==========================================================================
 * Never hardcode z-index. Dynamic allocation based on LayerEnum bounds.
 */

class LayerManagerSingleton {
  private windowLayers: Map<LayerId, number> = new Map();
  private maxWindowZIndex: number = LayerEnum.WindowBase;

  /**
   * Allocate a new dynamic z-index for a window, ensuring it is at the front.
   */
  public allocateWindowLayer(id: LayerId): number {
    this.maxWindowZIndex += 1;
    this.windowLayers.set(id, this.maxWindowZIndex);
    return this.maxWindowZIndex;
  }

  /**
   * Release a layer from tracking.
   */
  public releaseLayer(id: LayerId): void {
    this.windowLayers.delete(id);
    if (this.windowLayers.size === 0) {
      this.maxWindowZIndex = LayerEnum.WindowBase;
    }
  }

  /**
   * Bring an existing window to the front.
   */
  public bringToFront(id: LayerId): number {
    if (!this.windowLayers.has(id)) {
      return this.allocateWindowLayer(id);
    }
    this.maxWindowZIndex += 1;
    this.windowLayers.set(id, this.maxWindowZIndex);
    return this.maxWindowZIndex;
  }

  /**
   * Peek at the highest active window z-index without allocating.
   */
  public peekHighestLayer(): number {
    return this.maxWindowZIndex;
  }
}

export const LayerManager = new LayerManagerSingleton();
