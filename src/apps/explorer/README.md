# Explorer Application

The `Explorer` is the flagship file browser for PrathamOS.

## Architecture
- Strictly consumes the OS WindowManager, avoiding duplicate window state logic.
- Implements a custom `FSStore` simulating a file system graph.
- Uses viewport-based virtualization in `FileGrid.tsx` to easily sustain 60 FPS while displaying 100,000 files (the "Large Project" directory).
- Uses Desktop Selection Material (simulated via CSS Modules selection state).

## Registration
- Exports `ExplorerContract` to integrate directly into `ApplicationRegistry`.
