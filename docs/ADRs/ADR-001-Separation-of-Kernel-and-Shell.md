# Architecture Decision Record (ADR) 001: Separation of Kernel and Shell

## Status
Accepted

## Context
In building a complex web-based desktop environment (PrathamOS), managing the state of windows, applications, settings, and files alongside complex UI logic (dragging, animations, resizing) rapidly leads to deeply coupled "spaghetti code." If UI concerns and state concerns mix, testing becomes impossible and performance degrades as state changes trigger massive UI re-renders.

## Decision
We will enforce a strict architectural boundary between the **Foundry** (state and logic) and the **Shell** (rendering and interactivity).

1. **Foundry** consists exclusively of React Contexts, reducers, and custom hooks. It manages pure JavaScript data structures.
2. **Shell** consists exclusively of presentation components (Desktop, Taskbar, WindowFrame). It consumes Foundry hooks to render UI.

## Consequences
- **Positive:** Business logic can be tested entirely independently of the DOM using Vitest.
- **Positive:** Performance optimizations can be targeted. If a window moves, only the WindowManager and that specific WindowFrame care; the Desktop does not re-render.
- **Negative:** Slightly increased boilerplate when adding new global features, as they must first be modeled in the Foundry before being rendered in the Shell.
