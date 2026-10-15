# Boot Sequence

The `BootSequence` runs once when the OS mounts.

## Responsibilities
- Acts as a top-level suspense boundary visually covering the screen (`z-index: 99999`).
- In a production build, it ties into `window.onload` or a specialized asset loader context instead of fake timeouts.
- Uses hardware-accelerated `transform: scaleX` for progress, adhering to HERO timing guidelines to transition smoothly directly to the `DesktopCanvas` upon unmount.
