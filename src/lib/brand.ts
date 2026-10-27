/**
 * Canonical brand colours.
 *
 * These mirror the `--brand-*` variables in `src/app/globals.css`. Use them
 * only where CSS variables can't reach: the PWA manifest and the
 * `themeColor` metadata. For anything rendered in the page, prefer the
 * Tailwind utilities (bg-brand-red) or `var(--brand-red)`.
 *
 * The token names are kept for compatibility. `red` is the dark logo red,
 * `gold` is the light logo orange, and `leaf` is mapped to the light orange.
 */
export const brand = {
  red: "#ed2b36",
  redDark: "#c41f2a",
  redLight: "#fe8302",
  gold: "#fe8302",
  leaf: "#fe8302",
  leafLight: "#ffa24a",
  leafDark: "#a95400",
  leafMist: "#fff0e2",
  ink: "#1b1b1b",
  cream: "#fff8ec",
} as const;
