````md
# STYLE.md
## AIM States Prototype UI Style Guide

## 1. Core Direction

The UI should feel like a serious public database for a new startup city.

Think:

Próspera governance portal + brutalist database + founder city operating system.

The design should feel:
- sharp
- credible
- institutional
- minimal
- slightly futuristic
- not playful
- not SaaS-template
- not crypto-looking

This is a visual prototype for investors, so every screen should feel intentional and real.

---

## 2. Visual Language

Use a clean brutalist grid system.

Key traits:
- white background
- black borders
- boxed layouts
- uppercase labels
- wide letter spacing
- small metadata text
- strong hierarchy
- cards with hard borders
- very limited colour
- orange as the main accent

The UI should look like a database, registry, or operating panel.

Avoid soft pastel startup UI.

---

## 3. Colour Palette

Primary background:
```css
#FFFFFF
````

Primary text:

```css
#111111
```

Secondary text:

```css
#667085
```

Muted label text:

```css
#98A2B3
```

Border:

```css
#111111
```

Light border:

```css
#E4E7EC
```

Accent orange:

```css
#FF5A2A
```

Dark header:

```css
#181818
```

Success green:

```css
#039855
```

Warning:

```css
#F79009
```

---

## 4. Typography

Use a mono-inspired or condensed technical font for headings and labels.

Recommended:

* JetBrains Mono
* IBM Plex Mono
* Space Mono
* Geist Mono

Headings:

* uppercase where suitable
* bold
* tight but readable
* slightly condensed feel

Labels:

* uppercase
* letter spacing: `0.18em`
* small size
* muted grey

Body:

* readable
* calm
* not too small
* use grey text for descriptions

Example:

```css
.heading {
  font-family: "JetBrains Mono", monospace;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #98A2B3;
}
```

---

## 5. Layout System

Use a strict grid.

Main content:

```css
max-width: 1280px;
margin: 0 auto;
padding: 48px 32px;
```

Card grid:

```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 24px;
```

Mobile:

```css
grid-template-columns: 1fr;
```

Spacing:

* section gap: 48px
* card padding: 28px
* internal gap: 16px
* metadata gap: 8px

---

## 6. Cards

Cards should be rectangular, sharp, and registry-like.

Card style:

```css
.card {
  border: 2px solid #111111;
  background: #ffffff;
  padding: 28px;
  min-height: 260px;
}
```

Card hover:

```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: 6px 6px 0 #111111;
}
```

Do not over-round cards.

Border radius:

```css
border-radius: 0px;
```

or max:

```css
border-radius: 4px;
```

---

## 7. Buttons

Buttons should feel like tags or registry actions.

Primary:

```css
background: #FF5A2A;
color: #FFFFFF;
border: 2px solid #FF5A2A;
```

Secondary:

```css
background: #FFFFFF;
color: #111111;
border: 2px solid #111111;
```

Small tag button:

```css
font-size: 11px;
text-transform: uppercase;
letter-spacing: 0.12em;
padding: 8px 14px;
```

---

## 8. Top Metrics Bar

Use a dark top strip for key metrics.

Example:

```txt
127 FOUNDERS
42 STARTUPS REGISTERED
318 AP JOBS COMMITTED
₹8.4CR ACTIVITY
```

Style:

```css
.metricsBar {
  background: #181818;
  color: #ffffff;
  display: flex;
  justify-content: center;
  gap: 80px;
  padding: 24px;
}
```

Numbers:

```css
font-size: 36px;
font-weight: 800;
color: #ffffff;
```

Highlight key number:

```css
color: #FF5A2A;
```

Labels:

```css
font-size: 12px;
letter-spacing: 0.2em;
text-transform: uppercase;
color: #98A2B3;
```

---

## 9. Search + Filters

Use large outlined search input.

```css
.search {
  border: 2px solid #111111;
  padding: 20px 24px;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```

Filter buttons:

```css
border: 1.5px solid #111111;
background: #ffffff;
padding: 8px 14px;
font-size: 11px;
letter-spacing: 0.12em;
text-transform: uppercase;
}
```

Active filter:

```css
background: #111111;
color: #ffffff;
```

---

## 10. Identity Card Style

The digital ID card should follow the same brutal registry language.

Use:

* black border
* white base
* orange header strip
* QR placeholder
* profile photo
* permit number
* residency type
* access level

It should feel official, not decorative.

---

## 11. Icons

Use Lucide icons only.

Icon style:

* thin stroke
* simple
* minimal
* never too colourful

Use orange only for active states.

---

## 12. Motion

Keep animations minimal.

Use:

* fade in
* slide up 8px
* hover lift
* number count-up

Avoid:

* bouncy animations
* parallax overload
* glitter
* Web3 effects

---

## 13. Content Style

Use real-sounding data.

Avoid lorem ipsum.

Example names:

* AIM States Labs
* Appetite Studio
* Quantum Valley Cohort
* Amaravati Founder Residency
* AP Skills Fund
* District Legal Desk
* Founder Housing Office

Example statuses:

* Active Residency
* Compliance Verified
* Pending Review
* Approved
* Founder Tier
* Local Hiring Verified

---

## 14. Overall Feeling

Every screen should answer:

“Could this be the operating system for a founder-first city?”

If yes, the design is working.

```
```
