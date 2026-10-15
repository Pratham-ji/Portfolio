# Scrollbar

## Purpose
A custom scrolling container that abstracts away browser native scrollbars and visually adapts to the underlying operating system.

## Material
- Thumbs and tracks use pure `rgba` white values to overlay cleanly against any content.
- Windows platform variant uses `var(--pos-surface-1)` for the persistent track.

## Motion
- Opacity fades (macOS overlay behavior) use a standard 200ms `ease` transition.

## Accessibility
- Consumes the `prefers-reduced-transparency` media query. When detected, the thumb switches from semi-transparent `rgba` to solid surface tokens (`var(--pos-surface-4)`) to ensure high contrast against content.

## Dependencies
- `usePlatform`
