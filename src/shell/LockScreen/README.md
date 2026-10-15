# Lock Screen

The `LockScreen` component provides a secure overlay blocking access to the OS until authentication is met.

## Architecture
- Binds to `os-lock` window event to re-mount.
- Disables pointer events to the underlying Desktop Canvas via an opaque overlay (`z-index: 50000`).
- Applies a 50px backdrop-filter. Because the desktop wallpaper is rendered in `DesktopCanvas` beneath the Shell layer, the lock screen inherently "sees" the wallpaper and blurs it, matching macOS aesthetics perfectly.
- "No backend" requirement is satisfied by short-circuiting the submit handler to immediately clear the lock state.
