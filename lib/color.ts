/** Lighten #rrggbb by amount 0–1 */
export function lighten(hex: string, amount = 0.1): string {
  const n = parseInt(hex.replace("#", ""), 16);
  let r = (n >> 16) & 0xff;
  let g = (n >> 8) & 0xff;
  let b = n & 0xff;
  r = Math.round(r + (255 - r) * amount);
  g = Math.round(g + (255 - g) * amount);
  b = Math.round(b + (255 - b) * amount);
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
