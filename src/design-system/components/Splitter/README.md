# Splitter

## Purpose
A draggable boundary separating layout panels (e.g., Sidebar and Content).

## Material
- Uses a standard 1px visible line (`rgba(255, 255, 255, 0.1)`).
- Wraps inside an 8px hit target area so that precision clicking is not required.
- On hover, active, or focus, the divider immediately illuminates using `--pos-accent-interactive`.

## Motion
- No complex physics. Hover states trigger immediately (or 100ms standard CSS fade). Cursor switches to resize immediately.

## Accessibility
- Operable via Keyboard (Arrow keys, Shift+Arrow for fast steps).
- Emits `role="separator"` and `aria-orientation`.
- Accepts `aria-valuemin` and `aria-valuemax` when appropriate.

## Dependencies
- Uses global OS colors (`--pos-accent-interactive`).
