---
name: coding-preferences
description: >
  jujufer's architecture and coding-style philosophy for any project (React,
  TypeScript, Next.js, or others). Covers Zustand local-first, Context micro-only,
  co-location, native browser APIs, early returns with no else, no micro-types or
  trivial utils, boolean && rendering, Spanish JSDoc only on reusable
  components/utilities, type inference first, atomic components, and lean
  performance. Use whenever writing, reviewing, refactoring, or designing
  components, stores, typing, folder structure, or UI logic.
license: MIT
metadata:
  author: jujufer
  version: "1.0.0"
---

# Coding Preferences — jujufer

These rules define how code must be written in **any** project by this author.
When they conflict with generic habits from other skills (shadcn, Vercel best practices, etc.), **this skill wins** on style and architecture.

Code must be clean, self-explanatory, thoughtfully typed, lean, and highly optimized: no filler wrappers, no one-line utility files, no narrative comments.

---

## 1. Code style

### 1.1 No narrative comments

- Zero comments that explain the obvious or narrate the flow.
- Code should speak for itself: clear names, early returns, just-enough typing.
- Only exception: Spanish JSDoc on reusable components or utilities that are **truly** worth documenting (see §1.5).

### 1.2 No trivial utils

- Unnecessary `utils` files and one-line helpers are forbidden.
- Do not extract `isEmpty`, `isNull`, `noop`, or wrappers that only forward an expression.
- Extract a helper only when it is **complex** and **actually reused**.
- Prefer the expression inline at the call site.

```ts
// bad
const isEmpty = list.length === 0
if (isEmpty) return null

// good
if (list.length === 0) return null
```

### 1.3 Trivial boolean / intermediate variables

- Do not create `const isX = ...` if the condition fits inline in an `if`, `&&`, or return.
- An intermediate name is fine when the expression is long, reused, or clarifies real domain meaning (not cosmetic clarity).

### 1.4 Conditional render: `&&`, not ternaries

- To show/hide UI: use `&&`, **never** `cond ? <A /> : null` or `cond ? <A /> : <B />` for show/hide.
- If there are two distinct UI branches: early return or separate blocks, not a JSX ternary.
- The condition must be an **explicit boolean**. Watch for `0` and `""` rendering on screen:

```tsx
// bad — renders 0 when length is 0
{list.length && <List />}

// bad — ternary for show/hide
{open ? <Dialog /> : null}
{open ? <A /> : <B />}

// good
{list.length > 0 && <List />}
{Boolean(items?.length) && <List />}
{open && <Dialog />}
```

### 1.5 Spanish JSDoc (only where it earns its place)

- Only on reusable components or complex utilities worth documenting.
- **Never** on types / interfaces / type aliases.
- Place it **on the component or function**, not on `Props`.
- Format (labels stay in Spanish as required by the author):

```ts
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  variant?: 'normal' | 'border' | 'active' | 'gradient' | 'transparent'
}

/**
 * Button
 * descripcion: botón de UI; si recibe href renderiza Link de Next.js con el mismo estilo
 * propiedades:
 * - href?: string — si existe, el nodo es un Link
 * - variant?: "normal" | "border" | "active" | "gradient" | "transparent" — default "transparent"; define el look
 * ejemplos: <Button variant="border">Ok</Button> / <Button href="/about">About</Button>
 */
const Button: FC<Props> = ({ href, children, ...props }) => { ... }

export default Button
```

JSDoc must include:
1. title (component/utility name)
2. `descripcion:` short and precise
3. `propiedades:` name, type, default, what it does; if a union, list values (`"active"`, `"inactive"`, …)
4. `ejemplos:` usage examples

### 1.6 No micro-types

- If a shape is **not** reused elsewhere, type it **inline**.
- Do not invent `interface Metadata`, `type Options`, `type ItemProps` just to nest a one-off object.

```ts
// bad
interface Metadata {
  phone: string
  country: string
}

interface User {
  name: string
  metadata: Metadata
}

// good
interface User {
  name: string
  metadata: {
    phone: string
    country: string
  }
}
```

If the same shape is used across multiple public contracts, then a named type is justified.

### 1.7 Inference first

- Do not type everything “for hygiene”.
- Let TypeScript infer.
- Add types when:
  - the public contract requires it (`Props` on a reusable component, exported API)
  - TS cannot infer well
  - there is real ambiguity that would break the design

### 1.8 Early returns — zero `else`

- Everything via guard clauses / early returns.
- **Do not use `else`** or nested conditionals with `else`.
- Avoid `if/else` pyramids.

```ts
// bad
function load(user?: User) {
  if (user) {
    if (user.active) {
      return user.data
    } else {
      return null
    }
  } else {
    return null
  }
}

// good
function load(user?: User) {
  if (!user) return null
  if (!user.active) return null
  return user.data
}
```

### 1.9 Component shape

For domain components (especially reusable ones):

```
{domain}/
  index.tsx
```

- Arrow function + `FC<Props>` (or `forwardRef` only when a real ref is needed).
- `interface Props {}` (may extend `HTMLAttributes` / native attrs).
- `export default` the component.
- No empty wrapper layers “for architecture”.

---

## 2. Granularity and state (local-first)

### 2.1 Atomic, self-sufficient components

- Each component should be low-level, granular, and as self-sufficient as possible.
- Prefer small pieces with one clear responsibility.

### 2.2 Direct store access (anti prop-drilling)

- With Zustand: if a child can consume the store, **do not** pass that data parent → child via props.
- Avoids prop drilling and unnecessary parent re-renders.
- The child uses **fine-grained selectors** and reads only what it needs:

```ts
// bad — wide subscription + drilling
const state = useStore()
<Child data={state.items} filter={state.filter} />

// good
const items = useStore(s => s.items)
const filter = useStore(s => s.filter)
```

```ts
// bad in child — props that only forward the store
const Child = ({ items }: { items: Item[] }) => ...

// good — child talks to the store
const Child = () => {
  const items = useStore(s => s.items)
  ...
}
```

Props still make sense for: local presentation config, children, slots, data that **does not** live in a store, and APIs of generic reusable components.

### 2.3 Complex state → Zustand + Immer

- Nested transforms or complex updates: **Immer** with Zustand.
- Do not add `immer` “just in case”; only when the case justifies it.

### 2.4 High-load components

- Dense lists, repeated cards, heavy trees: justified `React.memo` and advanced memoization.
- No cosmetic `useMemo` / `useCallback` on light components.
- Be selective: memoize where re-render cost is real, not by habit.

---

## 3. Context vs Store (hard boundaries)

| Mechanism | Allowed | Forbidden |
| --------- | ------- | --------- |
| **React Context** | Micro-scope: communication between internal subcomponents of a primitive (e.g. internals of a Button or Card compound) | Full views, pages, large modules, section headers with many children |
| **Zustand** | Sections, modules, headers, features, pages, shared state across multiple child levels | — |

- Context on full pages/sections causes mass re-renders → **forbidden**.
- For a large module with several child levels: Zustand store, not Context.

---

## 4. Co-location (structure mirrors dependency)

Folders must reflect hierarchy and explicit dependency:

```
common/components/button/
├── index.tsx                 # main entry
├── hooks/                    # custom hooks owned by this component
├── helpers/                  # utilities only if complex and necessary
├── store/                    # dedicated Zustand store if the component is very large
├── context/                  # Context exclusive to its internal subcomponents
└── components/               # subcomponents that belong only to Button
    └── label/
        ├── index.tsx
        └── components/       # deeper level if needed
```

Keep it light:

- **Do not** create `hooks/`, `helpers/`, `store/`, `context/` just to have them.
- If it can be simple with fewer files, do that.
- A subcomponent in `button/components/label` means **100%** architectural dependence on the button.
- Same idea in views: `presentation/{page}/components/...`.

---

## 5. Native browser APIs

Prefer the platform over heavy libraries.

| API / tool | Use |
| ---------- | --- |
| `BroadcastChannel` | sync events across tabs |
| `IntersectionObserver` | load / viewport triggers; prefer **usehooks-ts** when enough |
| `WeakMap` / `WeakSet` | local caches or in-memory refs without leaks |
| `requestAnimationFrame` | visual updates synced to refresh rate |
| `requestIdleCallback` | secondary work (analytics, preload, sync) during CPU idle |
| CSS `transform` / `opacity` (e.g. `translate3d`) | GPU animations |
| View Transitions API | native route / morph transitions; the browser does the heavy work — do not saturate the React thread |

- For IntersectionObserver and similar: prefer **usehooks-ts** (`useIntersectionObserver`, etc.) before inventing custom hooks.
- Page animations: prefer native View Transitions (CSS / `document.startViewTransition` / Next integration) over heavy JS wrappers for a global fade.
- `motion` / Framer Motion: for UI micro-interactions (`AnimatePresence`, `layout`, hover/active), not to replace route VT when native is enough.

---

## 6. Performance (lean code)

- Highly optimized, no wrappers or trivial utility files.
- Fine-grained Zustand selectors.
- Do not subscribe to the entire store.
- Do not mount hidden UI “just in case” (e.g. dozens of hidden `<img>`); open modals from store data instead.
- Respect `prefers-reduced-motion`.
- Dynamic import / deferred load for heavy pieces (WebGL, editors, etc.).
- Prefer GPU work (`transform`/`opacity`) and native APIs over expensive animation reconciliation in React.

---

## 7. Quick checklist before merge / when generating code

- [ ] Narrative comments? Remove them.
- [ ] One-line utils/helpers? Inline them.
- [ ] Any `else`? Rewrite with early returns.
- [ ] Render ternaries? Switch to `&&` with an explicit boolean.
- [ ] One-off micro-types? Inline them.
- [ ] Over-typed? Let TS infer.
- [ ] Prop-drilling store data? Child reads the store with a fine selector.
- [ ] Context on a page/section? Move to Zustand.
- [ ] Empty/premature `hooks/` `helpers/` `store/` folders? Do not create them.
- [ ] JSDoc on a type? Remove it; JSDoc only on reusable component/utility, in Spanish, per §1.5.
- [ ] Can a native API or usehooks-ts cover it? Prefer that.

---

## 8. Priority over other skills

Conflict resolution order:

1. **coding-preferences (this skill)** — author’s style and architecture
2. Repo domain skills (design system, shadcn adapted to project themes, etc.)
3. Generic performance/composition skills (Vercel, etc.) — apply them **without** violating §1–§6

Resolution examples:

- A best practice suggests an `isEmpty` helper → **no**; inline.
- A guide suggests Context for a page layout → **no**; Zustand.
- A lib suggests memoizing everything → **no**; only justified high-load cases.
- shadcn brings `ui/` + empty wrapper → avoid redundant layers; extend in-place only when it adds real value (e.g. `href` → Link).
