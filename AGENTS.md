# AGENTS.md — haui.com.pe

Personal portfolio (Next.js 16 App Router, React 19, Tailwind v4). Two real routes: `/` and `/about`, plus 404. No backend or `app/api`; static data lives in `common/core/data/{domain}`.

## Coding style

Always apply [`.agents/skills/coding-preferences/SKILL.md`](.agents/skills/coding-preferences/SKILL.md) (author: **jujufer**). That skill wins over others on style/architecture conflicts: Zustand local-first, Context micro-only, co-location, native browser APIs, early returns with no `else`, no micro-types/trivial utils, **boolean `&&` rendering (never ternary for show/hide)**, no narrative comments (JSDoc only on true reusables), proper JSDoc (`@param`, `@default`, `@example`) only on reusable components — never pseudo fields like `descripcion:` / `propiedades:`.

Impeccable / fix / hard must also follow [`.agents/skills/impeccable/reference/haui.md`](.agents/skills/impeccable/reference/haui.md): standard components, type roles + weights, semantic HTML, no dead-code comments, no duplicated markup, performance-aware media and client boundaries.

## Stack

- Next 16, React 19, TypeScript 7 (`experimental.useTypeScriptCli`)
- Tailwind v4 (CSS-first), `next-themes` (themes: light, juli, rebecca, dark, sam, andrea, shei)
- Zustand (+ Immer for complex nested updates)
- shadcn/ui under `src/common/components`, mapped to haui tokens
- `@unpic/react` for images
- `motion` for UI micro-interactions (not page transitions)
- Native View Transitions API (CSS) for `/` ↔ `/about`

## Folders

```
src/app/                 # routes, layout, globals.css, robots/sitemap
src/common/
  components/            # shadcn/haui primitives (button, card, dialog, popup, theme-transition, …)
  icons/                 # custom SVG marks (e.g. GitHub brand)
  core/                  # cn, data/{domain}, queries, contact, services (future REST)
  metadata/              # SEO, fonts, robots, sitemap
  style/themes/          # theme variables + shadcn bridge
src/presentation/        # views per route (home, about, not-found)
public/                  # stable portfolio assets
```

## Aliases

- `@/*` → `src/*`
- `@common/*` → `src/common/*`
- `@presentation/*` → `src/presentation/*`

## Data flow

`common/core/data/{domain}` → `common/core/queries` + Zustand stores in presentation → view components.

Children that can read the store do so with fine-grained selectors; no prop-drilling of store data. Context is micro-only (subcomponents inside a primitive).

## Components

- Domain folder: `{name}/index.tsx`, `const X: FC<Props> = …`, `export default`
- shadcn output goes into domain folders (no redundant `ui/` layer)
- Extend in-place only when it adds value (e.g. Button `href` → `Link`)
- Images via `@common/components/image` (`@unpic`)
- Co-location: `components/`, `hooks/`, `store/` only when needed

### Standard library (`src/common/components`) — reuse first

Agents (Impeccable, fix/hard) **must invent nothing parallel**. Import from here:

| Component | Path | Use |
|-----------|------|-----|
| `Button` | `button/` | CTAs, outline/ghost/link, `status`, `size="icon"`, `href`→Link |
| `Card` / `CardTabs` | `card/`, `card-tabs/` | Interactive cards / tabbed cards |
| `Chip` | `chip/` | Tags / filters (`active` + `onClick`) |
| `DateFormat` | `DateFormat/` | **All** visible dates/times (no raw `toLocaleDateString` / ad-hoc dayjs in views) |
| `Dialog` / `Popover` | `dialog/`, `popover/` | Modal / popover |
| `FocusGallery` | `focus-gallery/` | Full-screen gallery / lightbox |
| `Footer` / `FooterGradient` | `footer/`, `footer-gradient/` | Chrome |
| `Image` | `image/` | Only media path (unpic → `/_next/image`) |
| `Input` / `Select` | `input/`, `select/` | Forms |
| `MDX` | `mdx/` | Content |
| `Navbar` | `navbar/` | Floating dock chrome |
| `Popup` | `popup/` | Floating compound UI (not Headless) |
| `Title` | `title/` | Display titles (`.type-display`) |
| `Section` | `section/` | Region shell + title/subtitle |
| `ThemeChanger` / `ThemeTransition` | `theme-changer/`, `theme-transition/` | Theme only via these |

Ban: parallel local Button/Chip/dialog kits, raw `<img>` when Image applies, ad-hoc date formatting, Headless menus, hex theme surfaces. Impeccable pin: `.agents/skills/impeccable/reference/haui.md`.

## Typography (tokens + Tailwind)

**Defined in** `src/app/globals.css` (`@theme` size tokens + `.type-*` role classes).  
**Colors/themes** remain in `src/common/style/themes/themes.css`. PostCSS: `postcss.config.mjs`.

| Role | Class / utility | Size | Weight | Job |
|------|-----------------|------|--------|-----|
| Display | `.type-display` / `text-display` | `clamp(2rem, 5.5vw, 3.5rem)` | 700 | Heroes / `<Title>` |
| Display sm | `.type-display-sm` | `clamp(1.75rem, 4vw, 2.75rem)` | 700 | Featured cards |
| Title | `.type-title` | `clamp(1.5rem, 3vw, 2.25rem)` | 700 | Mid titles |
| Heading | `.type-heading` | `1.25rem` | 600 | h3 / card titles |
| Subheading | `.type-subheading` | `1.125rem` | 600 | h4 |
| Body | `.type-body` / `text-body` | `1rem` | 400 | Paragraphs |
| Lead / body sm | `.type-lead` / `.type-body-sm` | `0.875rem` | 400 | Support (`fn2`) |
| Label | `.type-label` | `0.6875rem` mono | 500 | Uppercase meta |
| Caption | `.type-caption` | `0.625rem` | 500 | Chips / dense meta |
| Button | `.type-button` (`sm` → `.type-button-sm`) | `0.875` / `0.75rem` | 500 | Controls |
| Link | `.type-link` | `0.875rem` | 500 | Links |

- Prefer roles over magic `text-[11px]` / `text-5xl` one-offs when touching type.
- Families: `font-geist` (UI), `font-mono` (labels), `font-flowers` / `.type-flourish` (brand word only).
- Full detail: `DESIGN.md` + `.agents/skills/impeccable/reference/haui.md`

## Themes and shadcn

haui tokens: `--bg1/2/3`, `--fn1/2/A`, `--gr-*`, plus semantic status colors. Bridge to shadcn variables (`--background` → `--bg1`, `--destructive` → `--semantic-danger`, etc.) in `common/style/themes`. Do not replace the multi-theme palette with default zinc/slate.

### Semantic colors

Every theme defines its own status palette (tuned to that theme’s contrast):

| Token                     | Tailwind                                 | Use                  |
| ------------------------- | ---------------------------------------- | -------------------- |
| `--semantic-danger`       | `bg-semantic-danger`, border accents     | fill / surface tint  |
| `--semantic-warning`      | `bg-semantic-warning`                    | fill / surface tint  |
| `--semantic-info`         | `bg-semantic-info`                       | fill / surface tint  |
| `--semantic-success`      | `bg-semantic-success`                    | fill / surface tint  |
| `--semantic-text-danger`  | `text-semantic-text-danger`, `.danger`   | readable status text |
| `--semantic-text-warning` | `text-semantic-text-warning`, `.warning` | readable status text |
| `--semantic-text-info`    | `text-semantic-text-info`, `.info`       | readable status text |
| `--semantic-text-success` | `text-semantic-text-success`, `.success` | readable status text |

Prefer these tokens over ad-hoc red/green hex or Tailwind default `red-*` / `green-*`. Themes live in `src/common/style/themes/themes.css`; expose new ones via `@theme` in `globals.css` (`--color-semantic-*`).

`Button` accepts `status="danger" | "warning" | "info" | "success"` for tinted status surfaces (pairs fill + `--semantic-text-*`).

Themes: `light`, `juli`, `rebecca`, `dark`, `sam`, `andrea`, `shei` — each should feel professional (readable contrast, restrained gradients), not neon clutter. `shei` is a near-black graphite dark with muted dusty rose / sage / steel gradients (not greyscale-only).

Floating menus use the compound `Popup` (`Popup.Header` / `Popup.Content` / `Popup.Footer`) under `common/components/popup` — not Headless UI.

## Routes / motion

- Page: CSS `::view-transition-old/new(root)` blur-fade + `experimental.viewTransition`
- Theme toggle: black-box `common/components/theme-transition` (`ThemeTransition` + colocated CSS). Types: `circle` | `circle-with-blur` | `circle-blur-top-left` | `polygon` | `polygon-gradient` | `png` (`/assets/mask.webp`). Intercepts `html` theme class changes — consumers only call `setTheme`. Does not replace page blur
- UI: `motion/react` (`AnimatePresence`, `layout`, hover)
- Do not reintroduce `next-view-transitions`

## Chrome UI (navbar and floating surfaces)

Keep the modern floating chrome established in `common/components/navbar`:

- **Solid theme surfaces** — use `bg-bg1` (no transparency / backdrop-blur on the nav shell). Colors only from haui tokens (`bg*`, `fn*`, `gr-*`), never ad-hoc hex.
- **Rounded language** — soft `rounded-2xl` at rest; compact `rounded-full` pill when scrolled / docked.
- **Scroll-aware dock** — shrink to measured `fit` width after ~10% scroll (`useIntersectionObserver`, gate on `entry != null`). Animate **pixel widths** with `motion` + a smooth cubic ease (e.g. `[0.22, 1, 0.36, 1]`); avoid `layout` springs that jump. Gradient accent belongs on the **border** (wrapper `p-px` + `.gradient`), not as the fill.
- **Motion** — intentional micro-motion only (`motion/react`): width, radius, opacity, active-link `layoutId`. No page-transition libraries.
- **Typography / links** — `whitespace-nowrap`, `shrink-0`; no text wrap in the bar. Active nav uses a sliding highlight (`layoutId`), not heavy underlines.
- **Density** — fixed compact bar height (`h-14` inside ~`h-20` header). Prefer polish over extra chips or clutter.

## Repo skills

Canonical set under [`.agents/skills/`](.agents/skills/) (see [README — Agent skills](README.md#agent-skills)):

| Skill | Role |
|-------|------|
| `coding-preferences` | Architecture & code style (authoritative) |
| `impeccable` | Design craft commands (`audit`, `polish`, `layout`, …) |
| `haui-fix-ui` | Daily: **audit → extras → polish → extras → audit**; light extras; no re-cycle |
| `haui-hard-ui` | Ship: same spine + full extras/vercel; max 1 re-cycle if After weak |
| `vercel-react-best-practices` | React/Next performance (hard extras post) |
| `vercel-composition-patterns` | Component composition APIs (hard extras) |

Update Impeccable: `pnpm impeccable:update` · Detector: `pnpm impeccable:detect`

Removed as redundant with Impeccable / design system: `web-design-guidelines`, `tailwind-design-system`, `shadcn-ui`, `find-skills`.

## How to add

- **Page:** thin `src/app/.../page.tsx` → `src/presentation/{route}/index.tsx`
- **Reusable component:** `src/common/components/{domain}/`
- **Future REST service:** `src/common/core/services/`
- **Notion content domain:** see [notion/AGENTS.md](notion/AGENTS.md) (`index` + `type` + `content` + `layer` + `internalDB?` + `databases/registry` + contentlayer)

## Do not reintroduce

`next-view-transitions`, `rimraf`, unused `sonner`, duplicate `framer-motion` (use `motion`), Headless UI after shadcn migration.
