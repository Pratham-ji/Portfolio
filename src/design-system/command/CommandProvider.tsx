// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CommandRegistry } from './CommandRegistry';
import { Command } from './Command';

interface CommandContextValue {
  commands: Command[];
  recentCommands: Command[];
  pinnedCommands: Command[];
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  executeCommand: (id: string) => void;
}

const CommandContext = createContext<CommandContextValue | null>(null);

export const CommandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [recent, setRecent] = useState<Command[]>([]);
  const [pinned, setPinned] = useState<Command[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      setCommands(CommandRegistry.getCommands());
      setRecent(CommandRegistry.getRecent());
      setPinned(CommandRegistry.getPinned());
    };
    
    update();
    return CommandRegistry.subscribe(update);
  }, []);

  const executeCommand = (id: string) => {
    const cmd = commands.find(c => c.id === id);
    if (cmd) {
      CommandRegistry.recordExecution(id);
      setIsOpen(false);
      cmd.handler();
    }
  };

  return (
    <CommandContext.Provider value={{
      commands,
      recentCommands: recent,
      pinnedCommands: pinned,
      isOpen,
      setIsOpen,
      executeCommand
    }}>
      {children}
    </CommandContext.Provider>
  );
};

export const useCommandContext = () => {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error("useCommandContext must be used within CommandProvider");
  return ctx;
};
