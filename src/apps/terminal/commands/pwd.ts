import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';
import { TerminalResult } from '../types';

export const pwdCommand = {
  name: 'pwd',
  description: 'Print working directory',
  execute: async (args: string[], cwd: string): Promise<TerminalResult> => {
    const path = FileSystemStore.getPath(cwd);
    const pathString = '/' + path.map(n => n.name).join('/');
    
    return {
      lines: [{
        id: crypto.randomUUID(),
        segments: [{ text: pathString, color: 'var(--pos-text-primary)' }]
      }]
    };
  }
};
