import { DesktopSession } from './DesktopSession';
import { WorkspaceManager } from './WorkspaceManager';
// CommandRegistry will be used to route context menu actions, mock for now
// import { CommandRegistry } from '../../design-system/command/CommandRegistry';

export class InputRouter {
  handlePointerDown(e: React.PointerEvent, context: 'desktop' | 'icon', payload?: any) {
    if (context === 'desktop') {
      if (e.button === 0) {
        DesktopSession.startSelection(e.clientX, e.clientY);
      } else if (e.button === 2) {
        // DesktopSession.openContextMenu(e.clientX, e.clientY);
      }
    } else if (context === 'icon') {
      if (e.button === 0 && payload?.itemId) {
        DesktopSession.startIconDrag(payload.itemId, e.clientX, e.clientY);
      }
    }
  }

  handlePointerMove(e: PointerEvent) {
    if (DesktopSession.isSelecting()) {
      DesktopSession.updateSelection(e.clientX, e.clientY);
    } else if (DesktopSession.isDraggingIcon()) {
      DesktopSession.updateIconDrag(e.clientX, e.clientY);
    }
  }

  handlePointerUp(e: PointerEvent) {
    if (DesktopSession.isSelecting()) {
      DesktopSession.commitSelection();
    } else if (DesktopSession.isDraggingIcon()) {
      DesktopSession.commitIconDrag();
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    // Workspace Switching (Ctrl+1..0)
    if (e.ctrlKey) {
      const match = e.code.match(/Digit(\d)/);
      if (match) {
        const num = parseInt(match[1], 10);
        const index = num === 0 ? 9 : num - 1; // 1-9 is 0-8, 0 is 9
        WorkspaceManager.switchToWorkspaceIndex(index);
        e.preventDefault();
        return;
      }
    }
    
    // Icon navigation
    if (e.key.startsWith('Arrow')) {
      DesktopSession.navigateSelection(e.key);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      DesktopSession.executeSelected();
      e.preventDefault();
    }
  }
}

export const DesktopInputRouter = new InputRouter();

// Bind global listeners (only need to bind once, usually handled by a provider or the canvas)
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => DesktopInputRouter.handlePointerMove(e));
  window.addEventListener('pointerup', (e) => DesktopInputRouter.handlePointerUp(e));
  window.addEventListener('keydown', (e) => DesktopInputRouter.handleKeyDown(e));
}
