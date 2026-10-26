/**
 * Canonical brand colours.
 *
 * These mirror the `--brand-*` variables in `src/app/globals.css`. Use them
 * only where CSS variables can't reach — the PWA manifest and the
 * `themeColor` metadata. For anything rendered in the page, prefer the
 * Tailwind utilities (bg-brand-red) or `var(--brand-red)`.
 *
 * The token names are kept for compatibility. `red` is the deep logo orange,
 * `gold` is the bright logo orange, and `leaf` is the logo green.
 */
export const brand = {
  red: "#c24c00",
  redDark: "#9e3d00",
  redLight: "#ff6201",
  gold: "#ff6201",
  leaf: "#5e9e23",
  leafLight: "#7cbf3f",
  leafDark: "#467a18",
  leafMist: "#eef7e4",
  ink: "#1b1b1b",
  cream: "#fff8ec",
} as const;
