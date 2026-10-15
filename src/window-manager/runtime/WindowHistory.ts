import { Bounds, WindowStateStatus } from './WindowTypes';
import { WindowCommand } from './WindowCommands';

export class WindowHistoryManager {
  private history: WindowCommand[] = [];
  private index: number = -1;

  pushCommand(command: WindowCommand) {
    // If we're not at the end, truncate future history (like standard undo)
    if (this.index < this.history.length - 1) {
      this.history = this.history.slice(0, this.index + 1);
    }
    this.history.push(command);
    this.index++;
    
    // Optional: cap history at e.g. 100 to prevent memory leak
    if (this.history.length > 100) {
      this.history.shift();
      this.index--;
    }
  }

  undo() {
    if (this.index >= 0) {
      const command = this.history[this.index];
      command.undo();
      this.index--;
    }
  }

  redo() {
    if (this.index < this.history.length - 1) {
      this.index++;
      const command = this.history[this.index];
      command!.execute();
    }
  }
}

export const WindowHistory = new WindowHistoryManager();
