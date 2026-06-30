import { ReactNode } from 'react';

export interface HistoryEntry {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: ReactNode;
}

export interface TerminalContextValue {
  history: HistoryEntry[];
  currentPath: string;
  inputHistory: string[];
  pushHistory: (entry: Omit<HistoryEntry, 'id'>) => void;
  clearHistory: () => void;
  setCurrentPath: (path: string) => void;
  addInputHistory: (input: string) => void;
  closeTerminal: () => void;
}
