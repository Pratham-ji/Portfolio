# Settings Application

The `Settings` application manages system configuration and preferences.

## Architecture
- Contains over 200 mock settings generated in `SettingsStore.ts`.
- `PageRenderer.tsx` handles dynamic rendering of categories or global search results.
- Zero dropped frames during filtering; `SettingsStore.search()` resolves synchronously against the in-memory array.
- Settings that require system-level changes (like `Dark Mode`) trigger `CommandRegistry.execute('OS_TOGGLE_THEME')` instead of managing their own context. This enforces the "Single Source of Truth" system policy.

## Contract
Exports `SettingsContract` linking to `ApplicationRegistry`. Disables multiple instances since only one Settings window should logically exist.
