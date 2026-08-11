# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, tech leads, and freelancing clients evaluating full-stack design + engineering craft—often on mobile first, between tabs, deciding whether to message Haui. Secondary: peer developers who skim projects and stack, not marketing buyers in a SaaS funnel.

## Product Purpose

Personal portfolio for **Luis Fernando Melgar Pizarro (Haui)**: proof of product UI skill, real projects, credentials, and a clear path to contact. Success = visitor understands who Haui is, trust that work is production-grade, and starts a conversation (WhatsApp, mail, LinkedIn, or demo).

## Positioning

A multi-theme, craft-first developer portfolio—not a template SaaS landing. Identity is **haui** + multi-palette themes; content is real projects, certificates, testimonials, and lived stack—not inventory fluff or fake metrics.

## Operating Context

Routes: `/` (home narrative, work, projects, contact), `/about` (biography, stack, achievements), `/project/[id]` (case detail + MDX). Themes: light, juli, rebecca, dark, sam, andrea, shei. Content synced from Notion → MDX/contentlayer. No app backend API; static data under `src/common/core/data`.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind v4, TypeScript
- Images via `@unpic/react/nextjs` + portfolio Image wrapper
- UI micro-motion with `motion/react`; page transitions via native View Transitions CSS
- haui design tokens only (`bg*`, `fn*`, `gr-*`, semantic status)—no ad-hoc zinc/purple SaaS defaults replacing the system
- coding-preferences (jujufer) wins on architecture/style conflicts with other skills
- Languages in UI: Spanish primary

## Brand Commitments

- Name: **Haui** / **Haui dev**; person: Luis Fernando Melgar Pizarro
- Voice: clear, warm, professional, Latino Spanish—short, precise, no corporate fluff
- Assets: `/logo.webp`, `/logo-big.webp`, opengraph, project banners under `public/`
- Multi-theme is product identity; redesigns must keep theme-switcher + token architecture unless an explicit rebrand says otherwise
- Display flourishes use `font-flowers` sparingly; body uses Geist

## Evidence on Hand

- Live work history, project MDX + banners, achievements/certificates, testimonials data
- Contact: WhatsApp message builders, personal mail, GitHub, LinkedIn, Figma `@haui`
- Do not invent companies, metrics, clients, or awards not present in repo data

## Product Principles

1. Work leads—brand supports; first viewport must still feel unmistakably “haui”.
2. One purpose per section; reduce dashboard clutter and card soup.
3. Theme tokens always; never hard-code a parallel palette for “polish”.
4. Motion is hierarchy and presence, not decoration noise.
5. Prefer real assets and real copy over placeholders and AI-generic aesthetics.

## Accessibility & Inclusion

Aim WCAG AA on interactive UI: visible focus, semantic structure, reduced-motion respect (`motion-reduce:*`), usable touch targets on mobile.
