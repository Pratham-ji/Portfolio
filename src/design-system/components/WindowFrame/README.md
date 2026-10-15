# WindowFrame

## Purpose
The primary structural boundary for applications within PrathamOS.

## Material
- Uses Material 02 (Matte Aluminum).
- Rendered using the `.material-metal` global class supplemented with a local CSS Module for structural layout.

## Accessibility & Interaction
- Implements a strict 40px draggable title bar hit region.
- Contains native OS traffic light action circles which are monochrome wireframes until hovered.
- Automatically consumes `FocusManager` via `useFocus()` to claim global OS focus upon pointer down.
- Automatically consumes `LayerManager` via `useLayer()` to dynamically allocate a z-index and bump to the front of the stack upon interaction.

## Dependencies
- `useLayer` (LayerManager)
- `useFocus` (FocusManager)
