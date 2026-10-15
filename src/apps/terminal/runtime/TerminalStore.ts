import { TerminalState, TerminalLineData } from '../types';

class TerminalStoreImpl {
  private state: TerminalState = {
    history: [],
    cwd: 'pratham', // matches initial FileSystemStore cwd
    isProcessing: false,
  };

  private listeners: Set<() => void> = new Set();

  public getState(): TerminalState {
    return this.state;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public appendHistory(lines: TerminalLineData[]) {
    // Keep max 100,000 lines? It will just push for now.
    this.state.history.push(...lines);
    if (this.state.history.length > 100000) {
      this.state.history = this.state.history.slice(-100000);
    }
    this.notify();
  }

  public clearHistory() {
    this.state.history = [];
    this.notify();
  }

  public setCwd(cwd: string) {
    this.state.cwd = cwd;
    this.notify();
  }

  public setProcessing(isProcessing: boolean) {
    this.state.isProcessing = isProcessing;
    this.notify();
  }
}

export const TerminalStore = new TerminalStoreImpl();
