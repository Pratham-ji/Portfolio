export interface WindowStateObj {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface WindowManagerState {
  windows: WindowStateObj[];
  activeWindowId: string | null;
  highestZIndex: number;
}

export type WindowAction =
  | { type: 'OPEN_WINDOW'; payload: { id: string; appId: string; title: string; defaultPosition: { x: number; y: number }; defaultSize: { width: number; height: number } } }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'MAXIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'FOCUS_WINDOW'; payload: { id: string } }
  | { type: 'UPDATE_TRANSFORM'; payload: { id: string; position?: { x: number; y: number }; size?: { width: number; height: number } } };
