export interface DesktopState {
  isStartMenuOpen: boolean;
  isSearchOpen: boolean;
}

export type DesktopAction =
  | { type: 'TOGGLE_START_MENU' }
  | { type: 'CLOSE_START_MENU' }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'CLOSE_SEARCH' };
