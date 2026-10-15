# Spotlight

The `Spotlight` component acts as the system-wide command palette.

## Responsibilities
- Intercepts `Cmd+K` and `Cmd+Space` to trigger the overlay.
- Manages an accessible, glassmorphic dropdown search palette.
- Uses `SpotlightEngine.ts` to perform fuzzy matching against system indices.
- Dispatches commands directly to the `CommandRegistry`.

## Keyboard Navigation
- Arrow up / Arrow down moves the active selection.
- Enter executes the command associated with the active item.
- Escape dismisses the palette.
- Traps focus internally while open (TODO: connect to `FocusManager`).

## Performance
Zero blocking rendering. The list renders cleanly inside the virtualized `GlassPanel` boundaries without layout thrashing.
