```
✿ ✿ ❀,✿ ✿ ❀ ✿  ✿ ✿ ❀,✿ ✿ ❀ ✿ ❀
\ĺ/*\ĺ⁄*\ĺ/ \ĺ/*\ĺ⁄*\ĺ/*\ĺ⁄*\ĺ/ \ĺ/*\ĺ⁄*
\ĺ/*\ĺ⁄*\ĺ/ \ĺ/*\ĺ⁄*\ĺ/*\ĺ⁄*\ĺ/ \ĺ/*\ĺ⁄*
```

```
██   ██  █████  ██    ██ ██      ██████  ███████ ██    ██
██   ██ ██   ██ ██    ██ ██      ██   ██ ██      ██    ██
███████ ███████ ██    ██ ██      ██   ██ █████   ██    ██
██   ██ ██   ██ ██    ██ ██      ██   ██ ██       ██  ██
██   ██ ██   ██  ██████  ██      ██████  ███████   ████

```

# 👋 Hola, soy haui

- **Ingeniero de Software** apasionado por crear experiencias digitales. Con más de **2 años de experiencia** en backend (NestJS, MySQL, AWS) y frontend (Next.js, Expo), he logrado mejoras reales, como: optimizar procesos internos y desplegar aplicaciones con cero errores críticos.

- Me gusta trabajar en equipo, aprender constantemente y construir con calidad y propósito.

---

```
####################********************######%%%#####%%%%%@@@@@@@@@@@@@@@@@@%%@@@@@@@@@@@@@@@@@@@@@
#####%%%%%%%%%################%%%%%##**+*##**+==--::::::--=++*%@@@@@@@@@@@@@@%%@@@@@@@@@@@@@@@@@@@@@
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@#*+=:..............:::::::::::-=#@@%@@@@@@%%%@@@@@@@@@@@@@@@@@@@@
*****************#############%%%#+:..............::::::::::::::::::::=#%%@@@%%%@@@@@@@@@@@@@@@@@@@@
*****************************+-...................:::::::::::::::::::::::=#@@%%%%%%%%%%%%%%%%%%%%%%@
**************************=:.....................::::::::::::::::::::::::::-*#*******************++*
++++=+++++++++++++=:.:==:.........................::::..::::::::::::::::::::::======================
---------------::::---:.................:::::::::::::..:::::::::::::::::::::::::====================
-------------:.::-=-:...............::::::::::::::::.::::::::::::::::::::::::::::-==================
-------:...:.:::-=:...............::::::::::--:::::.:::::::::..::::::::::::::::::::=================
-------::::.:::-=:...............:::::::::----:::::..:::::--:....:::::::::::::::::::================
-------:::::::--...............::::::::-------::::::::-----::.:-=-:::::::::::::::::::-==============
-------:::::---...............::::::::--------::::-::---------==--::::::::::::::::::::-=============
--------.::---...............:::::::::-------:::::-::---::--====-::::::::::::::::::::::=============
----=---:::--:..............::::::---------------:--:--:---=+===-::::::::::::::::::::::-============
==-==--------..............::::::::::::::-----------=----======--:::::::::::::::::::::::============
==----------:..............:::::::::::-----------------------:::::::::::::::::::::::::::-===========
------------.....::.......::::::::::::-------------------:::::::::::::::::::::::::::::::::-=========
-----------:...::--.......::::::------:::-----------:::::::::::::::::::::::::::::::::::::::::=======
-----------:..............::::::=+*#*++==------:::::::::::::::::::::::::::::::::::::::::::::::-=====
-----------:..............::::::-------=+-----::::::::::::::::::::::::::::::::::::::::::::::::--====
-----------:......:::-:::------::---------------::::::::::::::::::::::::::::::::::::---::-:::-======
-----------:....:::-------------::::--------------:::::::::::::::::::::::::::::::::-----===--=======
---------:......:---+=====-:--=---:::-----------------:::::::::::::::::::::::::::-----==++=+**#*++==
--------...::...---=++=====---=---:::---------------------------:::::::--::::::::---+##%%#####*##***
-------:.:--=:...:=====++=-=====-----------------------------------:::--::::::::::=%#####*******#***
------::-=====:....:===++++===-----------------------------------------:::::::::::=*#***************
--------====+++:..:::---------------------------------------------------------:::::=****************
-------=+**##%%%+.:::-----------------------------------==============------------::****************
--=-------==+=++*+-:---------------------------------=========+++++++=-----===-----:+*#*************
------------=-----=+=+======-==------------------=========++++++***#%+========------************#***
-==---==--=----==-=++***##+=========-===============+++++++***#%%%%#%#+========---=*****************
=+=---=--==:---==-=*+++++**#%%#***++++++++++++++******##%%%%%%%%%%#%#%%#*+=======*##**##***********#
```

## ✉️ Contacto & Conexión

Me encantaría que conectemos y veamos cómo podemos colaborar:

- 🌐 Sitio web / Portafolio: [haui.vercel.app](https://haui.vercel.app)

- 🔗 LinkedIn: [Luis Fernando Melgar Pizarro](https://www.linkedin.com/in/luis-fernando-melgar-pizarro/)

- 📧 Email: [luigemp@gmail.com](mailto:luigemp@gmail.com)

- 🐙 GitHub: [Luis-Fernando-MP](https://github.com/Luis-Fernando-MP)

---

Gracias por detenerte aquí — espero que esta web te muestre quién soy, qué hago y por qué me apasiona este camino.

## 🏗️ Instalación local

```bash
# 1. Clona el repositorio
git clone https://github.com/Luis-Fernando-MP/haui.com.pe.git

# 2. Entra al directorio del proyecto
cd haui.com.pe

# 3. Instala las dependencias
pnpm install
# o: bun install | yarn install | npm install

# 4. Variables de entorno (si hace falta Notion / etc.)
# Copia `.env.example` → `.env` y completa las claves.

# 5. Dev server (Next.js)
pnpm dev

# 6. Abre
http://localhost:3000
```

Contexto de producto/diseño para agentes: `PRODUCT.md` y `DESIGN.md` en la raíz.

---

## Agent skills

Skills en [`.agents/skills/`](.agents/skills/) (mirror en [`.cursor/skills/`](.cursor/skills/) para fix/hard + Impeccable).  
Docs de agentes: [`AGENTS.md`](AGENTS.md).

### Esqueleto mínimo (ambos orquestadores)

**Obligatorio** en `haui-fix-ui` y `haui-hard-ui`:

```text
AUDIT inicio  →  EXTRAS pre  →  POLISH  →  EXTRAS post  →  AUDIT final
```

| Paso | Impeccable / skill | ¿Siempre? |
|------|--------------------|-----------|
| **Audit inicio** | `reference/audit.md` + `npx impeccable detect` | **Sí** |
| **Extras pre** | layout, typeset, adapt, clarify, craft-floor… (según findings) | Solo si hace falta |
| **Polish** | `reference/polish.md` | **Sí** |
| **Extras post** | optimize, detect, layout residual, vercel-*… | Solo si hace falta |
| **Audit final** | `reference/audit.md` + detect | **Sí** |

La diferencia fix vs hard es **cuántos extras** cargan y si **re-ciclán** tras el audit final.

### Inventario

| Skill | Uso | Coste | Extras | ¿Re-ciclo si After débil? |
|-------|-----|--------|--------|---------------------------|
| **coding-preferences** | Cómo se escribe el código | Bajo | n/a | n/a |
| **impeccable** | Craft por comando | Según cmd | n/a | n/a |
| **haui-fix-ui** | Diario: audit→…→polish→…→audit, extras mínimos | **Medio-bajo** | layout (+ craft-floor) | **No** |
| **haui-hard-ui** | Ship: mismo spine + extras completos + vercel | **Alto** | layout/typeset/adapt/clarify/optimize + vercel | **Sí** — máx. 1 re-ciclo |
| **vercel-react-best-practices** | Perf React/Next | Alto | Solo hard, extras **post** | — |
| **vercel-composition-patterns** | Composition / React 19 | Medio | Solo hard | — |

### Cuándo usar cuál

| Necesidad | Skill |
|-----------|--------|
| Arreglar un bloque con audit+polish sin gastar de más | **`haui-fix-ui <target>`** |
| Ship / super check / optimize / Δ formal | **`haui-hard-ui <target>`** |
| Un solo comando Impeccable | `/impeccable polish\|layout\|audit\|… <target>` |

```text
# Diario (mismo spine; extras baratos; NO re-ciclo)
haui-fix-ui about achievements
haui-fix-ui the home hero
haui-fix-ui Contact dry

# Ship (extras ricos; 1 re-ciclo si score flojo)
haui-hard-ui about achievements
haui-hard-ui src/presentation/project
haui-hard-ui home projects +critique
haui-hard-ui focus gallery dry
```

---

### `haui-fix-ui` — timeline

**¿Re-ciclo?** **No.** Un spine completo → FIN.

```text
T0  Bootstrap
    · coding-preferences
    · PRODUCT/DESIGN (si hace falta)
         │
T1  AUDIT inicio                          ← siempre
    · audit.md + detect
    · P0/P1 target
         │
T2  EXTRAS pre                            ← opcional / barato
    · craft-floor.md si reestructuras
    · layout.md si align/spacing P0–P1
    · (no typeset/adapt/clarify/optimize/vercel/critique)
         │
T3  POLISH                                ← siempre
    · polish.md
         │
T4  EXTRAS post                           ← opcional / barato
    · layout residual
    · detect en touched
         │
T5  AUDIT final                           ← siempre
    · audit.md + detect → Δ
         │
T6  Deliver FIN  (sin re-loop)
```

Cadena:

```text
coding-preferences → audit → (layout?) → polish → (layout residual?) → audit → stop
```

| Flag | Cambio |
|------|--------|
| (default) | Timeline completo |
| `dry` | Solo Audit inicio |

---

### `haui-hard-ui` — timeline

**¿Re-ciclo?** **Sí, 1 vez** si After &lt; 14/20, queda P0, o regresión vs Before.  
El re-ciclo repite: **extras pre → polish → extras post → audit** (no un tercer ciclo).

```text
T0  Bootstrap
    · coding-preferences
    · context.mjs + PRODUCT + DESIGN + target
         │
T1  AUDIT inicio                          ← siempre
    · audit.md → /20 + detect + P0–P2
    · [+critique] critique.md opcional
         │
T2  EXTRAS pre                            ← según findings
    · craft-floor
    · layout → typeset → adapt → clarify
    · (+ composition si monolitismo es P0)
         │
T3  POLISH                                ← siempre
    · polish.md
         │
T4  EXTRAS post                           ← según residual
    · optimize.md + vercel-react-best-practices
    · vercel-composition-patterns si aplica
    · layout/typeset residual + detect
         │
T5  AUDIT final                           ← siempre
    · audit.md + detect → Δ
         │
    ├─ Gate NO  → Deliver FIN
    └─ Gate SÍ  → T6 extras pre → polish → extras post
                 → T7 AUDIT final #2 → Deliver FIN
```

Cadena:

```text
coding-preferences + context
  → audit + detect
  → (critique?)
  → extras pre (layout/typeset/adapt/clarify…)
  → polish
  → extras post (optimize + vercel* …)
  → audit + detect
  → [gate] re-ciclo (extras → polish → extras → audit)
  → report
```

#### Gate re-ciclo

| Condición | Dispara re-ciclo |
|-----------|------------------|
| After **&lt; 14/20** | Sí |
| P0 abierto | Sí |
| After **&lt;** Before | Sí |
| After ≥ 14, sin P0, no bajó | No |
| `dry` o ya re-cicló | No |

| Flag | Cambio |
|------|--------|
| (default) | Timeline + gate |
| `+critique` | critique tras Audit inicio |
| `dry` | Solo Audit inicio |

### Comandos Impeccable en el spine

| Comando | Referencia | fix | hard |
|---------|------------|-----|------|
| `audit` | `.../reference/audit.md` | inicio + final | inicio + final |
| `polish` | `.../reference/polish.md` | siempre | siempre |
| `layout` | `.../reference/layout.md` | extras pre/post | extras pre/post |
| `typeset` | `.../reference/typeset.md` | — | extras pre |
| `adapt` | `.../reference/adapt.md` | — | extras pre |
| `clarify` | `.../reference/clarify.md` | — | extras pre |
| `optimize` | `.../reference/optimize.md` | — | extras post |
| `critique` | `.../reference/critique.md` | — | flag |
| craft floor | `.../reference/craft-floor.md` | si reestructura | sí |

---

### CLI Impeccable (fuera de los orquestadores)

```bash
pnpm impeccable:detect
pnpm impeccable:check
pnpm impeccable:update
npx impeccable install
```

### Prioridad entre skills

1. **coding-preferences**
2. **PRODUCT.md / DESIGN.md / AGENTS.md**
3. **impeccable** (audit + polish en el spine)
4. **vercel-*** solo en hard extras
5. **haui-fix-ui** / **haui-hard-ui** orquestan; no reescriben reglas

Si Impeccable empuja un look genérico SaaS → ganan DESIGN.md / AGENTS.md.
