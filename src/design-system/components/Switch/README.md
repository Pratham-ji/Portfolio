# Switch

## Purpose
Primary toggle for boolean settings across the OS.

## Material
- Consumes Material Polymer (Soft Plastics).
- Tracks use `var(--pos-surface-3)`, thumbs use `var(--pos-surface-5)`.
- Rejects OS-native Green in favor of the strict `--pos-accent-interactive` blue.

## Motion
- Utilizes `springPolymer` for tactile thumb sliding and track scaling.
- Compact controls scale `.98`, Large controls scale `.96` on active press.
- Reverts to simple translation when reduced motion is detected.

## Accessibility
- Implements `role="switch"`.
- Responds natively to `Space` and `Enter` keydowns.

## Metadata
```json
{
  "material": "Material 03 (Polymer)",
  "motion": "springPolymer",
  "elevation": 0,
  "accessibility": "AA",
  "since": "2.5.3"
}
```
