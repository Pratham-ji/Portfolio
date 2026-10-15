# Notification Center

The `NotificationCenter` aggregates OS-level toast notifications and history.

## Responsibilities
- Receives notification history and groups them by application (`appId`).
- Consumes `Sidebar` design primitives for its layout.
- Controlled via `LayerManager` (mocked by window events here) to overlay the DesktopCanvas on the right side.

## Performance
The scroll area is prepped for future virtualization, rendering lightweight `.toastCard` nodes inside flex groups. Grouping logic runs in `O(N)` reducing CPU overhead during list mutations.
