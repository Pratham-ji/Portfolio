import { Bounds } from '../runtime/WindowTypes';

export class CollisionEngine {
  static constrainToBounds(bounds: Bounds, viewportWidth: number, viewportHeight: number): Bounds {
    let { x, y, width, height } = bounds;
    const TITLEBAR_HEIGHT = 40; 
    const VISIBLE_MARGIN = 20;

    if (y < 0) y = 0;
    if (y > viewportHeight - TITLEBAR_HEIGHT) y = viewportHeight - TITLEBAR_HEIGHT;
    if (x > viewportWidth - VISIBLE_MARGIN) x = viewportWidth - VISIBLE_MARGIN;
    if (x + width < VISIBLE_MARGIN) x = VISIBLE_MARGIN - width;

    return { x, y, width, height };
  }
}
