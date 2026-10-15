import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';
import { TerminalSession } from '../runtime/TerminalSession';
import { TerminalResult } from '../types';

export const cdCommand = {
  name: 'cd',
  description: 'Change directory',
  execute: async (args: string[], cwd: string): Promise<TerminalResult> => {
    if (!args[0] || args[0] === '~') {
      TerminalSession.setCwd('pratham');
      return { lines: [] };
    }
    
    if (args[0] === '..') {
      const node = FileSystemStore.getNode(cwd);
      if (node && node.parentId) {
        TerminalSession.setCwd(node.parentId);
      }
      return { lines: [] };
    }

    const match = FileSystemStore.resolveNode(args[0], cwd);
    
    if (match && match.isDirectory) {
      TerminalSession.setCwd(match.id);
      return { lines: [] };
    }

    return {
      lines: [{
        id: crypto.randomUUID(),
        segments: [{ text: `cd: no such file or directory: ${args[0]}`, color: 'var(--pos-color-error)' }]
      }]
    };
  }
};
