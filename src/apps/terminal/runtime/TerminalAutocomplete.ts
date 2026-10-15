import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';
import { TerminalCommands } from './TerminalCommands';
import { TerminalSession } from './TerminalSession';

export class TerminalAutocomplete {
  public static complete(input: string): string | null {
    if (!input) return null;

    const parts = input.split(' ');
    const lastPart = parts[parts.length - 1];

    if (parts.length === 1) {
      // Complete command
      const cmds = TerminalCommands.getCommands().map(c => c.name);
      const matches = cmds.filter(c => c.startsWith(lastPart));
      if (matches.length === 1) {
        return matches[0] + ' ';
      }
    } else {
      // Complete path
      const cwd = TerminalSession.getCwd();
      const children = FileSystemStore.getChildren(cwd);
      const matches = children.filter(c => c.name.toLowerCase().startsWith(lastPart.toLowerCase()));
      
      if (matches.length === 1) {
        const remaining = input.slice(0, input.length - lastPart.length);
        const suffix = matches[0].isDirectory ? '/' : ' ';
        return remaining + matches[0].name + suffix;
      }
    }

    return null;
  }
}
