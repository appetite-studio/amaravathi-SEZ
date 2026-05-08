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

- `LIVE · ECOSYSTEM` (pulsing — re-pulses on every authority action and every approval)
- `DEPT. OF IT · AP`

## Sections (in scroll order)

### 0 · System Notices · district channel

A 4-cell strip directly under the page header that surfaces operational tension at the top of the console. Each cell has a 3px coloured left bar keyed off the notice kind, a `CircleDot` indicator, and a status eyebrow.

Eyebrow: `[ SYSTEM NOTICES · DISTRICT CHANNEL ]`
Right meta: `BROADCASTING` indicator with a `Radio` icon.

| Kind       | Title                                                 | Detail                                              |
| ---------- | ----------------------------------------------------- | --------------------------------------------------- |
| POLICY     | Notice 014/2026 · AP Policy Tier II update effective 14 Apr 2026 | Capex rebate window extended for AI x Gov sub-category. |
| SLA        | Founder residency SLA reduced to 9 days               | Effective 01 Apr 2026. Visiting researcher: 14 days. |
| CAPACITY   | Tower C occupancy reached 82%                         | New allocations routed to Tower B until 01 May.     |
| COMPLIANCE | 3 compliance reviews scheduled this week              | Saral Health · 12 Apr · 14:00 IST.                  |

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

### 1.5 · District map · zone allocation

Eyebrow: `[ DISTRICT MAP · ZONE ALLOCATION ]`
Title: `6 zones · live occupancy`
Right meta: `16.516° N · 80.518° E`

A 6-cell mini panel showing every zone in District 01. Each cell has a `MapPin` icon coloured by status, the percent occupancy in display type, a 1px progress sliver, and the zone classification + status eyebrow.

| Zone           | Code   | Capacity                  | Occupancy | Status        |
| -------------- | ------ | ------------------------- | --------- | ------------- |
| Tower A        | ZN-01  | Sector A · L1–L9          | 92%       | OPERATIONAL   |
| Tower B        | ZN-02  | Sector A · L10–L18        | 78%       | OPERATIONAL   |
| Tower C        | ZN-03  | Sector A · L19–L24        | 82%       | AT CAPACITY   |
| Quantum Zone   | ZN-04  | Sector B · Lab Wing       | 64%       | OPERATIONAL   |
| AI Cluster     | ZN-05  | Sector B · Compute Wing   | 88%       | OPERATIONAL   |
| Founder Housing| ZN-06  | Sector A · Residency      | 71%       | OPERATIONAL   |

Tower C deliberately ties to the System Notices strip — investors see the same fact surfaced at two altitudes: as a system notice ("Tower C occupancy reached 82%") and as a live cell with the 82% number sitting next to all the others.

### 2 · All Companies — cross-tenant view

Anchor: `#companies`

Eyebrow: `[ ALL COMPANIES · CROSS-TENANT VIEW ]`
Title: `5 registered companies · sorted by hiring %`
Trailing action: **EXPORT REGISTRY** secondary button (decorative).

A registry-style table with a dark header row and 9 columns:

`COMPANY · CIN | SECTOR | TIER | FNDRS | HEAD | HIRING | RISK | LAST REVIEW | ⋮`

The final 36px column hosts a kebab dropdown — the **District Authority Actions** menu (see below). Each row stagger-fades in (40ms apart). Hovering tints the row to `#FAFAFB`. Clicking anywhere on a row (except the kebab) toggles the **Company Intelligence drawer** beneath it.

#### Risk pill

A small outlined pill rendered in a dedicated column, styled as `RISK · LOW | STANDARD | ELEVATED`. Colour keys to `--success`, `--text-2`, `--warning` respectively. Each pill carries a small `Shield` / `ShieldCheck` / `ShieldAlert` icon for at-a-glance triage.

#### Last reviewed metadata

Two-line stamp in the row showing relative time + reviewer role:

```
LAST REVIEW
2h ago
District Registrar
```

Reviewer roles in use: District Registrar, Sr. Deputy Registrar, Compliance Officer.

#### District Authority Actions dropdown

Triggered by a `⋮` button on each company row. Built on `@radix-ui/react-dropdown-menu`, portalled to the body, brutalist styling (2px border, `--shadow-brutal`). Header reads `[ AUTHORITY ACTIONS ]` with a `Shield` glyph in `--accent`. Sub-header echoes `<CIN> · <Tier>` for context. Footer reads `Logged to district audit trail`.

| Action                       | Icon         | Activity kind |
| ---------------------------- | ------------ | ------------- |
| Flag compliance review       | `Flag`       | COMPLIANCE    |
| Issue provisional permit     | `Stamp`      | POLICY        |
| Freeze incentives            | `Snowflake`  | POLICY        |
| Request audit documents      | `FileCheck2` | COMPLIANCE    |
| Escalate to registrar        | `ShieldAlert`| RESIDENCY     |

Selecting an action:

- Persists the action id under `asc.govt.companyFlags` keyed by company name (last 3 actions kept).
- Prepends a fresh entry to the live activity stream (e.g. `Saral Health · flag compliance review`).
- Triggers the `LIVE · ECOSYSTEM` pulse animation.
- Surfaces a small orange `Flag · N` badge next to the company name when ≥1 action has been logged. The drawer also lists the flagged actions under `AUTHORITY FLAGS`.

#### Company Intelligence drawer

Click a row to expand a 4-column drawer in `--accent-soft`. No new page, no modal — the row simply opens.

| Column 1 · Hiring trend                                                              | Column 2 · Founder origins        | Column 3 · Permit history                       | Column 4 · Incentives + score                                                                       |
| ------------------------------------------------------------------------------------ | --------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 7-bar mini histogram of past hiring cycles, current % in display type, +N pts delta. | 3–4 cities × founder count.       | 3–4 dated permit events (issuance, allocation). | Incentive chips (`TAX · CLASS A`, `RESIDENCY SUBSIDY`…), then `DISTRICT CONTRIBUTION SCORE / 1000`. |

If authority actions have been logged for the company, the bottom of the score column also shows an `AUTHORITY FLAGS · N` block listing them in order.

The 5 seeded companies (live inline in [app/govt/overview/page.tsx](app/govt/overview/page.tsx)) — each row also carries `riskLevel`, `lastReviewed`, `reviewer`, `hiringTrend[7]`, `founderOrigins`, `permitHistory`, `incentives`, `contributionScore`:

| Company                | CIN              | Sector             | Tier    | Founders | Head | Hiring | Risk     | Last review                | Score |
| ---------------------- | ---------------- | ------------------ | ------- | -------- | ---- | ------ | -------- | -------------------------- | ----- |
| Neon AI Systems        | ASC-COMP-2041    | AI Infrastructure  | Tier I  | 4        | 14   | 84%    | LOW      | 2h ago · District Registrar | 847   |
| AIM States Labs        | ASC-COMP-2042    | GovTech            | Tier II | 3        | 11   | 76%    | STANDARD | 5h ago · Sr. Deputy Registrar | 712   |
| Quantum Valley Systems | ASC-COMP-2055    | Quantum / Robotics | Tier I  | 5        | 19   | 91%    | LOW      | 1h ago · District Registrar | 894   |
| Saral Health           | ASC-COMP-2068    | BioTech            | Tier II | 2        | 7    | 86%    | ELEVATED | 8h ago · Compliance Officer | 482   |
| Krish Mobility         | ASC-COMP-2074    | Robotics           | Tier II | 3        | 9    | 78%    | STANDARD | 12h ago · Sr. Deputy Registrar | 538   |

The founder column on each row reads `<count + delta>` — when an approval cascades a +1 to a company, that delta animates in next to the count in `--accent`.

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
- A `RISK · LOW | STANDARD | ELEVATED` pill — same vocabulary used on company rows
- APPLYING WITH (target company)
- PERMIT TYPE (Founder Residency / Visiting Researcher)
- SUBMITTED date
- DOCUMENTS (e.g. `4 of 6`)
- **OFFICER ASSIGNED** — e.g. `R. Suresh · District Registrar`. Three officer profiles seeded across the queue: `R. Suresh · District Registrar`, `M. Lakshmi · Sr. Deputy Registrar`, `K. Sharma · Visiting Researcher Cell`, `V. Anand · Compliance Officer`.
- Current status pill (color-coded by status)

#### Actions + cascading effects

| Status            | Button(s)                                  | Effect on click                                                            |
| ----------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| `PENDING DOCS`    | **APPROVE** (primary), **REQUEST** (secondary) | Approve flips status to `APPROVED`. Request keeps it at `PENDING DOCS`.    |
| `UNDER REVIEW`    | **APPROVE**, **REQUEST**                   | Same as above.                                                             |
| `APPROVED`        | **REVERT TO REVIEW**                       | Flips status back to `UNDER REVIEW`. Useful for re-running the demo.       |

Every state change cascades across the page — this is the "small authority moment" that lands hardest on demo:

- The row gains a 2px orange ring (`ring-2 ring-[var(--accent)]`).
- Counters at the top of the section recompute live.
- A fresh activity entry slides into the **Operational Activity** stream at the top with a `JUST NOW` orange timestamp and a brief background flash that fades to white.
- If the application's company exists in the All Companies table, that company's founder count animates a `+1` (`--accent`) next to the integer.
- The header `LIVE · ECOSYSTEM` pill re-runs its pulse animation.
- All four effects are bound to the same `pulseKey`/state-update batch, so they fire synchronously and feel like a single system tick rather than four independent animations.

REVERT undoes both the count and the status — useful for re-running the demo without clearing localStorage.

#### Seeded applications

Source: [data/portal-approvals.json](data/portal-approvals.json)

| ID            | Applicant       | Company                | Type                | Origin         | Submitted   | Docs   | Risk     | Officer                              | Default status |
| ------------- | --------------- | ---------------------- | ------------------- | -------------- | ----------- | ------ | -------- | ------------------------------------ | -------------- |
| APP-2026-0184 | Rohan Singh     | Neon AI Systems        | Founder Residency   | Bengaluru, IN  | 08 Apr 2026 | 4 of 6 | STANDARD | R. Suresh · District Registrar       | PENDING DOCS   |
| APP-2026-0186 | Mei-Ling Chen   | Quantum Valley Systems | Visiting Researcher | Hsinchu, TW    | 07 Apr 2026 | 6 of 6 | LOW      | K. Sharma · Visiting Researcher Cell | UNDER REVIEW   |
| APP-2026-0188 | Jovan Petrović  | Tundra Ledger          | Founder Residency   | Belgrade, RS   | 06 Apr 2026 | 6 of 6 | ELEVATED | V. Anand · Compliance Officer        | UNDER REVIEW   |
| APP-2026-0192 | Annika Vogt     | Polar Quantum          | Visiting Researcher | Munich, DE     | 05 Apr 2026 | 6 of 6 | LOW      | K. Sharma · Visiting Researcher Cell | APPROVED       |
| APP-2026-0193 | Tanvi Joshi     | Andhra Civic           | Founder Residency   | Vijayawada, AP | 05 Apr 2026 | 6 of 6 | LOW      | M. Lakshmi · Sr. Deputy Registrar    | APPROVED       |
| APP-2026-0197 | Ifeoma Okoye    | Lattice Climate        | Founder Residency   | Lagos, NG      | 03 Apr 2026 | 5 of 6 | STANDARD | M. Lakshmi · Sr. Deputy Registrar    | PENDING DOCS   |
| APP-2026-0201 | Vivaan Khanna   | Tarani BioWorks        | Founder Residency   | Chennai, IN    | 02 Apr 2026 | 6 of 6 | STANDARD | R. Suresh · District Registrar       | UNDER REVIEW   |
| APP-2026-0205 | Sara Khalil     | Hex Civic              | Visiting Researcher | Cairo, EG      | 01 Apr 2026 | 6 of 6 | LOW      | K. Sharma · Visiting Researcher Cell | APPROVED       |

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

A 2-column grid (1-column on mobile) showing the full operational feed. Reads from [data/portal-activity.json](data/portal-activity.json) — 12 entries — and prepends any **recent activity** generated this session (approvals, document requests, authority actions). Recent items render with:

- A `JUST NOW` orange timestamp
- A small orange dot before the timestamp
- A brief background flash from `--accent-soft` to white as they slide in

Up to 8 recent entries are kept in `localStorage` under `asc.govt.recentActivity`, then truncated. Layout transitions are managed by `framer-motion`'s `<AnimatePresence>` + `layout` so the rest of the feed slides down naturally as new entries arrive.

Each entry shows:

- Top row: kind label (orange for fresh, muted for static history) + timestamp (orange when fresh)
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

| Source file                                                                                  | Used in section                                                |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Inline `districtCompanies` array in [app/govt/overview/page.tsx](app/govt/overview/page.tsx) | All Companies (incl. risk, last review, drawer payload)        |
| Inline `systemNotices` array in [app/govt/overview/page.tsx](app/govt/overview/page.tsx)     | System Notices strip                                           |
| Inline `districtZones` array in [app/govt/overview/page.tsx](app/govt/overview/page.tsx)     | District Map · Zone Allocation                                 |
| Inline `authorityActions` array in [app/govt/overview/page.tsx](app/govt/overview/page.tsx)  | Authority dropdown menu                                        |
| [data/portal-approvals.json](data/portal-approvals.json)                                     | Residency Approvals queue (incl. `riskLevel`, `officer` fields) |
| [data/portal-directory.json](data/portal-directory.json)                                     | All Founders                                                   |
| [data/portal-activity.json](data/portal-activity.json)                                       | Operational Activity (static history)                          |

All JSON wired through `lib/data.ts` exports: `portalActivity`, `portalApprovals`, `portalDirectory`, plus the `PortalActivityItem` and `PortalApproval` types.

## State + persistence

| Key                          | Shape                                | Purpose                                                              |
| ---------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `asc.session.v1`             | `{ role, name, email, … }`           | Auth, asserted by `PortalShell`. Govt portal requires `Government`.  |
| `asc.govt.approvals`         | `Record<applicationId, status>`      | Approval overrides for the residency queue.                          |
| `asc.govt.recentActivity`    | `PortalActivityItem[]` (≤ 8)         | Cascaded entries that slide into the activity feed.                  |
| `asc.govt.founderDelta`      | `Record<companyName, number>`        | Animated `+N` next to the founder count on company rows.             |
| `asc.govt.companyFlags`      | `Record<companyName, actionId[]>`    | Authority actions logged per company (last 3 kept).                  |

- **Logout**: `clearSession()` → push to `/`. Cascade keys persist across sessions until explicitly cleared from localStorage — useful for resuming a half-walked demo.

## Motion vocabulary

Strict adherence to [brand.md](brand.md):

- Aggregate KPIs and zone cells fade-up with 40–60ms stagger.
- Company table rows stagger-fade at 40ms each (`viewport={{ once: true }}`).
- System Notices fade-up at 60ms each.
- Approval rows stagger-fade at 40ms.
- Static activity items render flat (no per-item motion). Cascaded items slide from `x: -8` and fade their `--accent-soft` background out — distinguishing fresh vs. historical without breaking the calm.
- Approved card transition: 2px orange ring via Tailwind `ring-2 ring-[var(--accent)]`. Adds visible weight, not a flash.
- The `LIVE · ECOSYSTEM` pill scales `[1, 1.08, 1]` for 0.6s on a `pulseKey` increment — fires once per approval / authority action.
- The Company Intelligence drawer expands via `height: auto` with opacity fade, 0.25s easeOut.
- All transitions ≤ 0.6s, easeOut. No bouncy springs, no parallax, no neon, no crypto-style animation.

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
- System notices · district channel
- Broadcasting
- District map · zone allocation
- Authority actions
- Officer assigned
- Risk · low / standard / elevated
- Last reviewed · district registrar
- Logged to district audit trail
- Authority flags

What we deliberately avoid: "dashboard", "users", "manage", "admin panel", "workspace", "team", anything SaaS-flavoured.

## What lives outside the page (intentionally)

To keep the Gov Preview tight and demo-ready, these are deferred unless the user explicitly asks:

- Drill-downs from the All Companies table into per-company read-only registry views (the **Company Intelligence** drawer fills this need inline).
- Filtering / sorting controls on the founders table.
- Pagination of the activity stream.
- Export functionality (the EXPORT REGISTRY button is decorative).
- Authority actions submitting to a real workflow — they only log to localStorage and the activity feed.
- Sub-routes (`/govt/companies`, `/govt/founders`, `/govt/approvals`, `/govt/activity`). Today they're anchor-linked sections inside `/govt/overview` — fast, scrollable, single-page admin console.

## Demo script

For the investor walkthrough, the recommended flow:

1. Log in as **GOVT PREVIEW**.
2. Pause on the dark metrics strip — `127 FOUNDERS · 42 STARTUPS · 91% COMPLIANCE`. The number that the company portal showed (`4 FOUNDERS · 84% LOCAL HIRING`) was tenant-scoped. This is the same shell, but the scope inverted.
3. Read the **System Notices** strip out loud: `AP Policy Tier II update effective 14 Apr 2026 · SLA reduced to 9 days · Tower C at 82% · 3 compliance reviews this week`. Sets the operational tension before any data is shown.
4. Scroll to **District Map · Zone Allocation**. The Tower C `82%` cell ties directly back to the system notice — the same fact at two altitudes.
5. Scroll to **All Companies**. Click the kebab on `Saral Health` (the ELEVATED risk row), pick **Flag compliance review** — watch the orange flag badge appear next to the company name and a fresh entry slide into the activity feed at the top of the page.
6. Click the `Saral Health` row itself — the **Company Intelligence** drawer opens with hiring trend, founder origins, permit history, and contribution score. Click again to collapse.
7. Scroll to **Residency Approvals**. Note the `OFFICER ASSIGNED` field on each card (`R. Suresh · District Registrar` etc) and the `RISK` pills.
8. Approve **Rohan Singh** (Neon AI). The cascade fires synchronously: orange ring on the row, counter increments, `Neon AI` founder count goes from `4` → `5 (+1)` in the All Companies table, `LIVE · ECOSYSTEM` pulse re-runs in the header, and a fresh `JUST NOW` entry slides into the Operational Activity stream — `Rohan Singh · residency approved · Neon AI Systems`.
9. Scroll to Operational Activity. The stream is district-wide — every kind, every tenant, all in one feed. The cascade entries from steps 5 and 8 are still pinned at the top.

The contrast with the Company Portal is the entire pitch:

> The company sees its own world. The government sees the ecosystem. Same visual language, same data layer, different scope. That is what multi-tenant operational software should feel like — and that is what an actual startup district would run on.
