import { WindowStore } from '../runtime/WindowStore';
import { SnapZone, Bounds } from '../runtime/WindowTypes';
import { MotionScheduler } from '../../design-system/motion/MotionScheduler';

export class SnapPhysics {
  // Edge Resistance Configuration
  static readonly MAGNETIC_RESISTANCE_PX = 12;

  static checkMagneticResistance(mouseX: number, mouseY: number, viewportWidth: number, viewportHeight: number): SnapZone {
    const isTop = mouseY <= this.MAGNETIC_RESISTANCE_PX;
    const isBottom = mouseY >= viewportHeight - this.MAGNETIC_RESISTANCE_PX;
    const isLeft = mouseX <= this.MAGNETIC_RESISTANCE_PX;
    const isRight = mouseX >= viewportWidth - this.MAGNETIC_RESISTANCE_PX;

    if (isTop && isLeft) return 'top-left';
    if (isTop && isRight) return 'top-right';
    if (isBottom && isLeft) return 'bottom-left';
    if (isBottom && isRight) return 'bottom-right';
    
    if (isTop) return 'maximize';
    if (isLeft) return 'left-half';
    if (isRight) return 'right-half';
    if (isBottom) return 'bottom-half';
    
    return 'none';
  }

  static applySnap(windowId: string, element: HTMLElement, zone: SnapZone, viewportWidth: number, viewportHeight: number) {
    const win = WindowStore.getWindow(windowId);
    if (!win || !win.capabilities.snap) return;

    let targetBounds: Bounds = { ...win.bounds };
    let targetState = win.state;

    if (zone === 'maximize') {
      targetBounds = { x: 0, y: 0, width: viewportWidth, height: viewportHeight };
      targetState = 'maximized';
    } else if (zone === 'left-half') {
      targetBounds = { x: 0, y: 0, width: viewportWidth / 2, height: viewportHeight };
      targetState = 'normal';
    } else if (zone === 'right-half') {
      targetBounds = { x: viewportWidth / 2, y: 0, width: viewportWidth / 2, height: viewportHeight };
      targetState = 'normal';
    }

    if (targetState === 'maximized') {
      WindowStore.setWindowState(windowId, 'maximized');
    }

    MotionScheduler.schedule({
      targets: element,
      width: targetBounds.width,
      height: targetBounds.height,
      translateX: targetBounds.x,
      translateY: targetBounds.y,
      duration: 250,
      easing: 'easeOutQuad',
      complete: () => {
        WindowStore.commitWindowResize(windowId, targetBounds);
      }
    });
  }

  static restore(windowId: string, element: HTMLElement) {
    const win = WindowStore.getWindow(windowId);
    if (!win || !win.restoreAnimationOrigin) return;

    const targetBounds = win.restoreAnimationOrigin;
    WindowStore.setWindowState(windowId, 'normal');

    MotionScheduler.schedule({
      targets: element,
      width: targetBounds.width,
      height: targetBounds.height,
      translateX: targetBounds.x,
      translateY: targetBounds.y,
      duration: 250,
      easing: 'easeOutQuad',
      complete: () => {
        WindowStore.commitWindowResize(windowId, targetBounds);
      }
    });
  }
}
