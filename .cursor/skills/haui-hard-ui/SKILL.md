---
name: haui-hard-ui
description: >
  Heavy ship UI pass for haui.com.pe. Same spine as fix:
  audit → extras → polish → extras → audit final, with full /20 scores,
  rich extras (layout/typeset/adapt/clarify/optimize), coding-preferences,
  vercel skills when needed, and at most one re-cycle if After is weak.
  Daily quick work → haui-fix-ui.
---

# haui-hard-ui (full / ship)

Pase **duro**. Mismo **esqueleto mínimo** que fix; extras amplios + re-ciclo limitado.

Día a día → **`haui-fix-ui`**.

## Esqueleto mínimo (obligatorio en fix y hard)

```text
AUDIT inicio  →  EXTRAS pre  →  POLISH  →  EXTRAS post  →  AUDIT final
```

- **audit** y **polish** de Impeccable: **siempre**, los dos.
- **Extras**: los que el audit pida (hard carga el set completo).
- **Interactividad:** sí, **limitada**. Tras Audit final, si el score es flojo → **un** re-ciclo  
  `(extras pre → polish → extras post → audit)` y para. Máx. 2 ciclos de edit.

## When to use

- Ship / “hard pass” / Δ formal /20  
- Tras varios `haui-fix-ui`  
- Cuando hacen falta optimize, Vercel skills o varios Impeccable cmds  

## Skills por debajo

| Skill | Dónde en el timeline |
|--------|----------------------|
| **coding-preferences** | Bootstrap + cada edit |
| **impeccable** `context.mjs` | Bootstrap |
| **impeccable** `audit.md` + detect | Audit inicio + Audit final (+ post re-ciclo) |
| **impeccable** `layout` / `typeset` / `adapt` / `clarify` | Extras pre (según findings) |
| **impeccable** `polish.md` | Polish (siempre) |
| **impeccable** `optimize` + **vercel-react-best-practices** | Extras post (perf) |
| **vercel-composition-patterns** | Extras post o pre si monolitismo |
| **impeccable** `critique.md` | Solo flag `+critique`, tras Audit inicio |
| **impeccable** `craft-floor.md` | Antes del primer edit de UI |

## Timeline

```text
T0  Bootstrap
    · skill: coding-preferences
    · CLI: node .agents/skills/impeccable/scripts/context.mjs --target <…>
    · Read: PRODUCT.md, DESIGN.md, target tree
         │
         ▼
T1  AUDIT inicio  (sin editar)                         ← SIEMPRE
    · impeccable/reference/audit.md → scores 0–4 × 5 = /20
    · CLI: npx impeccable detect <paths>
    · Baseline + P0/P1/P2 (≤12)
         │
    [flag +critique] → critique.md (read-only)
         │
         ▼
T2  EXTRAS pre-polish  (según findings; omitir lo que no aplique)
    · craft-floor.md
    · layout.md      (spacing / align)
    · typeset.md     (jerarquía tipo)
    · adapt.md       (mobile / overflow / touch)
    · clarify.md     (copy / labels / errores)
    · (+ composition patterns si la API del componente es el P0)
    · coding-preferences en cada edit
         │
         ▼
T3  POLISH                                               ← SIEMPRE
    · impeccable/reference/polish.md
    · estados, tokens haui, focus, motion-reduce, ship
         │
         ▼
T4  EXTRAS post-polish  (según findings residuales)
    · optimize.md + vercel-react-best-practices   (perf / images / client)
    · vercel-composition-patterns               (si sigue monolitismo)
    · layout / typeset residuales si polish abrió huecos
    · CLI: npx impeccable detect <touched>
         │
         ▼
T5  AUDIT final                                          ← SIEMPRE
    · audit.md + detect → After + Δ vs Before
         │
         ├── Gate re-ciclo?  (ver abajo)
         │         NO ─────────────────────────────► T8 Deliver FIN
         │         SÍ
         ▼
T6  RE-CICLO (1 sola vez): EXTRAS pre → POLISH → EXTRAS post
    · Solo P0 / regresión / dims que bajaron
    · Nunca un tercer ciclo
         │
         ▼
T7  AUDIT final #2
    · audit.md + detect
         │
         ▼
T8  Deliver FIN
    Before → After [→ After2] · bullets · residual · files
```

### Gate re-ciclo (interactividad)

**Sí (1 ciclo)** si After #1 cumple **cualquiera**:

| Condición | Ejemplo |
|-----------|---------|
| Total After **&lt; 14/20** | 11/20 |
| **P0** abierto | a11y critical |
| Total After **&lt;** Before | regresión |

**No** si After ≥ 14, sin P0, no bajó; flag `dry`; o ya hubo re-ciclo.

## Modes

| Flag | Comportamiento |
|------|----------------|
| (default) | Timeline + gate |
| `+critique` | critique tras Audit inicio |
| `dry` | Solo Audit inicio (T0–T1) |

## Output

```
Total 12/20 → 17/20  Δ +5
A11y · Perf · Responsive · Theming · Integrity
Extras pre: layout, typeset
Polish: yes
Extras post: optimize + vercel-react-best-practices
Interactive: yes (max 1 re-ciclo)
```

## Examples

```
haui-hard-ui about achievements
haui-hard-ui src/presentation/project
haui-hard-ui home projects +critique
haui-hard-ui focus gallery dry
```

## Failures

| Problem | Action |
|---------|--------|
| Quick pass | Redirect `haui-fix-ui` |
| Score still low post re-ciclo | Residual honest; stop |
| Missing impeccable | `npx impeccable install` |
