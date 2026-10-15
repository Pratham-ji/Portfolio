import { TerminalStore } from '../runtime/TerminalStore';
import { TerminalResult } from '../types';

export const clearCommand = {
  name: 'clear',
  description: 'Clear the terminal screen',
  execute: async (): Promise<TerminalResult> => {
    TerminalStore.clearHistory();
    return { lines: [] }; // The command parser prints the prompt before execution, but clearHistory will wipe it.
  }
};
