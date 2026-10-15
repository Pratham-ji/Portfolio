# Workspace Switcher

The `WorkspaceSwitcher` provides macOS Mission Control style management of virtual desktops.

## Architecture
- Actively listens for `Ctrl+ArrowUp` on the `window` to intercept the command globally.
- Implements `WorkspacePhysics.ts` to manage high performance DOM drag events for reordering preview cards.
- Offloads layout and styling to CSS modules, applying `Material Glass` properties over the desktop backdrop.

## Rendering Performance
Drag events bypass React. State is mutated strictly via direct DOM manipulation within `RenderScheduler` (CRITICAL priority). The component achieves zero `render()` cycles during drag interactions.
