# PrathamOS v2.0
An interactive, capability-driven web operating system built as a software engineering portfolio. 

## Features
- **Adaptive Shells**: Detects hardware and OS to render Windows, macOS, Linux, Tablet, or Mobile shells natively.
- **Application Registry**: Isolated apps rendered inside a virtual window manager with full z-index management.
- **Netlify Ready**: Pre-configured CI/CD deployment with serverless Netlify form integration.
- **Strictly Typed**: Built with React, TypeScript, and Framer Motion. Zero `any` types.

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```

## Architecture
PrathamOS operates on a strict `Foundry -> App -> Shell` architecture, ensuring that core business logic remains completely abstracted from the presentation layer.

## License
MIT
