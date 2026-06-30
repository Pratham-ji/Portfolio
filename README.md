# PrathamOS

> An engineering showcase built as a fully functional, desktop-like environment inside the browser.

![PrathamOS Desktop](./docs/assets/desktop-preview.png)

PrathamOS is designed to demonstrate the application of modern software engineering principles—including modular architecture, maintainability, accessibility, security, performance, and scalability—within a cohesive desktop environment built entirely with web technologies.

## Core Philosophy

"Architecture is the contract. Implementation is its realization."

1. **Zero Prop Drilling**: 100% Context-driven state architecture.
2. **Strict Encapsulation**: Complete separation between Foundry (Kernel), Shell (UI/Windowing), and User Space (Apps).
3. **Immutability First**: All core state mutations are handled via pure reducers.
4. **Performance by Default**: Rigorous code-splitting, lazy-loading, and isolation of high-frequency renders (e.g., system clock).
5. **Accessibility**: Full keyboard navigability, screen-reader support, and dynamic `prefers-reduced-motion` integration.

## Architecture

PrathamOS implements a microkernel-inspired design:

- **Foundry**: The invisible OS kernel. Manages File System, Applications, Windows, and Settings state.
- **Shell**: The visual operating environment. Renders the Desktop, Taskbar, Start Menu, and Window Manager.
- **User Space**: Isolated React components functioning as applications. Apps only interact with the system via standard Foundry Context Hooks.

See the [Architecture Documentation](./docs/ARCHITECTURE.md) for full details.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + Playwright

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run test suite
npm run test

# Run e2e tests
npx playwright test

# Build for production
npm run build
```

## Features

- Fully interactive Window Management (Drag, resize, minimize, maximize, stack ordering)
- Persistent File System emulation
- Extensible App Registry
- Real-time settings sync across the OS
- Accessible Start Menu and Taskbar
- Real Netlify Forms powered Contact integration

## Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [State Management Patterns](./docs/STATE_MANAGEMENT.md)
- [Architecture Decision Records (ADRs)](./docs/ADRs/)

---
*Designed & Engineered by Pratham*
