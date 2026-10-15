import { RenderScheduler, RenderPriority } from '../../window-manager/runtime/RenderScheduler';

export class Physics {
  private container: HTMLElement | null = null;
  private items: HTMLElement[] = [];
  
  private mouseX: number | null = null;
  private isHovering = false;

  // Use design tokens conceptually for sizing
  private readonly BASE_SIZE = 48;
  private readonly MAX_SIZE = 72;
  private readonly MAGNIFICATION_RADIUS = 150;

  init(container: HTMLElement) {
    this.container = container;
    // Find all wrappers that contain the actual icon div to scale
    this.items = Array.from(container.querySelectorAll('[data-dock-index] > div:first-child'));
    
    container.addEventListener('mousemove', this.handleMouseMove);
    container.addEventListener('mouseleave', this.handleMouseLeave);
  }

  cleanup() {
    if (this.container) {
      this.container.removeEventListener('mousemove', this.handleMouseMove);
      this.container.removeEventListener('mouseleave', this.handleMouseLeave);
    }
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.isHovering = true;
    this.scheduleUpdate();
  };

  private handleMouseLeave = () => {
    this.isHovering = false;
    this.mouseX = null;
    this.scheduleUpdate();
  };

  private scheduleUpdate = () => {
    // Rely on existing RenderScheduler from Phase 3 to hit 60fps
    RenderScheduler.schedule(RenderPriority.NORMAL, this.updateFrames);
  };

  private updateFrames = () => {
    if (!this.container) return;

    this.items.forEach(item => {
      let scale = 1;

      if (this.isHovering && this.mouseX !== null) {
        const rect = item.getBoundingClientRect();
        // Distance to center of the icon
        const itemCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(this.mouseX - itemCenterX);

        if (distance < this.MAGNIFICATION_RADIUS) {
          const ratio = 1 - distance / this.MAGNIFICATION_RADIUS;
          // Smooth easing curve
          const easing = Math.pow(ratio, 1.5);
          const sizeRange = this.MAX_SIZE - this.BASE_SIZE;
          const newSize = this.BASE_SIZE + sizeRange * easing;
          
          scale = newSize / this.BASE_SIZE;
        }
      }

      item.style.transform = `scale(${scale})`;
    });
  };
}

export const DockPhysics = new Physics();
