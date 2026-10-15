import { RenderScheduler, RenderPriority } from '../../window-manager/runtime/RenderScheduler';

export class Physics {
  private container: HTMLElement | null = null;
  private cards: HTMLElement[] = [];
  
  private draggingCard: HTMLElement | null = null;
  private dragStartX = 0;
  private currentX = 0;

  init(container: HTMLElement) {
    this.container = container;
    this.cards = Array.from(container.querySelectorAll('[data-workspace-id]'));
    
    this.cards.forEach(card => {
      card.addEventListener('mousedown', this.handleMouseDown);
    });
  }

  cleanup() {
    this.cards.forEach(card => {
      card.removeEventListener('mousedown', this.handleMouseDown);
    });
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.draggingCard = e.currentTarget as HTMLElement;
    this.dragStartX = e.clientX;
    this.currentX = 0;
    
    this.draggingCard.style.transition = 'none';
    this.draggingCard.style.zIndex = '100';

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.draggingCard) return;
    this.currentX = e.clientX - this.dragStartX;
    RenderScheduler.schedule(RenderPriority.CRITICAL, this.updateFrames);
  };

  private handleMouseUp = () => {
    if (!this.draggingCard) return;
    
    this.draggingCard.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
    this.draggingCard.style.transform = `translate3d(0px, 0px, 0px)`;
    this.draggingCard.style.zIndex = '';
    
    this.draggingCard = null;
    
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  private updateFrames = () => {
    if (this.draggingCard) {
      // GPU accelerated translate3d, 0 react renders
      this.draggingCard.style.transform = `translate3d(${this.currentX}px, 0px, 0px) scale(1.05)`;
    }
  };
}

export const WorkspacePhysics = new Physics();
