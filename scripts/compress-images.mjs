#!/usr/bin/env node
/*
  scripts/compress-images.mjs

  Aggressive image compression for /public assets.
  Converts PNG / JPG sources to WebP at the smallest size that still
  looks visually clean for hero / section renders.

  Usage:
    node scripts/compress-images.mjs            # convert all PNGs in /public
    node scripts/compress-images.mjs --delete   # also delete originals after success
    node scripts/compress-images.mjs --dry      # report what would happen, no writes

  Defaults are tuned for AI-generated marketing renders (smooth gradients,
  some grain). For hard-edge UI / screenshots, raise QUALITY to ~88.
*/

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const MAX_WIDTH = 1920; // cap any oversize source; smaller images are left alone
const QUALITY = 78; // WebP quality. 78 is the sweet spot for renders.
const EFFORT = 6; // 0..6, higher = slower encode + smaller file

const args = new Set(process.argv.slice(2));
const DELETE_ORIGINALS = args.has("--delete");
const DRY_RUN = args.has("--dry");

const SOURCE_EXTS = new Set([".png", ".jpg", ".jpeg"]);

const fmtBytes = (n) => {
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(2)} MB`;
  if (n > 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${n} B`;
};

async function compressOne(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (!SOURCE_EXTS.has(ext)) return null;

  const rel = path.relative(PUBLIC_DIR, absPath);
  const out = absPath.replace(/\.(png|jpe?g)$/i, ".webp");

  const inputBytes = (await fs.stat(absPath)).size;
  const meta = await sharp(absPath).metadata();
  const targetWidth = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : meta.width;

  if (DRY_RUN) {
    return {
      rel,
      from: inputBytes,
      to: null,
      width: meta.width,
      target: targetWidth,
      out: path.relative(PUBLIC_DIR, out),
      skipped: false,
    };
  }

  let pipeline = sharp(absPath, { failOn: "none" }).rotate(); // respect EXIF
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality: QUALITY, effort: EFFORT, smartSubsample: true })
    .toFile(out);

  const outBytes = (await fs.stat(out)).size;

  if (DELETE_ORIGINALS && out !== absPath) {
    await fs.unlink(absPath);
  }

  return {
    rel,
    from: inputBytes,
    to: outBytes,
    width: meta.width,
    target: targetWidth,
    out: path.relative(PUBLIC_DIR, out),
    skipped: false,
  };
}

async function main() {
  const entries = await fs.readdir(PUBLIC_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => path.join(PUBLIC_DIR, e.name))
    .filter((p) => SOURCE_EXTS.has(path.extname(p).toLowerCase()));

  if (files.length === 0) {
    console.log("No PNG/JPG sources found in /public.");
    return;
  }

  console.log(
    `${DRY_RUN ? "DRY RUN — " : ""}compressing ${files.length} image${files.length === 1 ? "" : "s"} \u2192 WebP (q=${QUALITY}, effort=${EFFORT}, max ${MAX_WIDTH}px)\n`,
  );

  const results = [];
  for (const f of files) {
    try {
      const r = await compressOne(f);
      if (r) results.push(r);
    } catch (err) {
      console.error(`  FAILED ${path.basename(f)}:`, err.message);
    }
  }

  let totalIn = 0;
  let totalOut = 0;
  for (const r of results) {
    totalIn += r.from;
    if (r.to != null) totalOut += r.to;
    const saving =
      r.to == null ? "(dry)" : `${(((r.from - r.to) / r.from) * 100).toFixed(1)}% smaller`;
    const dim =
      r.target && r.width && r.target !== r.width
        ? `${r.width}\u2192${r.target}px`
        : `${r.width ?? "?"}px`;
    console.log(
      `  ${r.rel.padEnd(28)} ${dim.padEnd(14)} ${fmtBytes(r.from).padStart(9)} \u2192 ${
        r.to != null ? fmtBytes(r.to).padStart(9) : "      —  "
      }   ${saving}`,
    );
  }

  console.log(
    `\nTotal: ${fmtBytes(totalIn)} \u2192 ${
      DRY_RUN ? "(dry run)" : fmtBytes(totalOut)
    }${
      !DRY_RUN && totalIn > 0
        ? `  (\u2212${(((totalIn - totalOut) / totalIn) * 100).toFixed(1)}%)`
        : ""
    }`,
  );

  if (!DELETE_ORIGINALS && !DRY_RUN) {
    console.log(
      "\nOriginals kept. Re-run with `--delete` once you've updated references in lib/images.ts.",
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
