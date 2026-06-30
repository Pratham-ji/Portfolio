import { DesktopState, DesktopAction } from './types';

/**
 * Desktop reducer handling UI state mutations immutably.
 */
export const desktopReducer = (state: DesktopState, action: DesktopAction): DesktopState => {
  switch (action.type) {
    case 'TOGGLE_START_MENU':
      return {
        ...state,
        isStartMenuOpen: !state.isStartMenuOpen,
        isSearchOpen: false, // Close search when toggling start menu
      };
      
    case 'CLOSE_START_MENU':
      return {
        ...state,
        isStartMenuOpen: false,
      };
      
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        isSearchOpen: !state.isSearchOpen,
        isStartMenuOpen: false, // Close start menu when toggling search
      };
      
    case 'CLOSE_SEARCH':
      return {
        ...state,
        isSearchOpen: false,
      };
      
    default:
      return state;
  }
};
