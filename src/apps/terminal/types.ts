export interface TerminalSegment {
  text: string;
  color?: string; // PrathamOS CSS var e.g. var(--pos-color-success)
  bold?: boolean;
}

export interface TerminalLineData {
  id: string;
  segments: TerminalSegment[];
  isInput?: boolean; // True if it's the user's echo'd input
}

export interface TerminalResult {
  lines: TerminalLineData[];
}

export interface TerminalState {
  history: TerminalLineData[];
  cwd: string;
  isProcessing: boolean;
}

export type TerminalCommandExecutor = (args: string[], cwd: string) => Promise<TerminalResult>;

export interface TerminalCommandDef {
  name: string;
  description: string;
  execute: TerminalCommandExecutor;
}
