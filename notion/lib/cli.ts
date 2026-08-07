import { createInterface, type Interface } from 'readline/promises'

import { ask, confirm, runMenu } from '@notion/utils/cli'
import loadAction from '@notion/utils/cli/loadAction'
import clog from '@notion/utils/cli/log'
import { listTracedPages, purgeLocal } from '@notion/utils/local/purgeLocal'
import { resolvePicks } from '@notion/utils/local/traceYaml'

import { defaultDomain, generate, listDomains, type Domain } from './registry'

export async function run(domains: Domain[], argv: string[] = process.argv.slice(2)) {
  const flagAll = argv.includes('--all')
  const flagSmart = argv.includes('--smart')

  if (flagAll || flagSmart) {
    const domain = defaultDomain(domains)
    if (domain.kind !== 'smart') {
      await loadAction(() => generate(domain))
      return
    }
    await loadAction(() => generate(domain, { mode: flagAll ? 'all' : 'smart', skipConfirm: true }))
    return
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout })
  console.clear()

  try {
    while (true) {
      const list = listDomains(domains)
      const menu = Object.fromEntries([
        ...list.map(domain => [String(domain.option), { label: domain.label, run: () => domainMenu(rl, domain) }]),
        ['0', { label: 'Salir' }]
      ])
      const order = [...list.map(d => String(d.option)), '0']
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

async function domainMenu(rl: Interface, domain: Domain) {
  if (domain.kind === 'smart') {
    const { choice, ok } = await runMenu(
      rl,
      domain.label,
      {
        '1': {
          label: 'Sync inteligente',
          run: async () => {
            await generate(domain, { mode: 'smart', confirm: () => confirm(rl) })
            clog.success('listo')
          }
        },
        '2': {
          label: 'Descargar todo',
          run: () => loadAction(() => generate(domain, { mode: 'all', skipConfirm: true }))
        },
        '3': {
          label: 'Elegir específicos',
          run: async () => {
            await generate(domain, {
              mode: 'selected',
              skipConfirm: true,
              requestPicks: () => ask(rl, 'índices (ej. 1,3): ')
            })
            clog.success('listo')
          }
        },
        '4': { label: 'Eliminar', run: () => deleteMenu(rl, domain) },
        '0': { label: 'Volver' }
      },
      ['1', '2', '3', '4', '0']
    )
    if (choice !== '0' && !ok) clog.error('opción inválida')
    return
  }

  const { choice, ok } = await runMenu(
    rl,
    domain.label,
    {
      '1': {
        label: 'Generar todo',
        run: () => loadAction(() => generate(domain))
      },
      '2': { label: 'Eliminar', run: () => deleteMenu(rl, domain) },
      '0': { label: 'Volver' }
    },
    ['1', '2', '0']
  )
  if (choice !== '0' && !ok) clog.error('opción inválida')
}

async function deleteMenu(rl: Interface, domain: Domain) {
  const pages = await listTracedPages(domain.id)

  const { choice, ok } = await runMenu(
    rl,
    `Eliminar · ${domain.label}`,
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
            domain.id,
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
            domain.id,
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
