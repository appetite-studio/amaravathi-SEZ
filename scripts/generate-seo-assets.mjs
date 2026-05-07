#!/usr/bin/env node
/*
  scripts/generate-seo-assets.mjs

  One-shot generator for SEO image assets. Re-run any time the brand or
  hero render changes:

    node scripts/generate-seo-assets.mjs

  Produces:
    public/og-default.png        1200x630, OpenGraph + Twitter card
    app/icon.png                 256x256, brutalist orange "A" favicon
    app/apple-icon.png           180x180, Apple touch icon
*/

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const HERO = path.join(ROOT, "public", "hero-image.webp");

const BRAND = {
  bg: "#FFFFFF",
  text: "#111111",
  accent: "#FF5A2A",
  border: "#111111",
  textMuted: "#667085",
};

async function ensureDir(p) {
  await fs.mkdir(path.dirname(p), { recursive: true });
}

async function generateOG() {
  const out = path.join(ROOT, "public", "og-default.png");
  await ensureDir(out);

  // Tinted hero crop as the right-hand panel.
  const heroPanel = await sharp(HERO)
    .resize({ width: 720, height: 630, fit: "cover", position: "centre" })
    .modulate({ saturation: 0.92 })
    .toBuffer();

  // SVG composition: brutalist white panel on the left, hero on the right.
  const svg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="${BRAND.bg}"/>
      <rect x="0" y="0" width="480" height="630" fill="${BRAND.bg}"/>

      <!-- Hard 4px black frame around the whole card -->
      <rect x="2" y="2" width="1196" height="626" fill="none" stroke="${BRAND.border}" stroke-width="4"/>

      <!-- Top label strip -->
      <text x="56" y="84" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="3" fill="${BRAND.textMuted}" font-weight="700">[ AMARAVATI · STARTUP CAPITAL ]</text>

      <!-- Display headline -->
      <text x="56" y="220" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="56" font-weight="800" fill="${BRAND.text}" letter-spacing="-1">Build a startup</text>
      <text x="56" y="284" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="56" font-weight="800" fill="${BRAND.text}" letter-spacing="-1">from</text>
      <text x="220" y="284" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="56" font-weight="800" fill="${BRAND.accent}" letter-spacing="-1">Amaravati.</text>

      <!-- Sub copy -->
      <text x="56" y="352" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif" font-size="20" fill="${BRAND.textMuted}">Founder-first operating system for the</text>
      <text x="56" y="382" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif" font-size="20" fill="${BRAND.textMuted}">Amaravati startup district, Andhra Pradesh.</text>

      <!-- Bottom orange CTA strip -->
      <rect x="56" y="498" width="368" height="60" fill="${BRAND.accent}"/>
      <text x="80" y="536" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="16" letter-spacing="3" fill="${BRAND.bg}" font-weight="800">APPLY FOR RESIDENCY  →</text>

      <!-- Footer co-ordinate row, mirrors the in-product axis row -->
      <line x1="56" y1="584" x2="424" y2="584" stroke="${BRAND.border}" stroke-width="2"/>
      <text x="56" y="608" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" letter-spacing="3" fill="${BRAND.textMuted}">16.516 N</text>
      <text x="200" y="608" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" letter-spacing="3" fill="${BRAND.text}">DISTRICT 01 · SECTOR A</text>
      <text x="380" y="608" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" letter-spacing="3" fill="${BRAND.textMuted}">80.518 E</text>

      <!-- Vertical divider between text panel and hero -->
      <line x1="480" y1="0" x2="480" y2="630" stroke="${BRAND.border}" stroke-width="4"/>
    </svg>
  `);

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: BRAND.bg },
  })
    .composite([
      { input: heroPanel, left: 480, top: 0 },
      { input: svg, left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9, quality: 92 })
    .toFile(out);

  const stat = await fs.stat(out);
  return { out: path.relative(ROOT, out), bytes: stat.size };
}

async function generateFavicon(size, outPath) {
  const out = path.join(ROOT, outPath);
  await ensureDir(out);

  const svg = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${BRAND.accent}"/>
      <rect x="6" y="6" width="${size - 12}" height="${size - 12}" fill="none" stroke="${BRAND.border}" stroke-width="6"/>
      <text x="50%" y="50%"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
            font-size="${Math.round(size * 0.62)}"
            font-weight="900"
            fill="${BRAND.bg}"
            letter-spacing="-2">A</text>
    </svg>
  `);

  await sharp(svg).png({ compressionLevel: 9 }).toFile(out);
  const stat = await fs.stat(out);
  return { out: path.relative(ROOT, out), bytes: stat.size };
}

async function main() {
  const fmt = (n) =>
    n > 1024 * 1024
      ? `${(n / 1024 / 1024).toFixed(2)} MB`
      : `${(n / 1024).toFixed(1)} KB`;

  console.log("Generating SEO assets…\n");

  const og = await generateOG();
  console.log(`  ${og.out.padEnd(34)} ${fmt(og.bytes).padStart(10)}  (1200x630)`);

  const icon = await generateFavicon(256, "app/icon.png");
  console.log(`  ${icon.out.padEnd(34)} ${fmt(icon.bytes).padStart(10)}  (256x256)`);

  const apple = await generateFavicon(180, "app/apple-icon.png");
  console.log(`  ${apple.out.padEnd(34)} ${fmt(apple.bytes).padStart(10)}  (180x180)`);

  console.log("\nDone. Reference these in app/layout.tsx metadata.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
