import { TerminalCommands } from '../runtime/TerminalCommands';
import { TerminalResult } from '../types';

export const helpCommand = {
  name: 'help',
  description: 'List all available commands',
  execute: async (): Promise<TerminalResult> => {
    const cmds = TerminalCommands.getCommands().sort((a, b) => a.name.localeCompare(b.name));
    
    return {
      lines: cmds.map(cmd => ({
        id: crypto.randomUUID(),
        segments: [
          { text: cmd.name.padEnd(15, ' '), color: 'var(--pos-accent-interactive)' },
          { text: cmd.description, color: 'var(--pos-text-secondary)' }
        ]
      }))
    };
  }
};
