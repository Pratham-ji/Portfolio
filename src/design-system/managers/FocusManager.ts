/**
 * ==========================================================================
 * PRATHAMOS v3.2 — FOCUS MANAGER
 * ==========================================================================
 * Global focus tracking for operating system structural elements.
 */

export type FocusId = string | null;

class FocusManagerSingleton {
  private focusedWindow: FocusId = null;
  private focusedPanel: FocusId = null;
  private focusedElement: HTMLElement | null = null;
  private previousFocusedElement: HTMLElement | null = null;

  private listeners: Set<() => void> = new Set();

  /**
   * Subscribe to focus changes.
   */
  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  /**
   * Focus a specific structural element or window.
   */
  public focus(windowId?: FocusId, panelId?: FocusId, element?: HTMLElement): void {
    if (element) {
      this.previousFocusedElement = this.focusedElement;
      this.focusedElement = element;
      element.focus();
    }
    if (windowId !== undefined) {
      this.focusedWindow = windowId;
    }
    if (panelId !== undefined) {
      this.focusedPanel = panelId;
    }
    this.notify();
  }

  /**
   * Blur the current global focus states.
   */
  public blur(): void {
    this.previousFocusedElement = this.focusedElement;
    if (this.focusedElement) {
      this.focusedElement.blur();
    }
    this.focusedElement = null;
    this.focusedWindow = null;
    this.focusedPanel = null;
    this.notify();
  }

  /**
   * Restore focus to the previously active element.
   */
  public restorePreviousFocus(): void {
    if (this.previousFocusedElement) {
      this.focus(undefined, undefined, this.previousFocusedElement);
    }
  }

  public getFocusedWindow(): FocusId { return this.focusedWindow; }
  public getFocusedPanel(): FocusId { return this.focusedPanel; }
  public getFocusedElement(): HTMLElement | null { return this.focusedElement; }
}

export const FocusManager = new FocusManagerSingleton();
