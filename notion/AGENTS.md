# AGENTS.md — Notion CLI (`notion/`)

Local pipeline: Notion database → MDX + images → Contentlayer. No `app/api`. Style: [coding-preferences](../.agents/skills/coding-preferences/SKILL.md).

## Layout

```
notion/
  index.ts                 # entry: DOMAINS + run()
  lib/
    api.ts env.ts types.ts
    layerFields.ts frontmatter.ts
    registry.ts            # list/default/generate helpers
    cli.ts                 # menus (caja negra)
  databases/
    registry.ts            # DOMAINS = [projects, series, marks]
    {domain}/
      index.ts             # DomainConfig
      type.ts              # fila Notion
      content.ts           # frontmatter MDX
      layer.ts             # Contentlayer document
  utils/                   # motor (generate, mdx, image, query, local, assets, cli I/O)
```

## Entry

```ts
// notion/index.ts
import { DOMAINS } from './databases/registry'
import { run } from './lib/cli'
void run(DOMAINS, process.argv.slice(2))
```

CLI (menús, delete, flags `--all`/`--smart`) vive en `lib/cli.ts`. No código de menú en `index`.

## Estándar por dominio (4 archivos)

| Archivo | Rol |
| --- | --- |
| `index.ts` | `DomainConfig`: id, label, option, kind, query, content, `internalDB` |
| `type.ts` | Un tipo de fila Notion |
| `content.ts` | `(row, cover, props) => frontmatter` |
| `layer.ts` | `defineDocumentType` + fields domain + `...commonLayerFields` |

### `internalDB` (opcional)

```ts
internalDB: null  // default: sin child DB

internalDB: {
  name: 'metadata', // título child_database
  fields?: { tipo?: 'Tipo'; id?: 'ID'; leyenda?: 'Leyenda' }
}
```

Motor: si `internalDB` está set, `utils/assets/loadInternalAssets` lee Tipo/ID/Leyenda (Logo | Imagen | Autores). Si no, salta.

### Nuevo dominio

1. Env id en `lib/env.ts`
2. Folder `databases/{id}/` con los 4 archivos
3. Añadir a `databases/registry.ts`
4. Importar `layer` en `contentlayer.config.ts`

## Código

- Sin micro-wrappers (`isNull`, etc.): expresión inline.
- Util reutilizable no trivial → toolkit npm, no inventar helpers basura.
- Tipos densos en `lib/types.ts`; domain `type.ts` exporta una fila.

## Commands

| Command | What |
| --- | --- |
| `pnpm notion:generate` | CLI interactivo |
| `pnpm notion:generate --smart` | Domain default, smart |
| `pnpm notion:generate --all` | Domain default, full |
| `pnpm build:content` | Contentlayer |

## Motor (`utils/`)

- `generate/generateDomain` + `generateBlock` — pool, dirs, trace, content
- `assets/loadInternalAssets` — child DB genérica por config
- `mdx/` — HTML → body, tags, decorators
- `image/` — download / blurhash
- `query/fetch` — blocks + database rows
- `local/` — fs, trace, purge
- `cli/` — ask/runMenu/log (I/O bajo)

## Do not

- Fork del generate loop por dominio
- Menús en `index.ts` o en folders de domain
- `if (id === 'projects')` para assets (usar `internalDB`)
- Micro-utils de una línea
- `app/api` para este contenido
