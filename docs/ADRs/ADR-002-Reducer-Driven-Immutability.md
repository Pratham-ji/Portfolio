# Architecture Decision Record (ADR) 002: Reducer-Driven Immutability

## Status
Accepted

## Context
The OS manages deeply nested and relational state. For instance, closing a window requires removing it from the `windows` array and re-calculating the active window based on z-index. Managing this with multiple `useState` hooks leads to race conditions and inconsistent renders.

## Decision
All Foundry state managers (FileSystem, WindowManager, Settings, ApplicationManager) must utilize `useReducer` to enforce immutable state transitions. Action payloads must be strictly typed.

## Consequences
- **Positive:** Complex state transitions (like `CLOSE_WINDOW` or `DELETE_NODE`) are encapsulated in pure functions that are highly testable.
- **Positive:** React's rendering lifecycle remains highly predictable.
- **Negative:** Increased verbosity (actions, types, switch statements) compared to simple setters.
