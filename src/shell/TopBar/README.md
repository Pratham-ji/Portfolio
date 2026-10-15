# TopBar

The `TopBar` component acts as the global system menu bar for PrathamOS.

## Responsibilities
- Rendering the OS identity logo.
- Displaying active workspace or active application menus.
- Displaying system status widgets (clock, battery, network, search).
- Integrating with `LayerManager` for opening dropdown menus (future implementation).

## Dependencies
- Consumes `Material Metal` for its background treatment.
- Adaptive to dark and light modes via global data-theme attributes.
- Listens to `prefers-reduced-motion` for accessibility.
