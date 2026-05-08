# Gov Preview · District Administration Console

The cross-tenant administrative oversight surface for Amaravati Startup Capital, framed as the **Department of IT, Government of Andhra Pradesh**. It mirrors the Company Portal's brutalist visual language but inverts the scope — the company sees its own world, the government sees the entire ecosystem.

This document captures every feature, every data point, every interaction, and every piece of copy currently shipped in the Gov Preview as a single living spec.

## How you reach it

1. From [/login](http://localhost:3000/login) → click **GOVT PREVIEW** tab.
2. Identity preview reads `DEPT. OF IT · GOVT PREVIEW · PREFILLED`.
3. CONTINUE → routes to `/govt/overview`.
4. Auth guard inside [components/portal-shell/portal-shell.tsx](components/portal-shell/portal-shell.tsx) asserts `session.role === "Government"` — anyone else is bounced to `/login`.

## Routing surface

| Route             | Behaviour                                                |
| ----------------- | -------------------------------------------------------- |
| `/govt`           | Server-side redirect to `/govt/overview`.                |
| `/govt/overview`  | The single console page. Anchor-linked sections live in this page (`#companies`, `#approvals`, `#founders`, `#activity`). |

The sidebar items render as anchor links into the same page, so navigation feels operational without requiring 5 separate routes.

## Shell · Visual language

Reuses the shared `components/portal-shell/*` components in **`variant="govt"`** mode. Same brutalist tokens as the Company Portal: 2px black borders, `--accent` orange highlights only on key numbers + active states, Geist Mono labels with `0.18em` to `0.22em` tracking, white background, hard hierarchy, `hover-brutal` offset shadow. Nothing is rounded.

### Sidebar (260px sticky)

Header reads:

> AMARAVATI · ASC
> DISTRICT ADMINISTRATION

Section eyebrow:

> [ ADMIN NAVIGATION ]

Items:

- DISTRICT OVERVIEW → `/govt/overview`
- ALL COMPANIES → `/govt/overview#companies`
- ALL FOUNDERS → `/govt/overview#founders`
- RESIDENCY APPROVALS → `/govt/overview#approvals`
- OPERATIONAL ACTIVITY → `/govt/overview#activity`

Footer block:

- POLICY · LEGAL DESK · SUPPORT NODE · DISTRICT STATUS
- Live indicator: `· DISTRICT 01 · OPERATIONAL` with a pulsing orange dot
- Coordinates: `16.516° N · 80.518° E`

### Topbar (slim, white)

Left:

- Eyebrow: `[ DISTRICT ADMINISTRATION · OVERSIGHT ]`
- Title: `District Administration`
- Meta: `DEPT. OF IT · GOVT OF ANDHRA PRADESH · 2026`

Right:

- Search input — placeholder `SEARCH ECOSYSTEM`
- Bell icon with orange dot
- User chip — `Department of IT, AP · GOVT PREVIEW · ECOSYSTEM`
- Logout button (clears session, returns to `/`)

### Top metrics strip (dark)

Five district-wide numbers, count-up animated. Highlighted in `--accent`:

- **127** FOUNDERS *(highlight)*
- **42** STARTUPS
- **318** AP JOBS
- **91%** COMPLIANCE
- **₹8.4 CR** ACTIVITY

Lives in [components/portal-shell/portal-metrics-bar.tsx](components/portal-shell/portal-metrics-bar.tsx).

## Page header

```
[ DISTRICT ADMINISTRATION · ECOSYSTEM OVERSIGHT ]
District Administration Console

Cross-tenant view of every company, founder, residency
application, and operational signal inside Amaravati
Startup Capital · District 01. Department of IT,
Government of Andhra Pradesh.
```

Trailing pills:

- `LIVE · ECOSYSTEM` (pulsing)
- `DEPT. OF IT · AP`

## Sections (in scroll order)

### 1 · District-wide aggregates

Eyebrow: `[ DISTRICT-WIDE AGGREGATES ]`

A 6-column KPI grid wrapped in a 2px black border. All values are static demo numbers — they reinforce the operational scale without any backend.

| Label          | Value     | Delta                    | Highlight |
| -------------- | --------- | ------------------------ | --------- |
| FOUNDERS       | 127       | +12 this week            | Orange    |
| STARTUPS       | 42        | +4 this week             | —         |
| ACTIVE PERMITS | 318       | 9-day avg processing     | —         |
| AP JOBS        | 318       | 91% local                | —         |
| COMPLIANCE     | 91%       | all tenants verified     | —         |
| ACTIVITY       | ₹8.4 CR   | projected · Q1           | —         |

### 2 · All Companies — cross-tenant view

Anchor: `#companies`

Eyebrow: `[ ALL COMPANIES · CROSS-TENANT VIEW ]`
Title: `5 registered companies · sorted by hiring %`
Trailing action: **EXPORT REGISTRY** secondary button (decorative).

A registry-style table with a dark header row and 7 columns:

`COMPANY · CIN | SECTOR | TIER | FOUNDERS | HEADCOUNT | LOCAL HIRING | STATUS`

Each row stagger-fades in (60ms apart). Local hiring renders as a `<Progress>` bar plus tabular percent. Status is a green outlined `OPERATIONAL` pill.

The 5 seeded companies (lives inline in [app/govt/overview/page.tsx](app/govt/overview/page.tsx)):

| Company                | CIN              | Sector             | Tier    | Founders | Headcount | Hiring | Status      |
| ---------------------- | ---------------- | ------------------ | ------- | -------- | --------- | ------ | ----------- |
| Neon AI Systems        | ASC-COMP-2041    | AI Infrastructure  | Tier I  | 4        | 14        | 84%    | Operational |
| AIM States Labs        | ASC-COMP-2042    | GovTech            | Tier II | 3        | 11        | 76%    | Operational |
| Quantum Valley Systems | ASC-COMP-2055    | Quantum / Robotics | Tier I  | 5        | 19        | 91%    | Operational |
| Saral Health           | ASC-COMP-2068    | BioTech            | Tier II | 2        | 7         | 86%    | Operational |
| Krish Mobility         | ASC-COMP-2074    | Robotics           | Tier II | 3        | 9         | 78%    | Operational |

### 3 · Residency Approvals — inbound queue

Anchor: `#approvals`

Eyebrow: `[ RESIDENCY APPROVALS · INBOUND QUEUE ]`
Title: `8 applications · awaiting district registrar`

Trailing counter pills (live):

- `N APPROVED` — green
- `N REVIEW` — warning
- `N PENDING` — orange

This is the **signature interactive moment of the entire Gov Preview**. The state of every application persists to `localStorage` under the key `asc.govt.approvals` via the `useLocalState` hook in [lib/store.ts](lib/store.ts).

Each application row is a 2-column card (information + action) with:

- Applicant name (display heading) + `APPLICANT · APP-2026-0XXX`
- Origin city/country
- APPLYING WITH (target company)
- PERMIT TYPE (Founder Residency / Visiting Researcher)
- SUBMITTED date
- DOCUMENTS (e.g. `4 of 6`)
- Current status pill (color-coded by status)

#### Actions

| Status            | Button(s)                                  | Effect on click                                                            |
| ----------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| `PENDING DOCS`    | **APPROVE** (primary), **REQUEST** (secondary) | Approve flips status to `APPROVED`. Request keeps it at `PENDING DOCS`.    |
| `UNDER REVIEW`    | **APPROVE**, **REQUEST**                   | Same as above.                                                             |
| `APPROVED`        | **REVERT TO REVIEW**                       | Flips status back to `UNDER REVIEW`. Useful for re-running the demo.       |

When a row flips to `APPROVED`, the card gains a 2px orange ring (`ring-2 ring-[var(--accent)]`) — a visible "just approved" beat that lets the demo viewer immediately see the state change. Counters at the top recompute live.

#### Seeded applications

Source: [data/portal-approvals.json](data/portal-approvals.json)

| ID            | Applicant       | Company                | Type                | Origin            | Submitted   | Docs   | Default status |
| ------------- | --------------- | ---------------------- | ------------------- | ----------------- | ----------- | ------ | -------------- |
| APP-2026-0184 | Rohan Singh     | Neon AI Systems        | Founder Residency   | Bengaluru, IN     | 08 Apr 2026 | 4 of 6 | PENDING DOCS   |
| APP-2026-0186 | Mei-Ling Chen   | Quantum Valley Systems | Visiting Researcher | Hsinchu, TW       | 07 Apr 2026 | 6 of 6 | UNDER REVIEW   |
| APP-2026-0188 | Jovan Petrović  | Tundra Ledger          | Founder Residency   | Belgrade, RS      | 06 Apr 2026 | 6 of 6 | UNDER REVIEW   |
| APP-2026-0192 | Annika Vogt     | Polar Quantum          | Visiting Researcher | Munich, DE        | 05 Apr 2026 | 6 of 6 | APPROVED       |
| APP-2026-0193 | Tanvi Joshi     | Andhra Civic           | Founder Residency   | Vijayawada, AP    | 05 Apr 2026 | 6 of 6 | APPROVED       |
| APP-2026-0197 | Ifeoma Okoye    | Lattice Climate        | Founder Residency   | Lagos, NG         | 03 Apr 2026 | 5 of 6 | PENDING DOCS   |
| APP-2026-0201 | Vivaan Khanna   | Tarani BioWorks        | Founder Residency   | Chennai, IN       | 02 Apr 2026 | 6 of 6 | UNDER REVIEW   |
| APP-2026-0205 | Sara Khalil     | Hex Civic              | Visiting Researcher | Cairo, EG         | 01 Apr 2026 | 6 of 6 | APPROVED       |

Defaults: 3 APPROVED · 3 UNDER REVIEW · 2 PENDING DOCS.

### 4 · All Founders — district census

Anchor: `#founders`

Eyebrow: `[ ALL FOUNDERS · DISTRICT CENSUS ]`
Title: `24 founders across 5 companies`
Trailing meta: `CROSS-TENANT VIEW`

Reads from [data/portal-directory.json](data/portal-directory.json) — the same source the Company Portal's `/company/directory` page uses. Renders the **first 10 entries** as a table; a meta caption underneath reads `+ 14 MORE FOUNDERS`.

Columns: `FOUNDER (name + city) | COMPANY | SECTOR | STATUS | ROLE | SCORE`

Score column highlighted in orange. Status column rendered in `--success` green for visual heft. Hover reveals a subtle row tint (`#FAFAFB`).

### 5 · Operational Activity — district-wide stream

Anchor: `#activity`

Eyebrow: `[ OPERATIONAL ACTIVITY · DISTRICT-WIDE ]`
Title: `Live feed across every tenant`
Trailing: `STREAMING` indicator with a pulsing orange dot and an `Activity` icon.

A 2-column grid (1-column on mobile) showing the full operational feed. Reads from [data/portal-activity.json](data/portal-activity.json) — 12 entries.

Each entry shows:

- Top row: kind label (orange) + timestamp (muted)
- Body: 1-line operational message in mono

#### Activity kinds wired up

| Kind        | Description                                     |
| ----------- | ----------------------------------------------- |
| FOUNDER     | Onboarding / arrivals                           |
| WORKSPACE   | Room reservations, lab maintenance, allocations |
| COMPLIANCE  | Q1 reports, hiring %, verifications             |
| POLICY      | DPIIT filings, tax incentives, applications     |
| EVENT       | District events with attendance                 |
| HIRE        | New AP-resident hires onboarded                 |
| FINANCE     | Disbursements, Skills Fund                      |
| RESIDENCY   | Permit reviews, applications                    |

Examples currently live:

- `Priya Nair joined Tower B · Level 12` — FOUNDER · 2m ago
- `Pitch Room reserved · 16:30 IST` — WORKSPACE · 9m ago
- `Q1 compliance report verified · 84%` — COMPLIANCE · 14m ago
- `Tax incentive filing accepted by DPIIT` — POLICY · 32m ago
- `Investor AMA · 142 attendees confirmed` — EVENT · 1h ago
- `Tejaswi Bandari onboarded · IIIT Sri City` — HIRE · 1h ago
- `Skills Fund disbursement · ₹4.80L` — FINANCE · 2h ago
- `Rohan Singh · residency under review` — RESIDENCY · 3h ago
- `Lab (GPU) maintenance scheduled · 09:00 IST` — WORKSPACE · 5h ago
- `Founder Dinner · 38 RSVPs` — EVENT · Today · 09:14 IST
- `Global Trade Corridor application filed` — POLICY · Yesterday · 17:50 IST
- `Karthik Iyer onboarded · senior engineer` — HIRE · Yesterday · 11:20 IST

## Data sources

| Source file                                                    | Used in section            |
| -------------------------------------------------------------- | -------------------------- |
| Inline `districtCompanies` array in [app/govt/overview/page.tsx](app/govt/overview/page.tsx) | All Companies              |
| [data/portal-approvals.json](data/portal-approvals.json)       | Residency Approvals queue  |
| [data/portal-directory.json](data/portal-directory.json)       | All Founders               |
| [data/portal-activity.json](data/portal-activity.json)         | Operational Activity       |

All wired through `lib/data.ts` exports: `portalActivity`, `portalApprovals`, `portalDirectory`, plus the `PortalApproval` type.

## State + persistence

- **Auth**: `getSession()` from [lib/store.ts](lib/store.ts). Govt portal asserts `role === "Government"`.
- **Approval overrides**: `useLocalState<Record<string, status>>("asc.govt.approvals", {})`. Survives page refreshes and tab closes — clearing localStorage resets the queue. No backend.
- **Logout**: `clearSession()` → push to `/`.

## Motion vocabulary

Strict adherence to [brand.md](brand.md):

- Aggregate KPIs fade-up with 60ms stagger.
- Company table rows stagger-fade at 40ms each (`viewport={{ once: true }}`).
- Approval rows stagger-fade at 40ms.
- Activity items render flat (no per-item motion to keep the stream feel calm).
- Approved card transition: 2px orange ring via Tailwind `ring-2 ring-[var(--accent)]`. Adds visible weight, not a flash.
- All transitions ≤ 0.35s, easeOut.
- No bouncy springs, no parallax, no neon, no crypto-style animation.

## Operational language map

The vocabulary that runs throughout — copied verbatim from the Gov Preview surface so designers and copywriters can extend with the same voice:

- District administration · ecosystem oversight
- Cross-tenant view
- Awaiting district registrar
- Inbound queue
- Live · ecosystem
- District-wide aggregates
- Operational activity · district-wide
- All tenants verified
- District census
- Live feed across every tenant

What we deliberately avoid: "dashboard", "users", "manage", "admin panel", "workspace", "team", anything SaaS-flavoured.

## What lives outside the page (intentionally)

To keep the Gov Preview tight and demo-ready, these are deferred unless the user explicitly asks:

- Drill-downs from the All Companies table into per-company read-only registry views.
- Filtering / sorting controls on the founders table.
- Pagination of the activity stream.
- Export functionality (the EXPORT REGISTRY button is decorative).
- Sub-routes (`/govt/companies`, `/govt/founders`, `/govt/approvals`, `/govt/activity`). Today they're anchor-linked sections inside `/govt/overview` — fast, scrollable, single-page admin console.

## Demo script

For the investor walkthrough, the recommended flow:

1. Log in as **GOVT PREVIEW**.
2. Pause on the dark metrics strip — `127 FOUNDERS · 42 STARTUPS · 91% COMPLIANCE`. The number that the company portal showed (`4 FOUNDERS · 84% LOCAL HIRING`) was tenant-scoped. This is the same shell, but the scope inverted.
3. Scroll to All Companies — show the per-company hiring bars side-by-side. Neon AI is one of five.
4. Scroll to Residency Approvals. Approve **Rohan Singh** (Neon AI). Watch the orange ring, the `APPROVED` counter increment, and the row state shift.
5. Scroll to Operational Activity. The stream is district-wide — every kind, every tenant, all in one feed.

The contrast with the Company Portal is the entire pitch:

> The company sees its own world. The government sees the ecosystem. Same visual language, same data layer, different scope. That is what multi-tenant operational software should feel like — and that is what an actual startup district would run on.
