class TerminalInputHistoryImpl {
  private history: string[] = [];
  private currentIndex: number = -1;

  public push(input: string) {
    if (input.trim() === '') return;
    // Don't push duplicate sequential items
    if (this.history[this.history.length - 1] !== input) {
      this.history.push(input);
    }
    this.currentIndex = this.history.length;
  }

  public getPrevious(): string | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  public getNext(currentInput: string): string | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    this.currentIndex = this.history.length;
    return ''; // Clear input if we reached the bottom
  }
}

export const TerminalHistory = new TerminalInputHistoryImpl();
