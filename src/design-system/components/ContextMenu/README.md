# ContextMenu

## Purpose
A transient popup menu triggered by secondary actions (right-click) providing contextual actions for the OS.

## Material
- Consumes `<GlassPanel />` directly to enforce Material 01 (Frosted Glass).

## Motion
- Standard `QUICK` appearance with subtle scaling (`.95` to `1`).
- Governed by `MotionScheduler` for accessibility downgrades.

## Accessibility
- Implements `role="menu"`, `role="menuitem"`, and `role="separator"`.
- Focus Trapping: When opened, global focus transfers to the menu. The previous focus is restored on close using `FocusManager`.
- Keyboard Navigation: Arrow Up/Down traverses items. Enter selects. Escape dismisses.
- Screen Edge Collision: Automatically nudges itself back into the viewport if opened near an edge.

## Dependencies
- `<GlassPanel />`
- `useLayer` (LayerManager)
- `useFocus` (FocusManager)
- `MotionScheduler`
