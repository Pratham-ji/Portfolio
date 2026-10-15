# Toast

## Purpose
A non-blocking global notification system conveying semantic status updates to the user.

## Material
- Consumes `<GlassPanel variant="dynamicContent">` ensuring Material 01 rules.

## Motion
- Entrance triggers `springGlass` (Heavy, fluid settling).
- Exit triggers `easeOutQuad` for rapid dismissal.
- Fully compatible with `MotionScheduler` reduced motion downgrades.

## Accessibility
- Implements `role="status"` and `aria-live="polite"` on the `<ToastContainer />` wrapping region.
- Follows maximum queue architecture (MAX_VISIBLE=3) to prevent screen reader overflow or visual clutter.

## Dependencies
- `<GlassPanel />`
- `LayerManager` (Very high z-index allocation)
- `MotionScheduler`
- `AccessibilityProvider` (consumed transparently via MotionScheduler)
