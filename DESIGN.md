---
name: haui.com.pe
description: Multi-theme craft portfolio for Haui (Luis Fernando) — product UI, projects, credentials.
colors:
  bg1: "var(--bg1)"
  bg2: "var(--bg2)"
  bg3: "var(--bg3)"
  fn1: "var(--fn1)"
  fn2: "var(--fn2)"
  fnA: "var(--fnA)"
  gr-from: "var(--gr-from)"
  gr-via: "var(--gr-via)"
  gr-to: "var(--gr-to)"
  semantic-danger: "var(--semantic-danger)"
  semantic-warning: "var(--semantic-warning)"
  semantic-info: "var(--semantic-info)"
  semantic-success: "var(--semantic-success)"
  light-bg1: "#fafafa"
  light-fn1: "#171717"
  light-gr-from: "#e63946"
  light-gr-via: "#f1a208"
  light-gr-to: "#457b9d"
typography:
  root: "14px html base"
  families:
    ui: "font-geist (Geist)"
    displayFlourish: "font-flowers (Send Flowers) — brand accents only"
    meta: "font-mono (Geist Mono)"
  roles:
    display:
      class: "type-display / text-display"
      size: "clamp(2rem, 5.5vw, 3.5rem)"
      weight: 700
      lineHeight: 0.98
      letterSpacing: "-0.02em"
    display-sm:
      class: "type-display-sm / text-display-sm"
      size: "clamp(1.75rem, 4vw, 2.75rem)"
      weight: 700
    title:
      class: "type-title / text-title"
      size: "clamp(1.5rem, 3vw, 2.25rem)"
      weight: 700
    heading:
      class: "type-heading / text-heading"
      size: "1.25rem"
      weight: 600
    subheading:
      class: "type-subheading / text-subheading"
      size: "1.125rem"
      weight: 600
    body:
      class: "type-body / text-body"
      size: "1rem"
      weight: 400
      lineHeight: 1.6
    body-sm:
      class: "type-body-sm / type-lead"
      size: "0.875rem"
      weight: 400
      color: "fn2 for support/lead"
    label:
      class: "type-label"
      size: "0.6875rem"
      weight: 500
      family: mono
      tracking: "0.14em uppercase"
    caption:
      class: "type-caption"
      size: "0.625rem"
      weight: 500
    button:
      class: "type-button"
      size: "0.875rem"
      weight: 500
    button-sm:
      class: "type-button-sm"
      size: "0.75rem"
      weight: 500
    link:
      class: "type-link / text-link"
      size: "0.875rem"
      weight: 500
rounded:
  md: "0.75rem"
  lg: "1rem"
  xl: "1rem–1.25rem"
  2xl: "1rem"
  full: "9999px"
spacing:
  section-pad: "1.25rem–1.75rem"
  stack-sm: "0.5rem–0.75rem"
  stack-md: "1rem–1.5rem"
  region: "max content width via .region"
components:
  button-primary:
    backgroundColor: "{colors.fn1}"
    textColor: "{colors.bg1}"
    rounded: "{rounded.full}"
    type: "type-button"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.fn1}"
    type: "type-button"
  card-surface:
    backgroundColor: "{colors.bg1}"
    textColor: "{colors.fn1}"
    rounded: "{rounded.2xl}"
  nav-chrome:
    backgroundColor: "{colors.bg1}"
    textColor: "{colors.fn1}"
    rounded: "{rounded.2xl}"
    height: "3.5rem"
  title-display:
    class: "type-display via Title component"
---

# Design System — haui

## Overview

Craft-first portfolio UI in a **multi-theme token system**. Surfaces are solid theme greys (`bg1`/`bg2`/`bg3`), readable text (`fn1`/`fn2`), and restrained brand energy via the **gradient triad** (`gr-from` / `gr-via` / `gr-to`)—usually as borders or `.gradient` accents, not large neon fills. Experience mode: portfolio artifacts lead; chrome stays quiet.

Themes: `light`, `juli`, `rebecca`, `dark`, `sam`, `andrea`, `shei`. All share the same token names; values differ per theme. Never replace the system with Inter/zinc SaaS purple or cream+serif+terracotta AI defaults.

**Sources of truth**

| Concern | Path |
|---------|------|
| Theme color values | `src/common/style/themes/themes.css` |
| Tailwind theme + type scale | `src/app/globals.css` (`@theme`, `.type-*`) |
| PostCSS | `postcss.config.mjs` |
| Reusable UI | `src/common/components/*` |
| Agent rules | `AGENTS.md` |
| Impeccable pin | `.agents/skills/impeccable/reference/haui.md` |

## Colors

| Role | Token | Tailwind |
|------|--------|----------|
| Page / shell | `--bg1` | `bg-bg1` |
| Elevated surface | `--bg2` | `bg-bg2` |
| Borders / dividers | `--bg3` | `border-bg3` |
| Primary text | `--fn1` | `text-fn1` |
| Secondary text | `--fn2` | `text-fn2` |
| Absolute contrast | `--fnA` | when needed |
| Gradient | `--gr-from/via/to` | `from-from` `via-via` `to-to` / `.gradient` |
| Status fill | `--semantic-*` | `bg-semantic-danger` etc. |
| Status text | `--semantic-text-*` | `text-semantic-text-danger` etc. |

Prefer tokens over hex. Ad-hoc hex is a defect unless it’s asset-intrinsic.

## Typography

### Families

| Family | Tailwind | Use |
|--------|----------|-----|
| Geist | `font-geist` | UI, body, headings |
| Geist Mono | `font-mono` | Labels, metadata, chrome meta |
| Send Flowers | `font-flowers` / `.type-flourish` | Brand flourish word only |

### Roles (size + weight)

Implement with **role utilities** (`text-*` tokens and `.type-*`). Do not invent `text-[13px]` when a role exists.

| Role | Token size | Weight | Leading | Tracking | Class |
|------|------------|--------|---------|----------|-------|
| **Display** | `clamp(2rem, 5.5vw, 3.5rem)` | 700 | 0.98 | -0.02em | `.type-display` |
| **Display sm** | `clamp(1.75rem, 4vw, 2.75rem)` | 700 | 1.0 | -0.02em | `.type-display-sm` |
| **Title** | `clamp(1.5rem, 3vw, 2.25rem)` | 700 | 1.05 | -0.015em | `.type-title` |
| **Heading** | 1.25rem | 600 | 1.2 | -0.01em | `.type-heading` |
| **Subheading** | 1.125rem | 600 | 1.3 | -0.005em | `.type-subheading` |
| **Body** | 1rem | 400 | 1.6 | 0 | `.type-body` |
| **Body sm / lead** | 0.875rem | 400 | 1.55–relaxed | 0 | `.type-body-sm` / `.type-lead` |
| **Label** | 0.6875rem mono | 500 | 1.25 | 0.14em + uppercase | `.type-label` |
| **Caption** | 0.625rem | 500 | 1.3 | 0.02em | `.type-caption` |
| **Button** | 0.875rem | 500 | 1 | 0 | `.type-button` |
| **Button sm** | 0.75rem | 500 | 1 | 0 | `.type-button-sm` |
| **Link** | 0.875rem | 500 | 1.5 | 0 | `.type-link` |

HTML defaults (`h1`…`p`, `a`) map to the same scale in `@layer base`.

**Intentional labels:** mono uppercase `.type-label` on section chrome is brand, not decorative noise.

## Layout

- Content width: `.region` + `max-region:px-5` on viewports
- Sections: one job, one headline, short supporting line (`Section` + `Title` + `.type-lead`)
- Grid: 1 → 2 → 3 cols at sm/lg; gap usually `gap-3`
- Cards: only for interaction containers; hero never a collage of cards
- Floating chrome: solid `bg-bg1`, no backdrop-blur on nav shell

## Elevation & Depth

Depth from border (`border-bg3/…`) and soft color steps, not multi-layer glows. Shadows if any are restrained; no purple ambient glow. Gradient used as **1px wrapper border** (`.gradient` + `p-px`) more than fill.

## Shapes

- Rest chrome: `rounded-2xl`
- Docked / pill UI: `rounded-full`
- Media: `rounded-xl` / `rounded-2xl`
- Buttons: `rounded-xl` (pill OK for chips/nav)

## Standard components (reuse)

| Component | Import | Notes |
|-----------|--------|-------|
| Button | `@common/components/button` | variants + size + status + `href` |
| Title | `@common/components/title` | display titles |
| Section | `@common/components/section` | region shell |
| Card / CardTabs | `card`, `card-tabs` | interactive only |
| Popup | `popup` | compound floating UI |
| Dialog / Popover | `dialog`, `popover` | |
| Navbar | `navbar` | dock chrome |
| Footer | `footer` | |
| Image | `image` | unpic/nextjs only path for optimized media |
| FocusGallery | `focus-gallery` | full-screen media |
| Chip | `chip` | tags |
| Input / Select | `input`, `select` | |
| ThemeChanger / ThemeTransition | `theme-changer`, `theme-transition` | setTheme only |
| MDX | `mdx` | content |

## Do's and Don'ts

**Do**
- Use haui tokens and multi-theme contrast in every polished change
- Reuse components above; extend in-place when needed
- Apply type **roles** (`.type-*` / `text-display`…) consistently
- Keep solid chrome; gradient on border accents
- Respect `prefers-reduced-motion` / `motion-reduce:`

**Don't**
- Parallel kits (new Button, raw hex themes, Inter/zinc defaults)
- Ad-hoc font sizes when a role exists
- Reintroduce `next-view-transitions`, Headless UI floats, glassmorphism shell
- Prop-drill store data children can select
- Emoji decoration clusters or stat-strip hero clutter
