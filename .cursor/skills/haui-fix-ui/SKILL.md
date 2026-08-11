---
name: haui-fix-ui
description: >
  Orchestrates Impeccable design commands into a before/after polish pipeline for haui.com.pe
  interfaces. Run an initial audit, apply layout/typeset/polish (+ targeted fixes), then re-audit
  and report the score delta. Use when the user asks to polish UI, leave an interface "lista",
  run a form pass, audit+polish a section/page, improve alignment/spacing, or invokes
  haui-fix-ui / form-ui / impecable polish pipeline.
---

# haui-fix-ui

Pipeline de calidad visual **sobre Impeccable** (no reinventar su playbook).
Alinea la UI al sistema haui (`PRODUCT.md`, `DESIGN.md`, tokens, `coding-preferences`).

## When to use

- “Deja lista esta interfaz / sección / página”
- “Corre haui-fix-ui”
- “Audit + polish + re-audit”
- Un target concreto (ruta, archivo, componente) para dejar shipping-ready

## Prerequisites (agent must ensure)

1. Impeccable skill present:
   - Project: `.agents/skills/impeccable` and/or `.cursor/skills/impeccable`
   - If missing: `npx impeccable install` from repo root (project install; include cursor + codex/agents as needed)
2. Design context at repo root:
   - `PRODUCT.md` + `DESIGN.md` (create via `/impeccable init` then `/impeccable document` if absent)
3. Always also honor `.agents/skills/coding-preferences/SKILL.md` and `AGENTS.md` for architecture/tokens.

## Skill roots

Resolve Impeccable base (prefer project agents, then cursor):

```
.agents/skills/impeccable
.cursor/skills/impeccable
```

Use that path as `<impeccable>` below.

## Input

Require a **target**:

- Route or surface: e.g. `home hero`, `about achievements`, `/project/[id]`
- Or file/dir globs: e.g. `src/presentation/about/components/Achievements`

If the user only says “polish the UI” without scope, ask once for the target (prefer one surface, not the whole app).

Optional flags from the user:

- `dry-audit` — only before+after... no: dry = audit only once, no edits
- `light` — skip optional enhance passes (`typeset`/`layout` only if audit is already strong)
- `deep` — also run `critique` after audit-before (evaluative only; do not auto-rewrite from critique unless findings map to polish-safe fixes)

Default path is the full pipeline below.

---

## Pipeline (strict order)

Do **not** skip the bookend audits. Do **not** redesign the visual world; this pipeline is refinement.

### 0. Session bootstrap

```bash
node <impeccable>/scripts/context.mjs --target <resolved-path-or-route>
```

Follow its directives. Load once per session unless context.mjs requires otherwise.

Also read:

- [PRODUCT.md](../../../PRODUCT.md)
- [DESIGN.md](../../../DESIGN.md)
- Representative tokens: `src/common/style/themes/themes.css`, `src/app/globals.css`
- Target source files under `src/presentation/...` or `src/common/components/...`

### 1. Audit BEFORE (baseline — no code edits)

Load and follow:

- `<impeccable>/reference/audit.md`

Scope checks to the target (and its colocated styles/components only).

Also run the deterministic detector when the target resolves to files:

```bash
npx impeccable detect <paths-or-globs>
```

Capture a structured **Baseline Report**:

| # | Dimension | Score 0–4 | Key finding |
|---|-----------|-----------|-------------|
| 1 | Accessibility | | |
| 2 | Performance | | |
| 3 | Responsive Design | | |
| 4 | Theming | | |
| 5 | Implementation Integrity | | |
| **Total** | | **/20** | band |

List **P0 / P1 / P2** issues (max ~12 total; merge duplicates). Do not fix yet.

### 2. Plan the fix set

Map audit findings → Impeccable commands:

| Finding type | Command reference |
|--------------|-------------------|
| Spacing, rhythm, alignment, hierarchy | `layout` → `reference/layout.md` |
| Type hierarchy / measure / weight | `typeset` → `reference/typeset.md` |
| Final consistency / states / shipping | `polish` → `reference/polish.md` |
| Copy / labels / empty / errors (UX text) | `clarify` → `reference/clarify.md` |
| Breakpoints / touch / overflow | `adapt` → `reference/adapt.md` |
| Jank, oversized media, paint cost | `optimize` → `reference/optimize.md` |
| Overdone UI | `quieter` / `distill` only if score is dragged by density |

Default mandatory sequence when not `light`:

1. `layout` on target  
2. `typeset` on target  
3. `polish` on target  

Add `adapt` / `clarify` / `optimize` only for explicit P0–P1 findings in those domains.

Before any edit, load:

- `<impeccable>/reference/craft-floor.md`

Respect bans and quality floor. Preserve haui identity (themes, tokens, chrome rules in AGENTS.md). **No token replacement with generic AI palettes.**

### 3. Execute refine passes

For each selected command:

1. Load its `reference/*.md` fully
2. Apply **targeted diffs only** (no rewrite of the surface identity)
3. Stay inside target scope and shared primitives the target already uses
4. Prefer haui tokens (`bg*`, `fn*`, `gr-*`, semantic) over hex
5. Keep coding-preferences (early returns, `&&` render, no micro-utils, etc.)

Run detector mid-flight only if useful:

```bash
npx impeccable detect <touched-paths>
```

Fix verified defects in one batch; do not enter infinite polish loops.

### 4. Audit AFTER (same rubric)

Re-run audit.md + `npx impeccable detect` on the same scope with **identical scoring rules**.

Fill **After Report** with the same table.

### 5. Deliver the delta (user-facing)

Output in this order:

1. **Scope** — what was polished  
2. **Score before → after** — totals and per-dimension; show `Δ` (+/−)  
3. **What changed** — 3–8 bullets of concrete UI fixes (not file dumps)  
4. **Still open** — residual P1/P2 if any (or “shippable”)  
5. **Touches** — key files edited  

Example score line:

```
Total 12/20 (Acceptable) → 17/20 (Good)  Δ +5
A11y 2→3 · Perf 3→4 · Responsive 2→3 · Theming 3→3 · Integrity 2→4
```

Do not claim improvements without the after audit.

---

## Guardrails (haui-specific)

- **coding-preferences wins** on architecture/style conflicts with Impeccable taste.
- **Multi-theme portfolio**: never flatten to a single default “modern SaaS” look.
- **Navbar chrome**: solid `bg-bg1`, no glass default; gradient = border accent.
- **Images**: `@common/components/image` (unpic/nextjs); correct `layout` / `objectFit` / `sizes`.
- **Motion**: purposeful micro-motion via `motion/react` or CSS; honor `motion-reduce:`.
- Do **not** reintroduce banned stack (see AGENTS.md “Do not reintroduce”).
- Do **not** invent copy facts (clients, metrics, awards) not in product data.

## Modes

| User intent | Behavior |
|-------------|----------|
| Default form pass | Full pipeline 1→5 |
| `audit only` / `dry` | Step 1 only (and optional detect) |
| `light` | Audit → polish (+ layout if broken) → audit |
| `deep` | Audit → critique (read-only) → layout/typeset/polish + needed fixes → audit |

## Anti-patterns for this skill

- Skipping the closing audit  
- Redesigning the whole page under the word “polish”  
- Running bolder/overdrive/delight by default (only if user asks)  
- Editing unrelated routes “while we are here”  
- Dropping PRODUCT/DESIGN context or ignoring detector findings without reason  

## Quick invoke examples

```
haui-fix-ui about achievements
haui-fix-ui the home hero
haui-fix-ui src/presentation/home/components/Projects light
haui-fix-ui focus gallery
```

## Failure recovery

- Missing impeccable skill → install, then continue  
- Missing PRODUCT.md / DESIGN.md → run init + document (or stop and tell user if write not allowed)  
- Target not found → ask for path/route once  
- After score worse than before → revert harmful diffs you introduced and re-audit, report honestly  
