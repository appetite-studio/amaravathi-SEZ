# Image Compression

1. Drop new `.png` / `.jpg` / `.jpeg` files into `public/`.
2. Run `npm run compress:images` — converts to `.webp` (q=78, max 1920px, ~90% smaller) alongside originals.
3. Update the matching constant in `lib/images.ts` to point at the new `.webp` filename.
4. Run `npm run compress:images:delete` to remove the original PNG/JPG sources.
5. Commit the `.webp` files; Next.js handles per-device AVIF/WebP variants automatically via `next.config.ts`.
