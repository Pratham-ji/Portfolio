import { Command } from './Command';

class CommandRegistryImpl {
  private commands: Map<string, Command> = new Map();
  private observers: Set<() => void> = new Set();
  private recentIds: string[] = [];
  private pinnedIds: Set<string> = new Set();

  register(cmd: Command) {
    this.commands.set(cmd.id, cmd);
    this.notify();
  }

  unregister(id: string) {
    this.commands.delete(id);
    this.notify();
  }

  getCommands(): Command[] {
    return Array.from(this.commands.values()).filter(c => !c.condition || c.condition());
  }

  getRecent(): Command[] {
    return this.recentIds
      .map(id => this.commands.get(id))
      .filter((c): c is Command => c !== undefined);
  }
  
  getPinned(): Command[] {
    return Array.from(this.pinnedIds)
      .map(id => this.commands.get(id))
      .filter((c): c is Command => c !== undefined);
  }

  recordExecution(id: string) {
    this.recentIds = [id, ...this.recentIds.filter(i => i !== id)].slice(0, 5);
    this.notify();
  }
  
  pinCommand(id: string) {
    this.pinnedIds.add(id);
    this.notify();
  }

  unpinCommand(id: string) {
    this.pinnedIds.delete(id);
    this.notify();
  }

  subscribe(callback: () => void) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  private notify() {
    this.observers.forEach(obs => obs());
  }
}

export const CommandRegistry = new CommandRegistryImpl();
