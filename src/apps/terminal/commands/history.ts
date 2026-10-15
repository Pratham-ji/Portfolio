import { TerminalStore } from '../runtime/TerminalStore';
import { TerminalResult } from '../types';

export const historyCommand = {
  name: 'history',
  description: 'Show terminal history',
  execute: async (): Promise<TerminalResult> => {
    const state = TerminalStore.getState();
    const inputLines = state.history.filter(h => h.isInput);
    
    return {
      lines: inputLines.map((line, idx) => {
        const text = line.segments.map(s => s.text).join('').split('$ ')[1] || '';
        return {
          id: crypto.randomUUID(),
          segments: [
            { text: `  ${idx + 1}  ${text}`, color: 'var(--pos-text-primary)' }
          ]
        };
      })
    };
  }
};
