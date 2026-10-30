// Generates the PWA icons from public/icon.svg.
// Run with: node scripts/generate-icons.mjs
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile(new URL("../public/icon.svg", import.meta.url));

for (const size of [192, 512]) {
  const png = await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toBuffer();
  await writeFile(new URL(`../public/icon-${size}.png`, import.meta.url), png);
  console.log(`wrote public/icon-${size}.png`);
}
