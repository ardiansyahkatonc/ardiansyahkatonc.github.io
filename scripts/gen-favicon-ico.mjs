/**
 * gen-favicon-ico.mjs
 * Generates public/favicon.ico from public/favicon.svg using sharp.
 * Produces a valid ICO with 16x16 and 32x32 PNG frames.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'public', 'favicon.svg');

// Render SVG to PNG at 32x32 and 16x16
const svg = readFileSync(svgPath);

const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
const png16 = await sharp(svg).resize(16, 16).png().toBuffer();

// Build ICO manually: ICO header + directory + image data
// ICO format: https://en.wikipedia.org/wiki/ICO_(file_format)
function buildIco(images) {
  const count = images.length;
  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1=ICO
  header.writeUInt16LE(count, 4);

  // Directory entries: 16 bytes each
  const dirSize = count * 16;
  let dataOffset = 6 + dirSize;

  const dirs = [];
  const datas = [];

  for (const { png, size } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);  // width (0=256)
    entry.writeUInt8(size === 256 ? 0 : size, 1);  // height
    entry.writeUInt8(0, 2);  // color count
    entry.writeUInt8(0, 3);  // reserved
    entry.writeUInt16LE(1, 4);  // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);  // size of image data
    entry.writeUInt32LE(dataOffset, 12); // offset of image data
    dataOffset += png.length;
    dirs.push(entry);
    datas.push(png);
  }

  return Buffer.concat([header, ...dirs, ...datas]);
}

const ico = buildIco([
  { png: png32, size: 32 },
  { png: png16, size: 16 },
]);

const outPath = join(root, 'public', 'favicon.ico');
writeFileSync(outPath, ico);
console.log(`✓ favicon.ico written (${ico.length} bytes) with 32x32 + 16x16 frames`);
