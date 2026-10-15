# Sidebar

## Purpose
The primary structural navigation backbone for complex applications like Explorer, Settings, and GitHub.

## Material
- Consumes Material 02 (`var(--pos-surface-2)`) for content cards and sidebars.

## Semantic Density
Instead of raw pixel widths, the sidebar operates on semantic density:
- **Compact**: 200px (macOS) / 220px (Windows)
- **Comfortable**: 260px (macOS) / 280px (Windows)
- **Expanded**: 320px (macOS) / 340px (Windows)

## Motion
- Utilizes `springMetal` for collapse/expand mechanics, providing a precise, immediate structural snap.

## Accessibility
- Emits `role="complementary"`.
- Tab trapping and Arrow navigation hooks are present for child tree-views.

## Metadata
```json
{
  "material": "Material 02",
  "motion": "springMetal",
  "elevation": 0,
  "accessibility": "AA",
  "since": "2.5.3"
}
```
