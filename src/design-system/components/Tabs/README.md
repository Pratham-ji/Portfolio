# Tabs

## Purpose
Used for organizing contextual content into mutually exclusive groups within an application window (e.g., Terminal tabs, Setting categories).

## Material
- Uses structural dividers `rgba(255, 255, 255, 0.05)`.
- Selected text converts to `var(--pos-color-primary)`.
- Unselected text sits at `var(--pos-color-secondary)`.
- Tab focus highlight applies `var(--pos-surface-3)`.

## Motion
- **Strictly constrained**: The blue visual indicator (`--pos-accent-interactive`) only uses `transform: translate` and `opacity` interpolation. Anime.js scale bounces are banned here to avoid visual wobble against text baselines.

## Accessibility
- Implements `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
- Uses roving tabindex natively via React state.
- Supports Arrow Keys, Home, End, Ctrl+PageUp, and Ctrl+PageDown.

## Metadata
```json
{
  "material": "System Surface",
  "motion": "Translate/Opacity Only",
  "elevation": 0,
  "accessibility": "AA",
  "since": "2.5.3"
}
```
