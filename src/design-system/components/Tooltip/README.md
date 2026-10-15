# Tooltip

## Purpose
A contextual popover providing brief, transient information upon interaction.

## Material
- Represents Surface 5.
- Visually elevated using `var(--pos-shadow-ambient)`.

## Motion
- Entry uses the strict `MICRO` duration (100ms).
- Enforces an immediate appearance constraint (`delay = 0`).
- If reduced motion is requested, `MotionScheduler` automatically downgrades the entrance scaling into a rapid opacity crossfade.

## Accessibility
- Implements `role="tooltip"`.
- Appears on `focus` as well as `hover` for keyboard navigability.
- Automatically handles basic viewport edge detection when `position="auto"`.

## Dependencies
- Consumes `MotionScheduler`.
- Consumes `LayerManager` (allocates high z-index).
