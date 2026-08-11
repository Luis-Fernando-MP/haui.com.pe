---
name: haui-fix-ui
description: >
  Fast UI fix for haui.com.pe. Minimum Impeccable spine always:
  audit → extras → polish → extras → audit final. Light extras only (layout
  etc.), coding-preferences, no Vercel skills, no re-loop on low score. Daily
  use; ship/hard pass → haui-hard-ui.
---

# haui-fix-ui (fast)

Pase **rápido** del día a día. Sigue el **mismo esqueleto mínimo** que hard; los
extras son pocos y baratos.

Ship / check duro → **`haui-hard-ui`**.

## Esqueleto mínimo (obligatorio en fix y hard)

```text
AUDIT inicio  →  EXTRAS pre  →  POLISH  →  EXTRAS post  →  AUDIT final
```

- **audit** y **polish** de Impeccable: **siempre**, los dos.
- **Extras**: opcionales según findings; en fix solo los baratos (ver abajo).
- **Interactividad:** no. Un ciclo completo y FIN (no reintenta si el score final es bajo).

## Token budget

- **Un target** (file / folder / surface). Si falta → pregunta una vez.
- Max ~8 files de target.
- Siempre: `coding-preferences` antes de editar; `audit.md` ×2; `polish.md`.
- **No** load: vercel-react-best-practices, vercel-composition-patterns, critique, optimize full.
- Extras pre/post en fix: solo `layout` (y `craft-floor` si reestructuras). Skip typeset/adapt/clarify salvo P0 obvio y barato en el target.
- `context.mjs` solo si PRODUCT/DESIGN no están en sesión.

## Timeline

```text
T0  Bootstrap
    · Target
    · skill: coding-preferences
    · opcional: PRODUCT.md + DESIGN.md
    · opcional: node …/impeccable/scripts/context.mjs --target <…>
         │
         ▼
T1  AUDIT inicio  (sin editar)                    ← SIEMPRE
    · impeccable/reference/audit.md
    · scores ligeros OK (tabla corta o /20 si cabe en presupuesto)
    · CLI: npx impeccable detect <target> (recomendado)
    · Lista P0/P1 del target (≤8)
         │
         ▼
T2  EXTRAS pre-polish  (solo si findings lo piden)
    · craft-floor.md si vas a reestructurar UI
    · layout.md  si spacing / align / overflow (P0–P1)
    · (skip typeset / adapt / clarify / optimize / vercel / critique)
    · coding-preferences en cada edit
         │
         ▼
T3  POLISH                                          ← SIEMPRE
    · impeccable/reference/polish.md
    · tokens, estados, focus, motion-reduce, ship surface
         │
         ▼
T4  EXTRAS post-polish  (solo si quedó hueco barato)
    · layout.md residual (align roto tras polish)
    · detect mid-flight opcional en paths tocados
    · NO optimize / vercel / composition
         │
         ▼
T5  AUDIT final                                     ← SIEMPRE
    · audit.md (+ detect recomendado)
    · After vs Before (Δ corto)
         │
         ▼
T6  Deliver → FIN  (sin re-loop)
```

## Extras permitidos en fix

| Fase | Extra | Cuándo |
|------|--------|--------|
| pre | `layout` | Align / spacing / overflow P0–P1 |
| pre | `craft-floor` | Antes de reestructurar |
| post | `layout` residual | Solo si polish dejó huecos |
| post | `detect` CLI | Paths tocados |

**Prohibidos en fix:** `typeset` full, `adapt`, `clarify` full, `optimize`, `critique`, vercel-* → redirige a hard si hacen falta.

## Flags

| Flag | Comportamiento |
|------|----------------|
| (default) | Timeline completo arriba |
| `dry` | Solo Audit inicio (T0–T1); no edits |

## Output

```
Scope: …
Audit before: …/20 (o bullets P0/P1)
Extras pre: layout | none
Polish: yes
Extras post: … | none
Audit after: …/20  Δ …
Fixed: (3–6 bullets)
Files: …
Interactive: no
```

## Examples

```
haui-fix-ui about achievements
haui-fix-ui the home hero
haui-fix-ui src/presentation/home/components/HeroHeader
haui-fix-ui Contact dry
```

## Failures

| Problem | Action |
|---------|--------|
| No target | Ask once |
| Need deep ship / vercel / many extras | `haui-hard-ui <target>` |
| PRODUCT/DESIGN missing | Mention once; still run audit+polish |
