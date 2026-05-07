# Amaravati Startup Capital — Brand Tokens

The single source of truth lives in [`app/globals.css`](app/globals.css). This file
mirrors that for human reference; if you change one, change the other.

## Direction

Próspera governance portal × brutalist database × founder-city operating system.
Sharp, institutional, mono-typography, hard black borders, single orange accent.
Not playful, not SaaS-template, not crypto.

## Colour

| Token            | Hex       | Use                                       |
| ---------------- | --------- | ----------------------------------------- |
| `--bg`           | `#FFFFFF` | Page background (pure white).             |
| `--text`         | `#111111` | Primary text.                             |
| `--text-2`       | `#667085` | Secondary text / descriptions.            |
| `--text-3`       | `#98A2B3` | Muted labels, eyebrows, captions.         |
| `--border`       | `#111111` | Hard 2px borders on cards/buttons/inputs. |
| `--border-soft`  | `#E4E7EC` | Internal dividers only.                   |
| `--accent`       | `#FF5A2A` | CTAs, active state, residency strip, KPI. |
| `--accent-soft`  | `#FFF2EC` | Tinted backgrounds for accent cards.      |
| `--header-dark`  | `#181818` | Top metrics strip + app top bar.          |
| `--success`      | `#039855` | "Verified" / "Approved" pills.            |
| `--warning`      | `#F79009` | "Pending" / "Review" pills.               |

Orange must be rare. Only use it for primary CTAs, the residency header strip,
KPI highlights, active filter chips, and the "LIVE" pulse dot.

## Typography

- **Geist Mono** — display headlines, KPIs, labels, eyebrows, registry IDs.
  Weight 700, `letter-spacing: 0.02em`. Uppercase whenever it fits.
- **Inter** — body copy and form text. 15–16px.
- **Labels** — `font-mono`, `text-[12px]`, `uppercase`, `tracking-[0.18em]`,
  `text-[--text-3]`. Use the `.label` utility.

## Geometry

- Border radius: `0` everywhere; `4px` is the maximum and only on inputs.
- Borders: 2px black on cards/buttons/inputs, 1.5px black on filter chips,
  `--border-soft` for internal dividers.
- Page container: `max-width: 1280px`, `padding: 48px 32px`.
- Section gap: 48px. Card padding: 28px. Card grid gap: 24px.

## Hover signature

```css
.hover-brutal:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111111;
}
```

No bouncy springs, no parallax, no soft lift. Just the offset shadow.

## Motion

Fade + 8px slide-up. 250ms ease. 60ms stagger on stat strips. Number
count-up on KPIs. That is the whole motion vocabulary.
