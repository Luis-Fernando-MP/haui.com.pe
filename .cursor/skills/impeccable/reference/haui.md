# haui.com.pe — project constraints (Impeccable)

Load this on **every** Impeccable command for this repo (with `DESIGN.md` / `AGENTS.md` / **coding-preferences**).  
These override generic craft defaults that fight the portfolio’s established system.

When code style conflicts with other guides (incl. some Vercel examples that prefer ternary conditionals), **coding-preferences + this file win**.

---

## Code quality (non-negotiable)

Impeccable edits ship production UI code. Design craft does **not** excuse messy React/TS.

### Clean, lean source

| Rule | Do | Don’t |
|------|----|--------|
| **No noise comments** | Self-explanatory names, early returns | Narrative comments, “// fix layout”, TODO piles, commented-out dead code |
| **No duplication** | Extract only when **reused for real**; prefer compose of standard components | Copy-paste card shells, repeated class stacks, twin helpers that only differ by label |
| **Standard components** | Import `src/common/components/*` | Parallel Button, ad-hoc dialog, raw styled div as fake button |
| **Type roles** | `.type-*` / `text-display`… + correct **font weights** for the role | `text-[13px]`, random `font-bold` on every node |
| **Semantic HTML** | Real `h1`→`h2`→`h3` order, `section`/`article`/`nav`/`header`/`main`, one primary h1 per view | Div soup, random bold spans as “headings”, skipping levels for style |
| **Performance** | Lazy images via `Image`, no permanent `will-change`, sensible lists, light client islands | Full-res dumps, duplicate listeners, heavy anonymous components inside parents |

- No one-line util files, no micro-types for single props (per coding-preferences).
- JSDoc `@param` / `@example` **only** on truly reusable `common` primitives — never chatty block comments in presentation.
- Prefer early `return`; **no** `else` after return.

### Conditional render: `&&` only (fundamental)

For show/hide UI in JSX: use **boolean `&&`**. Never ternary.

```tsx
// ban
{open ? <Panel /> : null}
{active ? <A /> : <B />}

// good — explicit boolean
{open && <Panel />}
{items.length > 0 && <List items={items} />}
{Boolean(summary) && <p className="type-lead">{summary}</p>}
```

- Two exclusive branches → early return or split blocks **outside** a ternary in JSX.
- Always force a real boolean (`length > 0`, `Boolean(x)`, `x != null`) so `0` / `""` never paint.

### Weights + semantic outline

| Content job | HTML | Type weight role |
|-------------|------|------------------|
| Page primary title | single `h1` | display (700) / `<Title as="h1">` |
| Section title | `h2` | display/title (700) |
| Subsection | `h3` | heading (600) |
| Support copy | `p` | body / lead (400) |
| Meta label | `p`/`span` + `.type-label` | label (500 mono) — not a fake heading |
| Control | `button` / `<Button>` | button (500) |
| Navigation | `nav` + links | chrome patterns, not random anchors without landmarks |

Do not fake hierarchy with size alone on a `div`. Weight class must match the role table below; HTML level carries a11y, not just look.

### Performance checklist (when editing UI)

- Images: only `@common/components/image` (unpic → optimizer).
- Avoid new permanent GPU traps (`will-change` on lists, unbounded blur).
- Keep client components small; don’t lift `"use client"` up the tree without need.
- Co-located store/selectors fine-grained; no prop-drill of store data.
- Align with vercel-react-best-practices **only** where it doesn’t fight coding-preferences (`&&`, no comment spam).

---

## Reuse first — never reinvent

Standard UI lives in **`src/common/components/`**. Prefer import + compose over new one-offs.

| Domain | Path | Role |
|--------|------|------|
| Button | `button/` | CTA, outline, ghost, link, status tints, `href`→Link |
| Title | `title/` | Section/page display titles (`.type-display`) |
| Section | `section/` | Region + optional title/subtitle shell |
| Card / CardTabs | `card/`, `card-tabs/` | Interactive cards only |
| Popup | `popup/` | Floating chrome (Header/Content/Footer) |
| Dialog / Popover | `dialog/`, `popover/` | Modal / popover primitives |
| Navbar | `navbar/` | Floating dock chrome |
| Footer | `footer/`, `footer-gradient/` | Site chrome |
| Image | `image/` | unpic/nextjs — **only** image component |
| Focus gallery | `focus-gallery/` | Full-screen media viewer |
| Chip | `chip/` | Tags / filters |
| Input / Select | `input/`, `select/` | Form controls |
| Theme | `theme-changer/`, `theme-transition/` | Theme switch only via these |
| MDX | `mdx/` | Content rendering |

**Ban:** new base buttons, ad-hoc modal menus (Headless UI), raw `<img>` when `Image` fits, hex colors for theme surfaces, second parallel design system.

## Tokens (already defined)

| System | Where |
|--------|--------|
| Theme colors (`bg*`, `fn*`, `gr-*`, semantic) | `src/common/style/themes/themes.css` |
| Tailwind `@theme` bridge + type scale | `src/app/globals.css` |
| Tailwind PostCSS | `postcss.config.mjs` (`@tailwindcss/postcss`) |
| Fonts | `src/common/metadata/fonts.ts` |

Do **not** invent a zinc/slate palette or Inter stack. Multi-theme only.

## Type scale (authoritative)

Roles are **purpose-named**. Implement via tokens + utilities — not magic `text-[13px]`.

| Role | Utility / class | Weight | Job |
|------|-----------------|--------|-----|
| Display | `text-display` / `.type-display` / `<Title>` | 700 | Page & section heroes |
| Display sm | `text-display-sm` / `.type-display-sm` | 700 | Featured cards, compact heroes |
| Title | `text-title` / `.type-title` | 700 | Mid section titles |
| Heading | `text-heading` / `.type-heading` | 600 | h3, card titles |
| Subheading | `text-subheading` / `.type-subheading` | 600 | h4 |
| Body | `text-body` / `.type-body` | 400 | Paragraphs |
| Body sm / lead | `text-body-sm` / `.type-body-sm` / `.type-lead` | 400 | Support copy (`fn2`) |
| Label | `text-label` / `.type-label` | 500 mono | Uppercase section meta (intentional) |
| Caption | `text-caption` / `.type-caption` | 500 | Chips, dense meta |
| Button | `text-button` / `.type-button` | 500 | Controls (`sm` → `.type-button-sm`) |
| Link | `text-link` / `.type-link` | 500 | Inline / button link |
| Flourish | `.type-flourish` / `font-flowers` | 400 | Brand word accents only |

**Sizes & leading** live in `globals.css` `@theme` (`--text-display`, …). Prefer classes over re-declaring clamp/px.

Portfolio **mono labels** (`.type-label`) are part of the brand — craft-floor “no eyebrow” does **not** delete intentional `.type-label` markers on sections.

## When typesetting / polishing / any Impeccable edit

1. Apply **Code quality** above on every touch of TSX (especially `&&`, no comments, no dupes).
2. Map hard-coded `text-sm` / `text-[11px]` / random weights to a role when editing that block.
3. Prefer `<Title>`, `<Button>`, `<Section>`, `<Chip>`, `<Image>` over cloned markup.
4. Colors: only haui tokens; gradient text only with `.text-gradient` + flourish, sparingly.
5. Chrome: solid `bg-bg1`; gradient on **borders** (`.gradient` + `p-px`).
6. Stay inside PRODUCT/DESIGN — Experience mode, multi-theme.

## Commands most affected

`typeset` · `polish` · `layout` · `optimize` · `audit` · `extract` · `document` · `new-work` (do not greenfield a new kit).
