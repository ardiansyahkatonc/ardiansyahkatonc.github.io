/**
 * gen-favicon-all.mjs
 * Renders the official kat.on logo (katon-full.svg) into all favicon assets:
 *   - public/favicon.svg   (SVG with embedded PNG for browser-tab use)
 *   - public/favicon.ico   (32x32 + 16x16 ICO)
 *   - public/apple-touch-icon.png (180x180, dark background)
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const logoPath = join(root, 'public', 'brand', 'katon', 'logo', 'katon-full.svg');
const logoBuf = readFileSync(logoPath);

// ─── 1. Render logo to PNG sizes ──────────────────────────────────────────────
const png512 = await sharp(logoBuf).resize(512, 512).png().toBuffer();
const png180 = await sharp(logoBuf).resize(180, 180).png().toBuffer();
const png32  = await sharp(logoBuf).resize(32,  32 ).png().toBuffer();
const png16  = await sharp(logoBuf).resize(16,  16 ).png().toBuffer();

// ─── 2. favicon.svg — SVG wrapper embedding the 32px PNG as base64 ───────────
// Modern browsers load rel="icon" SVGs; embedding the PNG ensures pixel-perfect
// rendering at small sizes without the complexity of the full 231 KB SVG.
const b64_32 = png32.toString('base64');
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="32" height="32">
  <image width="32" height="32" xlink:href="data:image/png;base64,${b64_32}"/>
</svg>
`;
writeFileSync(join(root, 'public', 'favicon.svg'), faviconSvg);
console.log('✓ favicon.svg written (embedded 32px PNG)');

// ─── 3. favicon.ico — 2-frame ICO (32x32 + 16x16) ───────────────────────────
function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const dirSize = count * 16;
  let dataOffset = 6 + dirSize;
  const dirs = [], datas = [];
  for (const { png, size } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(dataOffset, 12);
    dataOffset += png.length;
    dirs.push(entry);
    datas.push(png);
  }
  return Buffer.concat([header, ...dirs, ...datas]);
}
const ico = buildIco([{ png: png32, size: 32 }, { png: png16, size: 16 }]);
writeFileSync(join(root, 'public', 'favicon.ico'), ico);
writeFileSync(join(root, 'public', 'brand', 'katon', 'favicon', 'favicon.ico'), ico);
console.log(`✓ favicon.ico written (${ico.length} bytes, 32x32 + 16x16)`);

// ─── 4. apple-touch-icon.png — 180x180 on dark background ────────────────────
const bg = { create: { width: 180, height: 180, channels: 4, background: { r: 11, g: 17, b: 32, alpha: 1 } } };
const ati = await sharp(bg)
  .composite([{ input: png180, gravity: 'centre' }])
  .png()
  .toBuffer();
writeFileSync(join(root, 'public', 'apple-touch-icon.png'), ati);
console.log(`✓ apple-touch-icon.png written (${ati.length} bytes, 180x180)`);

// ─── 5. brand/katon/favicon/apple-touch-icon — update too ────────────────────
const atiSvgPath = join(root, 'public', 'brand', 'katon', 'favicon', 'apple-touch-icon.svg');
writeFileSync(atiSvgPath, faviconSvg); // keep the SVG variant in sync
console.log('✓ brand/katon/favicon/ synced');
