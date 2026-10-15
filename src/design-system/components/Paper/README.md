# Paper

## Purpose
A reading-optimized material surface for documents, resumes, and long-form markdown. 

## Material
- Consumes global `--pos-paper-*` design tokens, isolating its palette from the core OLED OS surfaces.
- **Dark Mode**: Warm E-Ink `#161514` background, `#E2DFD9` text.
- **Light Mode**: Stark Paper `#F7F5F2` background, `#1A1A1E` text.

## Document Modes
Instead of arbitrary styling, Paper supports strict document modes:
- `markdown`: Standard 65ch reading width.
- `resume`: A4 aspect ratio wrapper with drop shadows for physical sheet illusion.
- `blueprint`: 100% width, monospaced font family for technical docs.
- `ebook`: Enhanced line-height and font sizes.

## Accessibility
- Glare reduction via strict contrast ratios in the token palette.
- Anti-aliased font smoothing.
- Native print media queries to strip backgrounds and save ink.

## Metadata
```json
{
  "material": "Material Paper",
  "motion": "none",
  "elevation": 0,
  "accessibility": "AA",
  "since": "2.5.3"
}
```
