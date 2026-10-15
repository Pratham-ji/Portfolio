# Quick Settings

The `QuickSettings` component mimics the macOS Control Center / Windows Action Center.

## Responsibilities
- Renders a grid of hardware and system state toggles (Wi-Fi, Bluetooth, Theme).
- Renders continuous adjustment sliders (Volume, Brightness).
- Consumes `Material Glass` design token for heavy backdrop blurring.

## Integration
- Bound to the `toggle-quick-settings` custom event, typically fired by the `StatusArea` in the `TopBar`.
- Volume adjustments emit `os-volume-change` which the `StatusArea/Volume` widget reacts to without sharing a unified context provider for performance reasons.
