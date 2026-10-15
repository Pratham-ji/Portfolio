# GlassPanel

## Purpose
A flexible container component that implements the Material 01 (Frosted Glass) specification from the PrathamOS Design Constitution.

## Material
- Uses `backdrop-filter: blur(20px) saturate(145%)`.
- Enforces an absolute `box-sizing: border-box` to never alter box dimensions.
- Features a pseudo-element top rim light to catch directional lighting.

## Motion
- Binds to `MotionScheduler` for press/release physics if `interactive=true`. Uses a subtle `.98` scale compression.

## Accessibility
- Interactive variants use keyboard navigable standards if combined with focus managers (though base panel is a `div`).

## Dependencies
- Consumes `MotionScheduler` for interactive scaling.
