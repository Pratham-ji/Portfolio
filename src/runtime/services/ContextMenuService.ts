export interface ContextMenuOptions {
  x: number;
  y: number;
  items: { id: string; label: string; action: () => void; disabled?: boolean }[];
}

class CMService {
  private listeners: Set<(options: ContextMenuOptions | null) => void> = new Set();
  private currentOptions: ContextMenuOptions | null = null;

  public show(options: ContextMenuOptions) {
    this.currentOptions = options;
    this.notify();
  }

  public hide() {
    this.currentOptions = null;
    this.notify();
  }

  public subscribe(listener: (options: ContextMenuOptions | null) => void) {
    this.listeners.add(listener);
    // Send initial state immediately
    listener(this.currentOptions);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach(l => l(this.currentOptions));
  }
}

export const ContextMenuService = new CMService();
