import { useEffect, useState } from 'react';
import { LayerManager } from '../managers/LayerManager';
import { LayerId } from '../types/layer';

/**
 * useLayer automatically allocates a zIndex on mount and releases it on unmount.
 * It also exposes a function to bring the layer to the front.
 */
export const useLayer = (id: LayerId) => {
  const [zIndex, setZIndex] = useState<number>(0);

  useEffect(() => {
    const allocated = LayerManager.allocateWindowLayer(id);
    setZIndex(allocated);

    return () => {
      LayerManager.releaseLayer(id);
    };
  }, [id]);

  const bringToFront = () => {
    const newZIndex = LayerManager.bringToFront(id);
    setZIndex(newZIndex);
  };

  return { zIndex, bringToFront };
};
