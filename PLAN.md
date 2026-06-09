# Lightable — Build Plan & Progress

Flagship marketing site for **Lightable** — architectural lighting design + intelligent
control (KNX / Lutron). Dark, cinematic, luxury. The site behaves like a darkened interior
that the visitor *lights* using an on-screen mood keypad.

---

## Tech stack

- **Next.js 16 (App Router)** + **TypeScript** + **Tailwind CSS v4** + **React 19**
- **GSAP + ScrollTrigger** — scroll storytelling ("fixtures switching on")
- **Framer Motion** — component transitions, scroll-reveals, gestures
- **React Three Fiber + drei + three** — optional 3D hero light accent (progressive
  enhancement; CSS/GSAP light layers are the reliable primary hero)
- Fonts via `next/font`: **Fraunces** (display), **Hanken Grotesk** (body),
  **JetBrains Mono** (technical labels)

### Why these choices
- `@property`-registered `--temp` / `--bri` are animated as numbers; all colors derive via
  `color-mix(in oklch, …)`. One control re-lights the whole page with cheap transitions.
- CSS-first hero avoids a fragile WebGL dependency for the core experience; 3D is additive.

---

## Design-token system (the "theme engine")

Two drivers set on `<html>`:
- `--temp` — 0 (cool ≈ 6500K, blue-white) → 1 (warm ≈ 2200K, amber)
- `--bri`  — 0 (dim) → 1 (bright)

Everything else derives: `--light`, `--glow`, `--accent`, `--bg`, `--surface`, `--surface-2`,
`--line`, `--text`, `--muted`, `--bloom` (glow intensity). See `src/app/globals.css`.

Kelvin readout: `K = 6500 − temp·4300`.

### Scene presets (real lighting-control language)
| Scene   | temp | bri  | ≈Kelvin |
|---------|------|------|---------|
| Bright  | 0.12 | 1.00 | 5984K   |
| Day     | 0.30 | 0.82 | 5210K   |
| Evening | 0.62 | 0.52 | 3834K   | ← default
| Relax   | 0.82 | 0.38 | 2974K   |
| Cinema  | 0.92 | 0.20 | 2544K   |

Plus a continuous **dimmer** (brightness) and **cool↔warm** slider. Scene persists across
pages via `localStorage` (no-flash inline script in `<head>`).

---

## Folder structure

```
src/
  app/
    layout.tsx            # fonts, metadata, providers, shell, ambient light, grain
    page.tsx              # Home
    globals.css           # tokens + scenes + base + utilities
    lighting-design/      # flagship service page
    lighting-fixtures/
    lighting-control/
    shading/
    automation/
    projects/  + projects/[slug]/
    process/
    about/
    contact/
    sitemap.ts, robots.ts
  components/              # Keypad, Nav, Footer, Hero, Reveal, Placeholder, primitives…
  lib/                    # scenes.ts, site.ts, theme.tsx (MoodProvider), seo.ts
```

---

## Build order & status

- [x] 0. Plan written
- [x] 1. Project scaffold (Next + TS + Tailwind v4) + deps (gsap, framer-motion, R3F)
- [x] 2. Design tokens & theme engine (`globals.css`, `scenes.ts`, `theme.tsx`)
- [x] 3. Layout shell + Nav + persistent **Mood Keypad** + Footer + ambient/grain
- [x] 4. Home / landing (cinematic hero + scroll story)
- [x] 5. Lighting Design (flagship) page
- [x] 6. Lighting Fixtures, Lighting Control, Shading pages
- [x] 7. Automation / Smart Spaces umbrella
- [x] 8. Projects + case-study template, Process, About, Contact
- [x] 9. Shared: Placeholder system, partner wall, SEO metadata, sitemap/robots, JSON-LD
- [x] 10. SEO pass — applied manually: per-page `<title>`/description/canonical, Open Graph +
      Twitter, semantic headings (one `<h1>` per page), descriptive alt text, `sitemap.xml`,
      `robots.txt`, and JSON-LD (`Organization` + `LocalBusiness` + `Service` +
      `BreadcrumbList`, plus `CreativeWork` per project).
      ⚠ The dedicated `claude-seo` slash commands (`/seo audit`, `/seo page`, `/seo schema`)
      were only just installed and register as commands **after a Claude Code reload** — they
      weren't invocable in this build session. Re-run them after reload to layer on their checks.
- [x] 11. Vercel web-design-guidelines audit — fetched the live checklist and applied: icon
      buttons labelled, decorative icons `aria-hidden`, `aria-live` on async updates, visible
      `:focus-visible` (and `:focus-within` on menus), labelled form controls with correct
      `type`/`inputMode`/`autocomplete`, reduced-motion variants, explicit transition props,
      `touch-action: manipulation`, `overscroll-behavior: contain`, `color-scheme`+`theme-color`,
      tabular numerals, curly apostrophes, `scroll-margin-top` for anchors.
- [x] 12. Final QA — `npm run build` (18 routes prerender) + `npm run lint` clean; runtime
      smoke test (all routes 200); reduced-motion, keyboard, and contrast-across-moods verified.

---

## How skills informed the build
- **frontend-design** — committed to one bold, restrained direction (cinematic architectural
  luxury); distinctive type pairing; light-as-material atmosphere over flat color.
- **web-design-guidelines (Vercel)** — accessibility/focus/forms/reduced-motion checklist
  applied per page (audit pass tracked above).
- **react-best-practices / composition-patterns** — server components by default, client
  islands only for the keypad + interactive bits; small primitives composed.
- **3d / scroll skills** — GSAP scroll story + optional R3F hero accent.

## Where to swap real content later
- Images: every image is a `<Placeholder>` — replace with `<Image>` (label + alt already
  written as if the real asset existed). See README "Swapping in real assets".
- Copy/data: `src/lib/site.ts` (services, projects, partners, NAP).
