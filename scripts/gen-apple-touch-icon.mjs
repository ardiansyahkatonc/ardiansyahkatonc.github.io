/**
 * gen-apple-touch-icon.mjs
 * Generates public/apple-touch-icon.png (180x180) from public/favicon.svg.
 * Uses a dark background (#0B1120) with the kat.on mark in white, which
 * matches the site's dark theme and provides great contrast on iOS.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'public', 'favicon.svg');

const svgSrc = readFileSync(svgPath, 'utf8');

// The favicon.svg uses fill:#000 / dark-mode:#fff
// For apple-touch-icon we want white mark on dark background.
// Force fill to white for the icon mark.
const svgForced = svgSrc
  .replace(/path \{ fill: #000; \}/, 'path { fill: #FFF; }')
  .replace(/@media \(prefers-color-scheme: dark\) \{[\s\S]*?\}/, '');

const svgBuf = Buffer.from(svgForced);

// 1. Render mark at ~140px (leaving padding inside 180px canvas)
const markPng = await sharp(svgBuf)
  .resize(120, 120)
  .png()
  .toBuffer();

// 2. Create 180x180 dark background
const bg = {
  create: {
    width: 180,
    height: 180,
    channels: 4,
    background: { r: 11, g: 17, b: 32, alpha: 1 }, // #0B1120
  },
};

const result = await sharp(bg)
  .composite([{ input: markPng, gravity: 'centre' }])
  .png()
  .toBuffer();

const outPath = join(root, 'public', 'apple-touch-icon.png');
writeFileSync(outPath, result);
console.log(`✓ apple-touch-icon.png written (${result.length} bytes, 180x180)`);
