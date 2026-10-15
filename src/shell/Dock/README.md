# Dock

The `Dock` component serves as the application launcher and task switcher for PrathamOS.

## Responsibilities
- Rendering pinned and active applications.
- Displaying active state indicators (running dot).
- Managing hover magnification physics via `DockPhysics.ts`.
- Emitting `OS_LAUNCH_APP` to the `CommandRegistry`.

## Physics Engine
The magnification effect is completely uncoupled from React state. `DockPhysics.ts` uses DOM traversal and `RenderScheduler` to calculate proximity and apply hardware-accelerated CSS `transform: scale()`. This guarantees 60 FPS under load.

## Dependencies
- Consumes `Material Glass` for the container background.
- Follows the user's `prefers-reduced-motion` settings (which disables the magnification physics).
