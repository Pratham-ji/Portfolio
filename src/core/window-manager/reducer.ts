import { WindowManagerState, WindowAction } from './types';

const handleCloseWindow = (state: WindowManagerState, id: string): WindowManagerState => {
  const remainingWindows = state.windows.filter(w => w.id !== id);
  let newActiveId = state.activeWindowId;
  if (newActiveId === id) {
    const focusable = remainingWindows.filter(w => !w.isMinimized);
    if (focusable.length > 0) {
      newActiveId = focusable.reduce((top, w) => (w.zIndex > top.zIndex ? w : top)).id;
    } else {
      newActiveId = null;
    }
  }
  return { ...state, windows: remainingWindows, activeWindowId: newActiveId };
};

/**
 * WindowManager reducer handling lifecycle, transform, and z-index ordering.
 */
export const windowReducer = (state: WindowManagerState, action: WindowAction): WindowManagerState => {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const nextZ = state.highestZIndex + 1;
      return {
        ...state,
        highestZIndex: nextZ,
        activeWindowId: action.payload.id,
        windows: [
          ...state.windows,
          {
            id: action.payload.id,
            appId: action.payload.appId,
            title: action.payload.title,
            isMinimized: false,
            isMaximized: false,
            zIndex: nextZ,
            position: action.payload.defaultPosition,
            size: action.payload.defaultSize,
          }
        ]
      };
    }
    
    case 'CLOSE_WINDOW':
      return handleCloseWindow(state, action.payload.id);

    case 'MINIMIZE_WINDOW': {
      let newActiveId = state.activeWindowId;
      if (newActiveId === action.payload.id) {
        const remainingWindows = state.windows.filter(w => w.id !== action.payload.id && !w.isMinimized);
        if (remainingWindows.length > 0) {
          const topWindow = remainingWindows.reduce((top, w) => (w.zIndex > top.zIndex ? w : top));
          newActiveId = topWindow.id;
        } else {
          newActiveId = null;
        }
      }
      return {
        ...state,
        windows: state.windows.map(w => w.id === action.payload.id ? { ...w, isMinimized: true } : w),
        activeWindowId: newActiveId,
      };
    }

    case 'MAXIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w => w.id === action.payload.id ? { ...w, isMaximized: !w.isMaximized } : w),
      };

    case 'FOCUS_WINDOW': {
      if (state.activeWindowId === action.payload.id) return state;
      const nextZ = state.highestZIndex + 1;
      return {
        ...state,
        activeWindowId: action.payload.id,
        highestZIndex: nextZ,
        windows: state.windows.map(w => w.id === action.payload.id ? { ...w, zIndex: nextZ, isMinimized: false } : w),
      };
    }

    case 'UPDATE_TRANSFORM':
      return {
        ...state,
        windows: state.windows.map(w => {
          if (w.id !== action.payload.id) return w;
          return {
            ...w,
            position: action.payload.position || w.position,
            size: action.payload.size || w.size,
          };
        }),
      };

    default:
      return state;
  }
};
