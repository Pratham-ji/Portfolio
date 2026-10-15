import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';
import { TerminalResult } from '../types';

export const lsCommand = {
  name: 'ls',
  description: 'List directory contents',
  execute: async (args: string[], cwd: string): Promise<TerminalResult> => {
    const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const pathArgs = args.filter(arg => !arg.startsWith('-'));

    let targetNode = FileSystemStore.getNode(cwd);

    if (pathArgs.length > 0) {
      targetNode = FileSystemStore.resolveNode(pathArgs[0], cwd);
      if (!targetNode) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `ls: no such file or directory: ${pathArgs[0]}`, color: 'var(--pos-color-error)' }]
          }]
        };
      }
    }

    if (!targetNode) {
      return { lines: [] };
    }

    if (!targetNode.isDirectory) {
      return {
        lines: [{
          id: crypto.randomUUID(),
          segments: [{ text: targetNode.name, color: 'var(--pos-text-primary)' }]
        }]
      };
    }

    let contents = FileSystemStore.getChildren(targetNode.id);
    if (!showHidden) {
      contents = contents.filter(node => !node.name.startsWith('.'));
    }

    return {
      lines: contents.map(node => ({
        id: crypto.randomUUID(),
        segments: [
          { 
            text: node.name, 
            color: node.isDirectory ? 'var(--pos-accent-interactive)' : 'var(--pos-text-primary)',
            bold: node.isDirectory
          }
        ]
      }))
    };
  }
};
