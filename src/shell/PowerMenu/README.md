# Power Menu

The `PowerMenu` represents the primary OS control dropdown typically accessed via the logo in the `TopBar`.

## Responsibilities
- Rendering OS-level commands (Sleep, Restart, Shutdown, Lock, Log out).
- Strict adherence to the directive: "Dispatches commands only." No state modifications exist in this component aside from closing itself. It delegates everything to the global event bus / `CommandRegistry`.
- Positioned statically relative to the top left screen corner (below the TopBar).
