import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';
import { TerminalResult } from '../types';

export const catCommand = {
  name: 'cat',
  description: 'Concatenate and print files',
  execute: async (args: string[], cwd: string): Promise<TerminalResult> => {
    if (!args[0]) {
      return { lines: [] };
    }

    const match = FileSystemStore.resolveNode(args[0], cwd);

    if (!match) {
      return {
        lines: [{
          id: crypto.randomUUID(),
          segments: [{ text: `cat: ${args[0]}: No such file or directory`, color: 'var(--pos-color-error)' }]
        }]
      };
    }

    if (match.isDirectory) {
      return {
        lines: [{
          id: crypto.randomUUID(),
          segments: [{ text: `cat: ${args[0]}: Is a directory`, color: 'var(--pos-color-error)' }]
        }]
      };
    }

    if (match.content !== undefined) {
      const contentLines = match.content.split('\n');
      return {
        lines: contentLines.map(line => ({
          id: crypto.randomUUID(),
          segments: [{ text: line, color: 'var(--pos-text-primary)' }]
        }))
      };
    }

    return {
      lines: [{
        id: crypto.randomUUID(),
        segments: [{ text: `(Contents of ${match.name})`, color: 'var(--pos-text-primary)' }]
      }]
    };
  }
};
