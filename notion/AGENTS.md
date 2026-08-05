# AGENTS.md — Notion CLI (`notion/`)

Local pipeline: Notion database → MDX + images → Contentlayer. No `app/api`. Style still follows repo [coding-preferences](../.agents/skills/coding-preferences/SKILL.md).

## Layout

```
notion/
  index.ts              # CLI menus (numbers only)
  pages.ts              # NOTION_PAGES registry only
  pages.lib.ts          # listPages / defaultPage / generate()
  constants.ts          # env (NOTION_TOKEN, *_ID)
  api.ts                # Notion client
  databases/
    commonLayerConfigFields.ts   # shared Contentlayer fields
    imageContentStr.ts           # frontmatter image helpers
    {domain}/
      index.ts                   # DomainConfig (*Page)
      {domain}.type.ts             # Notion row types
      str.content.ts             # MDX frontmatter string
      {domain}.layerConfig.ts      # Contentlayer document type
  utils/
    generateDomain.ts   # shared generate engine
    generateBlock.ts    # one page → MDX + images
    traceYaml.ts        # content/{domain}/trace.yaml
    purgeLocal.ts       # delete local mdx/images/trace
    cli.ts              # ask / choose / confirm / runMenu
content/{domain}/*.mdx  # generated (incl. trace.yaml for smart)
public/content/{domain}/{id}/   # banner.webp (una imagen; ver DUAL_IMAGE_VARIANTS)
```

## Pipeline

```
NOTION_PAGES → generate(page) → generateDomain
  → query Notion → dirs → mapPool(generateBlock) → cleanup
  → kind smart: trace.yaml + diff (+ / ~ / =)
Contentlayer: content/{domain}/**/*.mdx → .contentlayer/generated
```

Engine owns: dirs, concurrency (3), title/`Última edición`/cover, blocks, cleanup, smart trace.  
Domain owns: `query` filter, `str.content` keys, `kind`, `generateContent`.

## Commands

| Command | What |
| -------- | ---- |
| `pnpm notion:generate` | Interactive CLI |
| `pnpm notion:generate --smart` | Default page (`default: true`) smart sync, no confirm |
| `pnpm notion:generate --all` | Default page full re-download |
| `pnpm build:content` | Contentlayer build only |

Env (`.env`): `NOTION_TOKEN`, plus one id per DB:

- `PROJECTS_ID` (or `PROJECTS_INDEX_ID`)
- `SERIES_ID` / `MARKS_ID` (same `*_INDEX_ID` fallback)
- New domain: add `FOO_ID` in [constants.ts](constants.ts)

### CLI (numbers only)

```
Notion sync
  1..N  pages from NOTION_PAGES.option
  0     Salir

Domain smart (projects):
  1 Sync inteligente  2 Descargar todo  3 Específicos  4 Eliminar  0 Volver

Domain basic (series/marks):
  1 Generar todo  2 Eliminar  0 Volver

Eliminar:
  1 Todos  2 Específicos  0 Volver
Confirms: 1 yes / 0 cancel
```

### kind

| kind | Behavior |
| ---- | -------- |
| `smart` | Diff vs `content/{id}/trace.yaml`; modes smart / all / selected; prune + cleanup |
| `basic` | Always regenerate all remotes; cleanup obsolete |

`generateContent: false` (series): cover/frontmatter only, no page body blocks.

---

## Add a new database

Example domain id: `blog` (folder name = `content/blog` = Contentlayer pattern).

### Checklist

1. **Env** — `BLOG_ID` in `.env` + [constants.ts](constants.ts)
2. **Folder** — `notion/databases/blog/`
3. **type** — `blog.type.ts`
4. **str.content** — frontmatter keys for the app
5. **index** — `blogPage` DomainConfig
6. **layerConfig** — Contentlayer fields = frontmatter keys
7. **Registry** — [pages.ts](pages.ts) key
8. **Contentlayer** — import + `documentTypes` in [contentlayer.config.ts](../contentlayer.config.ts)
9. **Generate** — interactive menu or future CLI flags
10. **Optional** — routes/queries under `src/` (outside this CLI)

### 1. `{domain}.type.ts`

Notion API shape for that DB. Required by the engine on every page:

- `properties.Name` (title)
- `properties['Última edición']` (last_edited_time)
- `cover?.external.url` (optional)
- Prefer `extends NotionDB` + `NotionMDVisibility` if you filter by Visibilidad

Copy from [series.type.ts](databases/series/series.type.ts) / [projects.type.ts](databases/projects/projects.type.ts).

### 2. `str.content.ts`

Builds YAML frontmatter only (body comes from blocks if `generateContent !== false`).

Signature:

```ts
(row: NotionXDB, coverUrl: string | undefined, props: MdxContentProps) => string
```

Rules:

- Use `yamlQuote()` for strings
- Images via `imageContentStr(imageProps, '{domain}', coverUrl ? id : undefined)`
- Extra body images only if the content needs them: `additionalImagesStr`
- Frontmatter keys must match Contentlayer `fields` **1:1**

Common keys (from [commonLayerConfigFields.ts](databases/commonLayerConfigFields.ts)):  
`id`, `title`, `created_time`, `last_edited_time`, `reading_time`, `words`, banner/thumb fields,  
`image_hash` (data URI blur for Unpic `background`), `image_blur` (CSS gradient placeholder).

Domain-specific keys stay only here (e.g. projects: `github`, series: `profesor`).

### 3. `index.ts` (DomainConfig)

```ts
export const blogPage = {
  id: 'blog',           // content/blog, public/content/blog
  label: 'Blog',        // CLI title
  option: 4,            // main menu number (unique)
  // default: true,     // at most one: target of --smart / --all
  kind: 'basic',        // or 'smart'
  // generateContent: false,
  query: {
    database_id: env.BLOG_ID,
    filter: { /* Notion filter */ }
  },
  content: blogContent
} as const satisfies DomainConfig<NotionBlogDB>
```

No custom generate function — engine is [generateDomain.ts](utils/generateDomain.ts).

### 4. `{domain}.layerConfig.ts`

Contentlayer document:

- `name`: PascalCase (`Blog`)
- `filePathPattern`: `{domain}/**/*.mdx` (ignore `trace.yaml` automatically — not mdx)
- Domain `fields` + `...commonLayerConfigFields`
- Nested types when MDX has complex structures (see projects `additional_images`)

`default` export the document type.

### 5. Wire up

**[pages.ts](pages.ts)** — only the object:

```ts
export const NOTION_PAGES = {
  projects: projectsPage,
  series: seriesPage,
  marks: marksPage,
  blog: blogPage
}
```

**[contentlayer.config.ts](../contentlayer.config.ts)**:

```ts
import BlogDocument from './notion/databases/blog/blog.layerConfig'
// documentTypes: [..., BlogDocument]
```

CLI menus rebuild from `option` order. Delete works for any domain that has local MDX / trace entries under `content/{id}`.

---

## Outputs

| Path | Role |
| ---- | ---- |
| `content/{id}/{pageId}.mdx` | Document |
| `content/{id}/trace.yaml` | Smart sync state (same folder as MDX; excluded from Contentlayer) |
| `public/content/{id}/{pageId}/` | `banner.webp` (+ `thumb.webp` solo si `DUAL_IMAGE_VARIANTS`) |

Imágenes: por defecto **una** variante (`banner.webp`). Unpic redimensiona en app.  
PX: en [`utils/downloadImage.ts`](utils/downloadImage.ts) set `DUAL_IMAGE_VARIANTS = true` para banner+thumb otra vez.

`cleanObsoleteFiles` never deletes `trace.yaml`.  
Purge (CLI Eliminar) removes mdx + image folder + updates/deletes trace.

---

## Shared utils (do not fork)

| Util | Role |
| ---- | ---- |
| `generateDomain` | All domains |
| `generateBlock` | Single page MDX |
| `getAllMarksDB` | Paginated Notion query |
| `mapPool` | Concurrency |
| `traceYaml` / `purgeLocal` | Smart + delete |
| `cli` | Interactive I/O |
| `yamlQuote` / `imageContentStr` | Frontmatter helpers |

---

## Do not

- Custom `generateX` that reimplements the pool/dirs/cleanup loop
- Put `trace.yaml` under `notion/databases/`
- Drift frontmatter keys vs layerConfig fields
- Letter-based CLI choices (numbers only)
- Call Notion or Contentlayer from `src/app/api` for this content (static generate offline)

## References (copy-first)

| Goal | Copy |
| ---- | ---- |
| Minimal basic domain | [series/](databases/series/) (`generateContent: false`) |
| Full body MDX basic | [marks/](databases/marks/) |
| Smart + rich frontmatter | [projects/](databases/projects/) |
