# Status Area

The `StatusArea` is an aggregate container of independent OS widgets.

## Architecture
Each widget (Clock, Battery, Wi-Fi, Bluetooth, Volume, Theme) manages its own isolated state. This satisfies the requirement that "Each widget isolated. No shared rerenders."

When the battery ticks down or the clock updates every minute, *only* that component rerenders, preventing the entire TopBar from reconciling.

## Integration
The `StatusArea` is meant to be consumed by the right section of the `TopBar` and potentially `ControlCenter` for mirrored data.
