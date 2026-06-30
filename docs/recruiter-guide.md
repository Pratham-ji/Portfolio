# PrathamOS: An Evaluator's Guide

Welcome! If you are reviewing this repository for an engineering role (Software Engineering Internship or Full-Time Position), this guide will help you understand what you're looking at and why it was built this way.

## What is this?
PrathamOS is a portfolio disguised as an operating system. But more importantly, it is a demonstration of **senior-level engineering discipline**. 

It was built to prove that complex, state-heavy web applications can be built cleanly, predictably, and performantly using raw React and modern web standards, without relying on massive boilerplate frameworks or heavy third-party state libraries like Redux or Zustand.

## Key Engineering Achievements

As you review the codebase, please note the following self-imposed architectural constraints and how they were met:

### 1. 100% Strict TypeScript (Zero `any` Types)
Every interface, reducer, component, and payload in this repository is strictly typed. There are absolutely no `any` types used to bypass the compiler.

### 2. Zero Prop Drilling
The OS relies entirely on an architecture we call the "Foundry" (the kernel layer). The Foundry provides dedicated Context Providers for Windows, Files, Settings, and Applications. Deeply nested components interact with global state solely through custom hooks (e.g. `useWindowContext()`), eliminating prop drilling entirely.

### 3. Strict Encapsulation & File Size Limits
No component or file in this repository exceeds **250 lines of code**. Large components have been aggressively refactored into modular sub-components. Functions are kept under 40 lines. The separation of concerns is strictly enforced: the Foundry layer manages pure state (data structures) and has zero knowledge of the DOM or React UI. The Shell layer handles all the rendering.

### 4. Immutable Reducer-Driven State
All core state updates (like dragging a window, deleting a file, or modifying a system setting) are routed through pure, testable reducer functions. State is never mutated directly, ensuring perfectly predictable React reconciliations.

### 5. Accessibility by Default
The system includes:
- Global `Escape` key handling for modal/overlay teardown.
- 100% `aria-label` coverage for all interactive icon buttons.
- Dynamic responsiveness to `prefers-reduced-motion` OS-level settings, stripping complex animations for users who request reduced motion.

### 6. High Performance
Global re-renders have been prevented. For instance, the system Clock manages its own isolated state tree and does not trigger re-renders on the Taskbar or Desktop. The application utilizes lazy-loading (code-splitting via `React.lazy`) so that heavy applications (like the Terminal) are only downloaded when opened.

## Where to Look First
- **`src/core/window-manager/reducer.ts`**: To see complex immutable state transitions and z-index calculations.
- **`src/shell/window/WindowFrame.tsx`**: To see how we orchestrate framer-motion, drag controls, and window lifecycle.
- **`src/apps/contact/ContactApp.tsx`**: To see a production-ready form integrated directly with Netlify Forms, handling its own loading/success/error states without an external backend.

Thank you for taking the time to review PrathamOS!
