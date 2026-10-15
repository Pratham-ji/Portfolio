# Terminal Application

The `Terminal` is the developer environment for PrathamOS.

## Architecture
Strict separation of concerns is maintained:
- **Input**: `<TerminalInput />` captures user keystrokes.
- **Parser**: `TerminalParser.ts` breaks strings into colorized and styled segments (ANSI color simulation).
- **History/State**: `TerminalSessionStore.ts` stores parsed lines.
- **Renderer**: `<TerminalRenderer />` uses viewport-based virtualization to render up to 10,000 output lines while maintaining 60 FPS scrolling.

## Future Backend
The separation of the `TerminalParser` from the `TerminalRenderer` guarantees that future PTY abstraction backends can simply push ANSI strings into the parser without requiring UI changes.
