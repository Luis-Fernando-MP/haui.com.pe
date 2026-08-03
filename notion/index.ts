import { createInterface, type Interface } from 'readline/promises'

import { defaultPage, generate, listPages, type NotionPage } from './pages.lib'
import { ask, confirm, runMenu } from './utils/cli'
import loadAction from './utils/loadAction'
import clog from './utils/log'
import { listTracedPages, purgeLocal } from './utils/purgeLocal'
import { resolvePicks } from './utils/traceYaml'

const argv = process.argv.slice(2)
const flagAll = argv.includes('--all')
const flagSmart = argv.includes('--smart')

const main = async () => {
  if (flagAll || flagSmart) {
    const page = defaultPage()
    if (page.kind !== 'smart') {
      await loadAction(() => generate(page))
      return
    }
    await loadAction(() => generate(page, { mode: flagAll ? 'all' : 'smart', skipConfirm: true }))
    return
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout })
  console.clear()

  try {
    while (true) {
      const pages = listPages()
      const menu = Object.fromEntries([
        ...pages.map(page => [String(page.option), { label: page.label, run: () => domainMenu(rl, page) }]),
        ['0', { label: 'Salir' }]
      ])
      const order = [...pages.map(p => String(p.option)), '0']

      const { choice, ok } = await runMenu(rl, 'Notion sync', menu, order)

      if (choice === '0') {
        clog.success('chao')
        break
      }

      if (!ok) clog.error('opción inválida')
    }
  } finally {
    rl.close()
  }
}

async function domainMenu(rl: Interface, page: NotionPage) {
  if (page.kind === 'smart') {
    const { choice, ok } = await runMenu(
      rl,
      page.label,
      {
        '1': {
          label: 'Sync inteligente',
          run: async () => {
            await generate(page, { mode: 'smart', confirm: () => confirm(rl) })
            clog.success('listo')
          }
        },
        '2': {
          label: 'Descargar todo',
          run: () => loadAction(() => generate(page, { mode: 'all', skipConfirm: true }))
        },
        '3': {
          label: 'Elegir específicos',
          run: async () => {
            await generate(page, {
              mode: 'selected',
              skipConfirm: true,
              requestPicks: () => ask(rl, 'índices (ej. 1,3): ')
            })
            clog.success('listo')
          }
        },
        '4': { label: 'Eliminar', run: () => deleteMenu(rl, page) },
        '0': { label: 'Volver' }
      },
      ['1', '2', '3', '4', '0']
    )

    if (choice !== '0' && !ok) clog.error('opción inválida')
    return
  }

  const { choice, ok } = await runMenu(
    rl,
    page.label,
    {
      '1': {
        label: 'Generar todo',
        run: () => loadAction(() => generate(page))
      },
      '2': { label: 'Eliminar', run: () => deleteMenu(rl, page) },
      '0': { label: 'Volver' }
    },
    ['1', '2', '0']
  )

  if (choice !== '0' && !ok) clog.error('opción inválida')
}

async function deleteMenu(rl: Interface, page: NotionPage) {
  const pages = await listTracedPages(page.id)

  const { choice, ok } = await runMenu(
    rl,
    `Eliminar · ${page.label}`,
    {
      '1': {
        label: 'Todos',
        run: async () => {
          if (pages.length === 0) {
            clog.warn('sin archivos locales')
            return
          }
          for (const [i, item] of pages.entries()) clog.item(i + 1, item.title)
          if (!(await confirm(rl, 'Confirmar borrar todos'))) {
            clog.warn('Cancelado')
            return
          }
          await purgeLocal(
            page.id,
            pages.map(p => p.id)
          )
        }
      },
      '2': {
        label: 'Específicos',
        run: async () => {
          if (pages.length === 0) {
            clog.warn('sin archivos locales')
            return
          }
          for (const [i, item] of pages.entries()) clog.item(i + 1, item.title, item.id.slice(0, 8))
          const selected = resolvePicks(pages, await ask(rl, 'índices (ej. 1,3): '))
          if (selected.length === 0) {
            clog.warn('sin selección')
            return
          }
          if (!(await confirm(rl, `Confirmar (${selected.length})`))) {
            clog.warn('Cancelado')
            return
          }
          await purgeLocal(
            page.id,
            selected.map(p => p.id)
          )
        }
      },
      '0': { label: 'Volver' }
    },
    ['1', '2', '0']
  )

  if (choice !== '0' && !ok) clog.error('opción inválida')
}

main()
