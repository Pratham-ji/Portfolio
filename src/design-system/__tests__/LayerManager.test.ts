import { describe, it, expect } from 'vitest';
import { LayerManager } from '../managers/LayerManager';
import { LayerEnum } from '../types/layer';

describe('LayerManager', () => {
  it('allocates window layers starting from WindowBase', () => {
    const layer1 = LayerManager.allocateWindowLayer('win1');
    expect(layer1).toBe(LayerEnum.WindowBase + 1);

    const layer2 = LayerManager.allocateWindowLayer('win2');
    expect(layer2).toBe(LayerEnum.WindowBase + 2);
  });

  it('brings layer to front by allocating a new max zIndex', () => {
    const highest = LayerManager.peekHighestLayer();
    const newLayer = LayerManager.bringToFront('win1');
    expect(newLayer).toBe(highest + 1);
  });

  it('resets max zIndex when all layers are released', () => {
    LayerManager.allocateWindowLayer('win3');
    LayerManager.releaseLayer('win1');
    LayerManager.releaseLayer('win2');
    LayerManager.releaseLayer('win3');

    expect(LayerManager.peekHighestLayer()).toBe(LayerEnum.WindowBase);
  });
});
