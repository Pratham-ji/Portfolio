export class Selection {
  private selectedIds: Set<string> = new Set();
  private listeners: Set<() => void> = new Set();
  private lastSelectedId: string | null = null;

  public select(id: string, multi: boolean = false, range: boolean = false, list: string[] = []) {
    if (!multi && !range) {
      this.selectedIds.clear();
      this.selectedIds.add(id);
      this.lastSelectedId = id;
    } else if (multi && !range) {
      if (this.selectedIds.has(id)) {
        this.selectedIds.delete(id);
      } else {
        this.selectedIds.add(id);
      }
      this.lastSelectedId = id;
    } else if (range && this.lastSelectedId && list.length > 0) {
      const startIndex = list.indexOf(this.lastSelectedId);
      const endIndex = list.indexOf(id);
      if (startIndex !== -1 && endIndex !== -1) {
        const start = Math.min(startIndex, endIndex);
        const end = Math.max(startIndex, endIndex);
        this.selectedIds.clear();
        for (let i = start; i <= end; i++) {
          this.selectedIds.add(list[i]);
        }
      }
    }
    this.notify();
  }

  public clear() {
    this.selectedIds.clear();
    this.lastSelectedId = null;
    this.notify();
  }

  public getSelected(): string[] {
    return Array.from(this.selectedIds);
  }

  public has(id: string): boolean {
    return this.selectedIds.has(id);
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const SelectionManager = new Selection();
