# AGENTS.md — haui.com.pe

Personal portfolio (Next.js 16 App Router, React 19, Tailwind v4). Two real routes: `/` and `/about`, plus 404. No backend or `app/api`; static data lives in constants.

## Coding style

Always apply [`.agents/skills/coding-preferences/SKILL.md`](.agents/skills/coding-preferences/SKILL.md) (author: **jujufer**). That skill wins over others on style/architecture conflicts: Zustand local-first, Context micro-only, co-location, native browser APIs, early returns with no `else`, no micro-types/trivial utils, boolean `&&` rendering, proper JSDoc (`@param`, `@default`, `@example`) only on reusable components — never pseudo fields like `descripcion:` / `propiedades:`.

## Stack

- Next 16, React 19, TypeScript 7 (`experimental.useTypeScriptCli`)
- Tailwind v4 (CSS-first), `next-themes` (themes: light, juli, rebecca, dark, sam, andrea)
- Zustand (+ Immer for complex nested updates)
- shadcn/ui under `src/common/components`, mapped to haui tokens
- `@unpic/react` for images
- `motion` for UI micro-interactions (not page transitions)
- Native View Transitions API (CSS) for `/` ↔ `/about`

## Folders

```
src/app/                 # routes, layout, globals.css, robots/sitemap
src/common/
  components/            # shadcn/haui primitives (button, card, dialog, …)
  core/                  # cn, constants, queries, contact, services (future REST)
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

`common/core/constants` → `common/core/queries` + Zustand stores in presentation → view components.

Children that can read the store do so with fine-grained selectors; no prop-drilling of store data. Context is micro-only (subcomponents inside a primitive).

## Components

- Domain folder: `{name}/index.tsx`, `const X: FC<Props> = …`, `export default`
- shadcn output goes into domain folders (no redundant `ui/` layer)
- Extend in-place only when it adds value (e.g. Button `href` → `Link`)
- Images via `@common/components/image` (`@unpic`)
- Co-location: `components/`, `hooks/`, `store/` only when needed

## Themes and shadcn

haui tokens: `--bg1/2/3`, `--fn1/2/A`, `--gr-*`. Bridge to shadcn variables (`--background` → `--bg1`, etc.) in `common/style/themes`. Do not replace the multi-theme palette with default zinc/slate.

## Routes / motion

- Page: CSS `::view-transition-old/new(root)` blur-fade + `experimental.viewTransition`
- UI: `motion/react` (`AnimatePresence`, `layout`, hover)
- Do not reintroduce `next-view-transitions`

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

## Do not reintroduce

`next-view-transitions`, `rimraf`, unused `sonner`, duplicate `framer-motion` (use `motion`), Headless UI after shadcn migration.
