# Badge

## Purpose
A concise semantic indicator for states, tags, or counts.

## Material
- Uses structural padding and full border-radii (`var(--pos-radius-full)`).
- Colors are strictly bound to system semantic tokens. 

## Architectural Constraints
- **Brand Red Ban**: The "Error" variant strictly uses the `--pos-color-error` (System Red) and NEVER `--pos-accent-brand` (Google/Apple Brand Red), preventing brand dilution.

## Motion
- Static component.

## Accessibility
- Recommended to wrap with visually hidden screen reader text if the badge color/text does not convey full context alone.

## Dependencies
- Consumes global color variables.
