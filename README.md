# Amaravati Startup Capital — Investor Prototype

A cinematic, frontend-only prototype of a digital operating system for a
founder-first startup district inside Amaravati, Andhra Pradesh.

This is **not** a SaaS product. It is a **visual concept demo** built for an
investor video walkthrough.

- Stack: Next.js 16 App Router · React 19 · TypeScript · Tailwind v4 · shadcn-style primitives · Framer Motion · Lucide · qrcode.react
- State: `localStorage` only — no backend, no database, no auth server
- Style: Brutalist registry / Próspera governance portal — see [`brand.md`](brand.md) and [`style.md`](style.md)

## Run

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project layout

```
app/
  (marketing)/         # public site
    layout.tsx         # marketing nav + footer
    page.tsx           # / — landing
    login/page.tsx     # /login — fake auth, writes to localStorage
  app/                 # authenticated console
    layout.tsx         # app shell wrapper (top bar + metrics strip + page transitions)
    page.tsx           # /app → redirects to /app/identity
    identity/page.tsx  # /app/identity — residency permit + compliance
    community/page.tsx # /app/community — channels + feed + notifications
    tools/page.tsx     # /app/tools — 13-card grid + cohort hero
    district/page.tsx  # /app/district — live KPI dashboard
components/            # all UI primitives + page-level components
data/                  # all mock JSON
lib/
  data.ts              # typed re-exports of the JSON
  store.ts             # SSR-safe localStorage hooks
  simulate.ts          # 400–900ms fake loaders for CTAs
  images.ts            # centralised Unsplash placeholder URLs
brand.md               # brand tokens
style.md               # original style guide
my-plan.md             # original product brief
```

## Image placeholders

Every photo loads from a curated Unsplash URL declared in
[`lib/images.ts`](lib/images.ts). To swap any asset for a final one, change a
single constant. Each `<Image />` is annotated with
`// PLACEHOLDER: replace with final asset` so the swap point is greppable.

## Recording script · 30–45 second walkthrough

Open the browser at `http://localhost:3000` in fullscreen with the chrome bar
hidden. Record at 1920×1080 or higher.

| t (s) | Path                | What to do                                                                         |
| ----- | ------------------- | ---------------------------------------------------------------------------------- |
| 0–3   | `/`                 | Land on hero. Headline animates in. Stats strip count-ups under the fold.          |
| 3–6   | `/`                 | Slow scroll past the residency / incorporation / cohorts panels.                   |
| 6–9   | `/`                 | Stop briefly at the dark "Apply for residency" final CTA.                          |
| 9–10  | `/login`            | Click `Apply for residency`. Login screen appears.                                 |
| 10–13 | `/login`            | Tab into `Founder`, identity is prefilled, click `Continue`. Loader shows.         |
| 13–18 | `/app/identity`     | Land on the residency permit. Highlight QR + compliance + score cards.             |
| 18–22 | `/app/community`    | Click `Community`. Feed scrolls. Open the inbox sheet via the bell icon.           |
| 22–28 | `/app/tools`        | Click `Tools`. Hover the 13-card grid. Open `Apply for residency` modal, submit. Toast fires. |
| 28–34 | `/app/district`     | Click `District`. KPI count-ups animate. Map hotspots pulse. Category bars fill.   |
| 34–45 | `/app/district`     | Slow zoom on the live activity feed. End on the orange `LIVE · STREAMING` pill.    |

The walkthrough should answer one question:

> "This could become real."

## Notes for editors

- Demo identity is `Diya Rajiv · Founder · Neon AI`. Edit
  [`data/founder.json`](data/founder.json) to change.
- All numbers come from [`data/metrics.json`](data/metrics.json) and the brief:
  127 founders, 42 startups, 318 AP jobs, ₹8.4 Cr projected, 14 events.
- Force light theme; no dark mode toggle (keeps the recording consistent).
- To wipe the demo session: open DevTools → Application → Local Storage →
  delete the `asc.session` key, or click the logout icon in the top bar.
