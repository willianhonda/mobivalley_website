// Generates every brand asset from one geometric definition:
// SVG logos in public/brand, favicons and app icons in app/, the Open Graph
// image, and lib/brand.generated.ts (path data used by the <Logo> component).
//
// Run with: npm run brand
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = (p) => path.join(root, p);
const font = (name) => {
  const buf = fs.readFileSync(out(`scripts/assets/${name}`));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};

export const colors = {
  ink: "#0B0D12",
  paper: "#F4F4F0",
  mint: "#34E0A1",
  mintDeep: "#0E9F6E",
};

// ---------------------------------------------------------------------------
// Symbol: a geometric M whose 45° strokes cut a valley, with a mint diamond
// (a bit, a node) resting in the notch. Every edge is vertical or 45°, so the
// diamond runs parallel to the valley walls. Drawn on a 48×48 grid.
// ---------------------------------------------------------------------------
const L = 6; // left edge
const RGT = 42; // right edge
const TOP = 7;
const BASE = 41;
const LEG = 7; // leg width
const DIAG = 9; // vertical thickness of the diagonals
const DIAMOND = 5; // half-diagonal of the diamond
const GAP = 3.5; // vertical gap between the diamond and the valley

const n = (v) => Number(v.toFixed(3));
const mid = (L + RGT) / 2;
const valley = TOP + (mid - L); // y of the upper edge of the V at the center
const innerY = TOP + DIAG + LEG; // where the inner diagonal meets a leg
const markPath =
  `M${L} ${BASE}V${TOP}L${mid} ${valley}L${RGT} ${TOP}V${BASE}H${RGT - LEG}V${innerY}` +
  `L${mid} ${valley + DIAG}L${L + LEG} ${innerY}V${BASE}Z`;
const dCy = valley - GAP - DIAMOND;
const accentPath = `M${mid} ${dCy - DIAMOND}L${mid + DIAMOND} ${dCy}L${mid} ${dCy + DIAMOND}L${mid - DIAMOND} ${dCy}Z`;
const shiftY = 24 - (TOP + BASE) / 2;

export const symbol = {
  mark: markPath,
  accent: accentPath,
  shiftY: n(shiftY),
  bounds: { x: L, y: n(TOP + shiftY), w: RGT - L, h: BASE - TOP },
};

const symbolGroup = (fg, accent) =>
  `<g transform="translate(0 ${symbol.shiftY})"><path d="${symbol.mark}" fill="${fg}"/><path d="${symbol.accent}" fill="${accent}"/></g>`;

// ---------------------------------------------------------------------------
// Wordmark: "mobivalley" set in Geist SemiBold, converted to outlines.
// ---------------------------------------------------------------------------
// opentype.js' own toPathData() can emit "NaN" for some coordinates, so the
// path commands are serialized here instead.
function pathData(commands) {
  const f = (v) => String(Math.round(v * 100) / 100);
  return commands
    .map((c) => {
      if (c.type === "M" || c.type === "L") return `${c.type}${f(c.x)} ${f(c.y)}`;
      if (c.type === "Q") return `Q${f(c.x1)} ${f(c.y1)} ${f(c.x)} ${f(c.y)}`;
      if (c.type === "C") return `C${f(c.x1)} ${f(c.y1)} ${f(c.x2)} ${f(c.y2)} ${f(c.x)} ${f(c.y)}`;
      return "Z";
    })
    .join("");
}

function textPath(f, text, size, tracking = 0) {
  let x = 0;
  const parts = [];
  const glyphs = f.stringToGlyphs(text);
  glyphs.forEach((g, i) => {
    parts.push(pathData(g.getPath(x, 0, size).commands));
    x += (g.advanceWidth / f.unitsPerEm) * size + tracking * size;
    if (i < glyphs.length - 1) x += ((f.getKerningValue(g, glyphs[i + 1]) || 0) / f.unitsPerEm) * size;
  });
  const width = x - tracking * size;
  return { d: parts.join(""), width };
}

const semibold = font("Geist-SemiBold.ttf");
const WM_SIZE = 100;
const wm = textPath(semibold, "mobivalley", WM_SIZE, -0.035);
const ascender = (semibold.tables.os2.sCapHeight / semibold.unitsPerEm) * WM_SIZE; // ≈ height of b/l
// room below the baseline for the "y" descender
const yDesc = (-semibold.tables.hhea.descender / semibold.unitsPerEm) * WM_SIZE * 0.78;

// Horizontal lockup: symbol height matches the ascender height + a touch.
function horizontal(fg, accent) {
  const symH = ascender * 1.22;
  const scale = symH / symbol.bounds.h;
  const gap = symH * 0.36;
  const symW = symbol.bounds.w * scale;
  const baseline = symH; // wordmark baseline aligned with the base of the M
  const width = symW + gap + wm.width;
  const height = baseline + yDesc;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(width)} ${n(height)}" role="img" aria-label="Mobivalley"><g transform="translate(${n(-symbol.bounds.x * scale)} ${n(-symbol.bounds.y * scale)}) scale(${n(scale)})">${symbolGroup(fg, accent)}</g><path transform="translate(${n(symW + gap)} ${n(baseline)})" d="${wm.d}" fill="${fg}"/></svg>`;
  return { svg, width, height, symW, gap, baseline, scale };
}

function stacked(fg, accent) {
  const symH = ascender * 2.6;
  const scale = symH / symbol.bounds.h;
  const symW = symbol.bounds.w * scale;
  const gap = symH * 0.34;
  const width = Math.max(symW, wm.width);
  const baseline = symH + gap + ascender;
  const height = baseline + yDesc;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(width)} ${n(height)}" role="img" aria-label="Mobivalley"><g transform="translate(${n((width - symW) / 2 - symbol.bounds.x * scale)} ${n(-symbol.bounds.y * scale)}) scale(${n(scale)})">${symbolGroup(fg, accent)}</g><path transform="translate(${n((width - wm.width) / 2)} ${n(baseline)})" d="${wm.d}" fill="${fg}"/></svg>`;
}

const symbolSvg = (fg, accent) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="Mobivalley">${symbolGroup(fg, accent)}</svg>`;

// App icon: square, full-bleed (platforms apply their own mask).
const APP_ICON_SCALE = 0.64;
const appIcon = (size = 1024, radius = 0) => {
  const s = (size / 48) * APP_ICON_SCALE;
  const off = (size - 48 * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><defs><radialGradient id="g" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="#1A1F29"/><stop offset="1" stop-color="${colors.ink}"/></radialGradient></defs><rect width="${size}" height="${size}" rx="${radius}" fill="url(#g)"/><g transform="translate(${n(off)} ${n(off)}) scale(${n(s)})">${symbolGroup(colors.paper, colors.mint)}</g></svg>`;
};

// Favicon: rounded square so it reads as a tile in browser tabs.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="${colors.ink}"/><g transform="translate(5.52 5.52) scale(.77)">${symbolGroup(colors.paper, colors.mint)}</g></svg>`;

// ICO container with embedded PNGs (supported by every modern browser).
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}

// Open Graph image (1200×630), text converted to outlines.
function ogSvg() {
  const W = 1200;
  const H = 630;
  const regular = font("Geist-Regular.ttf");
  const l1 = textPath(semibold, "Transformamos ideias", 76, -0.035);
  const l2 = textPath(semibold, "em produtos digitais.", 76, -0.035);
  const sub = textPath(regular, "Apps e produtos digitais · mobivalley.com.br", 28, -0.005);
  const logo = horizontal(colors.paper, colors.mint);
  const logoScale = 48 / logo.height;
  // contour lines echoing the site's hero background
  const lines = Array.from({ length: 9 }, (_, i) => {
    const y = 470 + i * 34;
    const depth = 150 - i * 10;
    return `<path d="M-20 ${y - depth} C 260 ${y - depth}, 420 ${y + 10}, 600 ${y + 10} S 940 ${y - depth}, 1220 ${y - depth}" fill="none" stroke="${colors.paper}" stroke-opacity="${(0.1 - i * 0.008).toFixed(3)}" stroke-width="1.5"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><radialGradient id="glow" cx="78%" cy="20%" r="60%"><stop offset="0" stop-color="${colors.mint}" stop-opacity=".16"/><stop offset="1" stop-color="${colors.mint}" stop-opacity="0"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="${colors.ink}"/><rect width="${W}" height="${H}" fill="url(#glow)"/>${lines}
<g transform="translate(80 80) scale(${n(logoScale)})">${logo.svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>
<path transform="translate(80 330)" d="${l1.d}" fill="${colors.paper}"/>
<path transform="translate(80 418)" d="${l2.d}" fill="${colors.paper}"/>
<path transform="translate(80 520)" d="${sub.d}" fill="${colors.paper}" fill-opacity=".6"/>
</svg>`;
}

// ---------------------------------------------------------------------------
async function main() {
  fs.mkdirSync(out("public/brand"), { recursive: true });
  const write = (p, c) => fs.writeFileSync(out(p), c);

  const onDark = [colors.paper, colors.mint];
  const onLight = [colors.ink, colors.mintDeep];

  write("public/brand/mobivalley-symbol-dark-bg.svg", symbolSvg(...onDark));
  write("public/brand/mobivalley-symbol-light-bg.svg", symbolSvg(...onLight));
  write("public/brand/mobivalley-logo-horizontal-dark-bg.svg", horizontal(...onDark).svg);
  write("public/brand/mobivalley-logo-horizontal-light-bg.svg", horizontal(...onLight).svg);
  write("public/brand/mobivalley-logo-stacked-dark-bg.svg", stacked(...onDark));
  write("public/brand/mobivalley-logo-stacked-light-bg.svg", stacked(...onLight));
  write("public/brand/mobivalley-app-icon.svg", appIcon(1024));
  for (const size of [1024, 512, 192]) {
    await sharp(Buffer.from(appIcon(1024)))
      .resize(size, size)
      .png()
      .toFile(out(`public/brand/mobivalley-app-icon-${size}.png`));
  }

  write("app/icon.svg", faviconSvg);
  await sharp(Buffer.from(appIcon(180))).png().toFile(out("app/apple-icon.png"));
  const icoPngs = await Promise.all(
    [16, 32, 48].map(async (size) => ({
      size,
      buf: await sharp(Buffer.from(faviconSvg), { density: 300 }).resize(size, size).png().toBuffer(),
    })),
  );
  write("app/favicon.ico", ico(icoPngs));

  await sharp(Buffer.from(ogSvg())).png().toFile(out("public/og.png"));

  const h = horizontal("currentColor", "var(--logo-accent)");
  const ts = `// Generated by scripts/build-brand.mjs. Do not edit by hand.
export const symbol = ${JSON.stringify(symbol, null, 2)} as const;

export const wordmark = {
  d: ${JSON.stringify(wm.d)},
  width: ${n(wm.width)},
} as const;

export const horizontalLockup = {
  width: ${n(h.width)},
  height: ${n(h.height)},
  symbolScale: ${n(h.scale)},
  symbolWidth: ${n(h.symW)},
  gap: ${n(h.gap)},
  baseline: ${n(h.baseline)},
} as const;
`;
  write("lib/brand.generated.ts", ts);
  console.log("brand assets written");
}

main();
