# CommandPalette

## Purpose
The primary global Spotlight UI of PrathamOS. Facilitates fuzzy search, command execution, and navigation.

## Architecture
- Completely decoupled UI. The `CommandPalette` component handles rendering, keyboard navigation within the list, and modal mounting.
- Uses `CommandRegistry` (singleton) for data storage and `CommandProvider` for React reactivity.
- Search logic is abstracted into `SearchEngine`.

## Material
- Consumes `<Modal>` which in turn consumes `<GlassPanel>`. Thus, it is rendered on Material 01 (Glass).

## Motion
- Inherits entry/exit physics from `<Modal>`, providing either a HERO spring scale or a fallback 120ms fade depending on OS accessibility preferences.

## Accessibility
- Implements `role="listbox"` and `role="option"`.
- Supports `ArrowUp`, `ArrowDown`, and `Enter` keydowns natively.
- Global trigger via `Cmd+K` / `Ctrl+K`.

## Metadata
```json
{
  "material": "Material 01 via Modal",
  "motion": "HERO (or 120ms fade)",
  "elevation": 4000,
  "accessibility": "AA",
  "since": "2.5.3"
}
```
