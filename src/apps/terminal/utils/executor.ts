import { TerminalContextValue } from '../types';
import { useFileSystem } from '../../../core/file-system';
import { parseCommand } from './parser';
import { executeFileSystemCommand } from './fsCommands';
import { executeSystemCommand } from './sysCommands';

export const useCommandExecutor = (ctx: TerminalContextValue) => {
  const { state: fsState } = useFileSystem();

  const executeCommand = (input: string) => {
    if (!input.trim()) return;

    ctx.addInputHistory(input);
    
    // Echo input
    ctx.pushHistory({
      type: 'input',
      content: `${ctx.currentPath} $ ${input}`
    });

    const { command, args } = parseCommand(input);

    try {
      // Route commands
      if (['pwd', 'ls', 'cd', 'cat', 'tree'].includes(command)) {
        executeFileSystemCommand(command, args, ctx, fsState);
      } else if (['clear', 'history', 'whoami', 'date', 'neofetch', 'sudo', 'rm', 'exit'].includes(command)) {
        executeSystemCommand(command, args, ctx);
      } else if (['skills', 'projects', 'experience', 'contact', 'resume', 'github', 'leetcode', 'about', 'help'].includes(command)) {
        executeSystemCommand(command, args, ctx); // Handle info commands
      } else {
        ctx.pushHistory({
          type: 'error',
          content: `Command not found: ${command}. Type 'help' to see available commands.`
        });
      }
    } catch (err) {
      ctx.pushHistory({
        type: 'error',
        content: err instanceof Error ? err.message : 'An unexpected error occurred.'
      });
    }
  };

  return { executeCommand };
};
