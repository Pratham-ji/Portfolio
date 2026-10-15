import { TerminalResult } from '../types';

export const echoCommand = {
  name: 'echo',
  description: 'Print arguments to the terminal',
  execute: async (args: string[]): Promise<TerminalResult> => {
    return {
      lines: [{
        id: crypto.randomUUID(),
        segments: [{ text: args.join(' '), color: 'var(--pos-text-primary)' }]
      }]
    };
  }
};
