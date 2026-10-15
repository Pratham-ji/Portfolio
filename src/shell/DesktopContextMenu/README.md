# Desktop Context Menu

The `DesktopContextMenu` provides the right-click menu functionality for the desktop workspace.

## Responsibilities
- Intercepts global `contextmenu` events (ideally scoped to the DesktopCanvas).
- Detects viewport bounds and calculates position inversion to prevent rendering outside the screen (Viewport collision handling).
- Supports fully accessible keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
- Dispatches commands to `CommandRegistry`.
