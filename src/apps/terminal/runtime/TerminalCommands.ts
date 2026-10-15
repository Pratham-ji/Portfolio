import { TerminalCommandDef, TerminalResult } from '../types';
import { TerminalStore } from './TerminalStore';
import { TerminalSession } from './TerminalSession';

class TerminalCommandRegistry {
  private commands: Map<string, TerminalCommandDef> = new Map();

  public register(cmd: TerminalCommandDef) {
    this.commands.set(cmd.name, cmd);
  }

  public getCommands(): TerminalCommandDef[] {
    return Array.from(this.commands.values());
  }

  public getCommand(name: string): TerminalCommandDef | undefined {
    return this.commands.get(name);
  }

  public async execute(input: string) {
    if (!input.trim()) return;

    const { TerminalParser } = await import('./TerminalParser');
    const tokens = TerminalParser.parse(input);
    if (tokens.length === 0) return;

    const cmdName = tokens[0];
    const args = tokens.slice(1);
    
    // Echo input
    const cwd = TerminalSession.getCwdName();
    TerminalStore.appendHistory([{
      id: crypto.randomUUID(),
      isInput: true,
      segments: [
        { text: `${TerminalSession.getUser()}@${TerminalSession.getHost()}`, color: 'var(--pos-color-success)' },
        { text: ':' },
        { text: `~/${cwd === 'pratham' ? '' : cwd}`, color: 'var(--pos-accent-interactive)' },
        { text: '$ ' },
        { text: input }
      ]
    }]);

    const cmd = this.getCommand(cmdName);
    
    if (cmd) {
      TerminalStore.setProcessing(true);
      try {
        const result = await cmd.execute(args, TerminalSession.getCwd());
        if (result && result.lines) {
          TerminalStore.appendHistory(result.lines);
        }
      } catch (err: any) {
        TerminalStore.appendHistory([{
          id: crypto.randomUUID(),
          segments: [{ text: `Error: ${err.message}`, color: 'var(--pos-color-error)' }]
        }]);
      } finally {
        TerminalStore.setProcessing(false);
      }
    } else {
      TerminalStore.appendHistory([{
        id: crypto.randomUUID(),
        segments: [{ text: `command not found: ${cmdName}`, color: 'var(--pos-color-error)' }]
      }]);
    }
  }
}

export const TerminalCommands = new TerminalCommandRegistry();
