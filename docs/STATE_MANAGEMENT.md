# State Management Patterns

PrathamOS handles state using native React Context and `useReducer` to achieve predictability and high performance without relying on external libraries like Redux or Zustand.

## Core Principles

1. **Isolation by Domain:** The OS state is divided into non-overlapping domains (Apps, Windows, Files, Settings). Each domain has its own Provider.
2. **Context Stability:** We separate the `dispatch` function from the `state` object in context values when possible, or we rely on `useMemo` to ensure that consumers only re-render when their specific slices of state change.
3. **Immutability:** Reducers never mutate state directly. This guarantees that React's reconciliation engine accurately detects changes.

## State Domains

### ApplicationManager
- **State:** `registry` (Dictionary of `AppManifest` objects)
- **Responsibility:** Pure metadata. Keeps track of what apps exist, their default sizes, and their icons. Never stores UI state.

### WindowManager
- **State:** `windows` (Array), `activeWindowId` (String), `highestZIndex` (Number)
- **Responsibility:** Manages physical coordinates, z-indices, and minimized/maximized boolean flags.

### FileSystem
- **State:** `nodes` (Flat dictionary of `FileSystemNode`)
- **Responsibility:** Simulates a hierarchical file system using a flat dictionary. Every node stores its `parentId`. Deletions and additions are fast $O(1)$ operations on the dictionary.

### SettingsManager
- **State:** `settings` (Object containing theme, wallpaper, animations Enabled)
- **Responsibility:** Global variables that influence styling and accessibility.

## Avoiding Prop Drilling
By providing these contexts at the absolute root of the `App` component, any deeply nested component (such as an icon in the Taskbar) can dispatch an action (e.g., `OPEN_WINDOW`) without passing callbacks through intermediate layers.

## High-Frequency Updates
For components that update constantly (like the system Clock in the Taskbar), we strictly use **local state**. The clock updates its own internal `useState` every second. Because it doesn't dispatch to a global OS context, the rest of the Desktop and OS never re-renders when the time changes.
