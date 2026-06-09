# Lightable

Flagship marketing site for **Lightable** — an architectural lighting design and
automation studio (KNX / Lutron). A dark, cinematic, luxury experience where the site
behaves like a darkened interior that the visitor *lights* using an on-screen mood keypad.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **GSAP**,
**Framer Motion** and **React Three Fiber** (optional 3D).

---

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

> Node 18.18+ / 20+ is required. If you use `nvm`, run `nvm use` first
> (this repo was built on Node 24).

---

## The signature interaction — the mood keypad

A persistent, metal/glass **keypad** is docked bottom-right on every page. It re-lights the
*entire site* along a cool → warm axis:

- **Scene presets** — Bright, Day, Evening, Relax, Cinema (each sets a colour temperature +
  brightness, in real lighting-control language).
- A continuous **dimmer** (brightness) and a **cool ↔ warm** temperature slider, with a live
  **Kelvin readout** (≈6500K cool → ≈2200K warm).
- The mood **persists across pages** via `localStorage`, and is applied before first paint
  (no flash).
- Fully **keyboard-accessible** (ARIA labels, visible focus, Escape to close) and
  **reduced-motion-aware** (the relight snaps instead of animating).

### How it works
Two CSS custom properties — `--temp` and `--bri` — are registered as animatable `@property`
numbers on `<html>`. Every colour in the system derives from them via
`color-mix(in oklch, …)`, so changing two variables re-lights the whole page with cheap,
GPU-friendly transitions. See `src/app/globals.css` and `src/lib/theme.tsx`.

---

## Project structure

```
src/
  app/
    layout.tsx          # fonts, metadata, providers, shell, ambient light + grain
    globals.css         # design tokens + theme engine + base styles
    page.tsx            # Home / landing
    lighting-design/    # flagship service page
    lighting-fixtures/  lighting-control/  shading/  automation/
    projects/  projects/[slug]/   # index + case-study template
    process/  about/  contact/
    sitemap.ts  robots.ts  not-found.tsx
  components/            # Keypad, Nav, Footer, Hero, Reveal, Placeholder, sections, …
  lib/
    scenes.ts           # scene presets + Kelvin mapping
    theme.tsx           # MoodProvider (the keypad's brain) + no-flash script
    site.ts             # ALL copy + IA + project/fixture/process data
    seo.ts              # per-page metadata + JSON-LD helpers
```

---

## Swapping in real content & assets

Everything is placeholder-driven and built to swap one-for-one.

### Images
Every image is a `<Placeholder>` (`src/components/Placeholder.tsx`) — dark, labelled, sized to
the correct aspect ratio, generated locally (no external hosts). Each already has descriptive
**alt text written as if the real image existed**. To swap one in:

```tsx
// before
<Placeholder ratio="3 / 4" label="…" alt="A darkened living room lit by warm downlights…" />

// after
<Image src="/images/hero.jpg" alt="A darkened living room lit by warm downlights…" fill
  sizes="(max-width: 980px) 100vw, 45vw" style={{ objectFit: "cover" }} />
```

(Reuse the existing `alt` text verbatim.)

### Copy & data
All copy, services, fixtures, projects, process steps and partner logos live in
**`src/lib/site.ts`**. Edit there — pages render from it.

### Studio details (NAP) & SEO
Name / address / phone / email / social and the canonical `url` are in `SITE` at the top of
`src/lib/site.ts`. **These are placeholders — replace before launch.** They feed the page
metadata, Open Graph, sitemap and the JSON-LD (`Organization` + `LocalBusiness` + `Service` +
`BreadcrumbList`) in `src/lib/seo.ts`. Replace `public/og.svg` with a real Open Graph image.

### Contact form
`src/components/ContactForm.tsx` uses a **stub handler** (no backend) and shows a success state.
Wire the `handleSubmit` to a real endpoint (`/api/contact`, Resend, Formspree, etc.).

---

## Design system

- **Type:** Fraunces (display), Hanken Grotesk (body), JetBrains Mono (technical labels) — via
  `next/font`.
- **Theme:** deep near-black surfaces that subtly shift cool/warm with the mood; ambient
  light-pools, bloom that scales with brightness, grain + vignette atmosphere.
- **Motion:** GSAP + ScrollTrigger for the hero/scroll story; Framer Motion for scroll-reveals
  ("fixtures switching on"). All motion respects `prefers-reduced-motion`.

See `PLAN.md` for the full build plan and progress.
