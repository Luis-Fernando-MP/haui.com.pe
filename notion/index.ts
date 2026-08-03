import chalk from 'chalk'
import { createInterface, type Interface } from 'readline/promises'

import { generateMarks } from './databases/marks'
import { generateProjects } from './databases/projects'
import { generateSeries } from './databases/series'
import loadAction from './utils/loadAction'
import clog from './utils/log'
import { listTracedPages, purgeLocal } from './utils/purgeLocal'
import { resolvePicks } from './utils/traceYaml'

const argv = process.argv.slice(2)
const flagAll = argv.includes('--all')
const flagSmart = argv.includes('--smart')

const ask = async (rl: Interface, prompt: string) => {
  try {
    return (await rl.question(chalk.blueBright(prompt))).trim()
  } catch {
    return '0'
  }
}

const main = async () => {
  if (flagAll || flagSmart) {
    await loadAction(() => generateProjects({ mode: flagAll ? 'all' : 'smart', skipConfirm: true }))
    return
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout })
  console.clear()
  let option = ''

  try {
    do {
      console.log(chalk.magentaBright('\n━━━━━━━━━━━━━━━━━━━━'))
      console.log(chalk.bold('Notion sync'))
      console.log(chalk.yellow('1.') + ' Proyectos')
      console.log(chalk.yellow('2.') + ' Series')
      console.log(chalk.yellow('3.') + ' Marks')
      console.log(chalk.redBright('0.') + ' Salir')
      console.log(chalk.magentaBright('━━━━━━━━━━━━━━━━━━━━\n'))

      option = await ask(rl, '→ ')
      console.clear()

      if (option === '0') {
        clog.success('chao')
        break
      }

      if (option === '1') {
        await domainMenu(rl, 'projects')
        continue
      }

      if (option === '2') {
        await domainMenu(rl, 'series')
        continue
      }

      if (option === '3') {
        await domainMenu(rl, 'marks')
        continue
      }

      clog.error('opción inválida')
    } while (option !== '0')
  } finally {
    rl.close()
  }
}

async function domainMenu(rl: Interface, domain: 'projects' | 'series' | 'marks') {
  const label = domain === 'projects' ? 'Proyectos' : domain === 'series' ? 'Series' : 'Marks'

  console.log(chalk.magentaBright('\n━━━━━━━━━━━━━━━━━━━━'))
  console.log(chalk.bold(label))
  if (domain === 'projects') {
    console.log(chalk.yellow('1.') + ' Sync inteligente')
    console.log(chalk.yellow('2.') + ' Descargar todo')
    console.log(chalk.yellow('3.') + ' Elegir específicos')
    console.log(chalk.yellow('4.') + ' Eliminar')
  } else {
    console.log(chalk.yellow('1.') + ' Generar todo')
    console.log(chalk.yellow('2.') + ' Eliminar')
  }
  console.log(chalk.redBright('0.') + ' Volver')
  console.log(chalk.magentaBright('━━━━━━━━━━━━━━━━━━━━\n'))

  const choice = await ask(rl, '→ ')
  console.clear()

  if (choice === '0') return

  const deleteKey = domain === 'projects' ? '4' : '2'
  if (choice === deleteKey) {
    await deleteMenu(rl, domain)
    return
  }

  if (domain === 'projects') {
    if (choice === '2') {
      await loadAction(() => generateProjects({ mode: 'all', skipConfirm: true }))
      return
    }

    if (choice === '3') {
      await generateProjects({
        mode: 'selected',
        skipConfirm: true,
        requestPicks: () => ask(rl, 'índices (ej. 1,3): ')
      })
      clog.success('listo')
      return
    }

    if (choice === '1') {
      await generateProjects({
        mode: 'smart',
        confirm: async () => {
          console.log(chalk.yellow('1.') + ' Confirmar')
          console.log(chalk.redBright('0.') + ' Cancelar')
          return (await ask(rl, '→ ')) === '1'
        }
      })
      clog.success('listo')
      return
    }

    clog.error('opción inválida')
    return
  }

  if (choice === '1') {
    await loadAction(() => (domain === 'series' ? generateSeries() : generateMarks()))
    return
  }

  clog.error('opción inválida')
}

async function deleteMenu(rl: Interface, domain: 'projects' | 'series' | 'marks') {
  const pages = await listTracedPages(domain)

  console.log(chalk.magentaBright('\n━━━━━━━━━━━━━━━━━━━━'))
  console.log(chalk.bold(`Eliminar · ${domain}`))
  console.log(chalk.yellow('1.') + ' Todos')
  console.log(chalk.yellow('2.') + ' Específicos')
  console.log(chalk.redBright('0.') + ' Volver')
  console.log(chalk.magentaBright('━━━━━━━━━━━━━━━━━━━━\n'))

  const choice = await ask(rl, '→ ')
  console.clear()

  if (choice === '0') return

  if (pages.length === 0) {
    clog.warn('sin archivos locales')
    return
  }

  if (choice === '1') {
    for (const [i, page] of pages.entries()) clog.item(i + 1, page.title)
    console.log(chalk.yellow('\n1.') + ' Confirmar borrar todos')
    console.log(chalk.redBright('0.') + ' Cancelar')
    if ((await ask(rl, '→ ')) !== '1') {
      clog.warn('Cancelado')
      return
    }
    await purgeLocal(
      domain,
      pages.map(p => p.id)
    )
    return
  }

  if (choice === '2') {
    for (const [i, page] of pages.entries()) clog.item(i + 1, page.title, page.id.slice(0, 8))
    const picks = await ask(rl, 'índices (ej. 1,3): ')
    const selected = resolvePicks(pages, picks)
    if (selected.length === 0) {
      clog.warn('sin selección')
      return
    }

    console.log(chalk.yellow('\n1.') + ` Confirmar (${selected.length})`)
    console.log(chalk.redBright('0.') + ' Cancelar')
    if ((await ask(rl, '→ ')) !== '1') {
      clog.warn('Cancelado')
      return
    }

    await purgeLocal(
      domain,
      selected.map(p => p.id)
    )
    return
  }

  clog.error('opción inválida')
}

main()
