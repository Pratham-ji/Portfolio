# Avatar

## Purpose
A visual representation of a user or system entity.

## Material
- Implements **Material 09 (Photo)**.
- Strict architectural ban on CSS filters, gradients, or drop shadows to maintain absolute color fidelity of the underlying raster image.
- Image element strictly uses `object-fit: cover`.

## Motion
- Static component. Inherits motion properties if wrapped inside an interactive container, but possesses no intrinsic animation physics.

## Accessibility
- Implements `alt` attributes for screen readers.
- Exposes `aria-label` automatically on status badges to announce user presence states (e.g., "User is online").
- Silently degrades to text initials or SVG fallback on image load failure.

## Dependencies
- Does not strictly require global singletons, but consumes core OS color tokens for fallbacks and badges.
