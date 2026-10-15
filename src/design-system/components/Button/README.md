# Button

## Purpose
A tactile primitive for triggering actions, strictly adhering to the Material 03 (Soft Polymer) specification.

## Material
- `secondary` variants implement the global `.material-polymer` class.
- All variants have precise styling managed via `Button.module.css`.

## Motion
- Utilizes `MotionScheduler` to apply scaling physics on press.
- Regular buttons scale to `.96`.
- Compact controls (`toolbar` and `icon` variants) scale to `.98` to prevent feeling disconnected.
- If the `AccessibilityProvider` detects `prefers-reduced-motion`, the `MotionScheduler` automatically downgrades these scales into subtle opacity crossfades without needing manual checks in this component.

## Accessibility
- Enforces a 44x44px minimum touch target size via CSS `@media (pointer: coarse)`.
- Minimum desktop height is 28px.
- Focus ring explicitly overrides defaults to `outline: 2px solid var(--pos-accent-interactive)` with a 2px offset.
- Emits `aria-busy` when `isLoading` is true.

## Dependencies
- Consumes `MotionScheduler` and `MaterialSprings`.
