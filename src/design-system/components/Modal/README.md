# Modal

## Purpose
A high-priority structural overlay that completely halts user progression in the underlying application until dismissed.

## Material
- The container consumes `<GlassPanel variant="dynamicContent">` ensuring Material 01 physical properties.
- Supports variants: `dialog` (center), `sheet` (bottom attached), `popover` (free-floating), and `fullscreen`.

## Motion
- Entry is handled via `springGlass` for heavy fluid settling.
- Bound to `MotionScheduler` which automatically downgrades the spring scale to a 120ms fade if the OS requests reduced motion.

## Accessibility
- Implements `role="dialog"` and `aria-modal="true"`.
- Focus is automatically trapped within the modal upon opening.
- When closed, focus is deterministically restored to the trigger element via `FocusManager`.
- Standard Escape key dismissal.

## Metadata
```json
{
  "material": "Material 01 (Glass)",
  "motion": "springGlass",
  "elevation": 4000,
  "accessibility": "AA",
  "since": "2.5.3"
}
```
