# AGENTS.md — haui.com.pe

Personal portfolio (Next.js 16 App Router, React 19, Tailwind v4). Two real routes: `/` and `/about`, plus 404. No backend or `app/api`; static data lives in `common/core/data/{domain}`.

## Coding style

Always apply [`.agents/skills/coding-preferences/SKILL.md`](.agents/skills/coding-preferences/SKILL.md) (author: **jujufer**). That skill wins over others on style/architecture conflicts: Zustand local-first, Context micro-only, co-location, native browser APIs, early returns with no `else`, no micro-types/trivial utils, boolean `&&` rendering, proper JSDoc (`@param`, `@default`, `@example`) only on reusable components — never pseudo fields like `descripcion:` / `propiedades:`.

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

- `coding-preferences` — style and architecture
- `shadcn-ui` + `web-design-guidelines` — primitives
- `vercel-react-best-practices` — performance
- `vercel-composition-patterns` — component APIs
- `tailwind-design-system` — v4 tokens

## How to add

- **Page:** thin `src/app/.../page.tsx` → `src/presentation/{route}/index.tsx`
- **Reusable component:** `src/common/components/{domain}/`
- **Future REST service:** `src/common/core/services/`
- **Notion content domain:** see [notion/AGENTS.md](notion/AGENTS.md) (`index` + `type` + `content` + `layer` + `internalDB?` + `databases/registry` + contentlayer)

## Do not reintroduce

`next-view-transitions`, `rimraf`, unused `sonner`, duplicate `framer-motion` (use `motion`), Headless UI after shadcn migration.
