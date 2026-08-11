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
  display:
    fontFamily: "var(--font-flowers), cursive"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "tight"
  heading:
    fontFamily: "var(--font-geist), system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "tight"
  body:
    fontFamily: "var(--font-geist), system-ui, sans-serif"
    fontSize: "0.875rem–1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "var(--font-mono), ui-monospace, monospace"
    fontSize: "0.625rem–0.75rem"
    letterSpacing: "0.12em–0.18em"
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
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.fn1}"
    rounded: "{rounded.full}"
  card-surface:
    backgroundColor: "{colors.bg1}"
    textColor: "{colors.fn1}"
    rounded: "{rounded.2xl}"
  nav-chrome:
    backgroundColor: "{colors.bg1}"
    textColor: "{colors.fn1}"
    rounded: "{rounded.2xl}"
    height: "3.5rem"
---

# Design System — haui

## Overview

Craft-first portfolio UI in a **multi-theme token system**. Surfaces are solid theme greys (`bg1`/`bg2`/`bg3`), readable text (`fn1`/`fn2`), and restrained brand energy via the **gradient triad** (`gr-from` / `gr-via` / `gr-to`)—usually as borders or `.gradient` accents, not large neon fills. Experience mode: portfolio artifacts lead; chrome stays quiet.

Themes: `light`, `juli`, `rebecca`, `dark`, `sam`, `andrea`, `shei`. All share the same token names; values differ per theme. Never replace the system with Inter/zinc SaaS purple or cream+serif+terracotta AI defaults.

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

- **Body / UI**: Geist (`font-geist`)
- **Display flourish**: Send Flowers (`font-flowers`) for brand moments only
- **Meta / labels**: Geist Mono, small uppercase tracking
- Scale: clamp headlines; body `text-sm`–`text-base`; mono labels `text-[10px]`–`text-[11px]`
- Avoid stacking multiple competing display fonts

## Layout

- Content width: `.region` + `max-region:px-5` on viewports
- Sections: one job, one headline, short supporting line
- Grid: 1 → 2 → 3 cols at sm/lg; gap usually `gap-3`
- Cards: only for interaction containers; hero never a collage of cards
- Floating chrome: solid `bg-bg1`, no backdrop-blur on nav shell

## Elevation & Depth

Depth from border (`border-bg3/…`) and soft color steps, not multi-layer glows. Shadows if any are restrained; no purple ambient glow. Gradient used as **1px wrapper border** (`.gradient` + `p-px`) more than fill.

## Shapes

- Rest chrome: `rounded-2xl`
- Docked / pill UI: `rounded-full`
- Media: `rounded-xl` / `rounded-2xl`
- Optical density over oversized radii stacks

## Components

- **Button** (`common/components/button`): variants outline / filled; `status` pairs semantic fill + text tokens; can be `href` → Link
- **Popup**: compound Header / Content / Footer (not Headless UI menus)
- **Navbar**: scroll-dock to measured fit width; active link `layoutId` highlight; mono labels
- **Image**: `@common/components/image` → unpic/nextjs optimizer; use `layout`, `objectFit`, `sizes` correctly
- **Theme switch**: `ThemeTransition` black box; consumers only `setTheme`

## Do's and Don'ts

**Do**
- Use haui tokens and multi-theme contrast in every polished change
- Keep solid chrome; gradient on border accents
- Respect `prefers-reduced-motion` / `motion-reduce:`
- Co-locate presentation under `src/presentation/{route}`

**Don't**
- Introduce Inter / purple-indigo SaaS kits / cream terracotta blog skins as a new “default”
- Reintroduce `next-view-transitions`, Headless UI floats after migration, or glassmorphism as the default surface
- Prop-drill store data that children can select
- Ship emoji decoration clusters or stat-strip hero clutter
