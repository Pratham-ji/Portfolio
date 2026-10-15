import { FileNode } from '../../../runtime/filesystem/FileSystemTypes';
import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';

export class TreeCtrl {
  private expanded: Set<string> = new Set(['root', 'users', 'pratham', 'desktop', 'portfolio']);
  private listeners: Set<() => void> = new Set();
  private activeId: string | null = null;
  private rootId: string = 'root';

  public toggleExpand(id: string) {
    if (this.expanded.has(id)) {
      this.expanded.delete(id);
    } else {
      this.expanded.add(id);
    }
    this.notify();
  }

  public expand(id: string) {
    this.expanded.add(id);
    this.notify();
  }

  public collapse(id: string) {
    this.expanded.delete(id);
    this.notify();
  }

  public isExpanded(id: string): boolean {
    return this.expanded.has(id);
  }

  public setActive(id: string) {
    this.activeId = id;
    this.notify();
  }

  public getActive(): string | null {
    return this.activeId;
  }

  public getRoot(): string {
    return this.rootId;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const TreeController = new TreeCtrl();
