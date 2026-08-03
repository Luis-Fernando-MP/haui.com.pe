import chalk from 'chalk'
import { createInterface } from 'readline/promises'

import { generateMarks } from './databases/marks'
import { generateProjects } from './databases/projects'
import { generateSeries } from './databases/series'
import loadAction from './utils/loadAction'

const argv = process.argv.slice(2)
const flagAll = argv.includes('--all')
const flagSmart = argv.includes('--smart')

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
      console.log(chalk.magentaBright('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
      console.log(chalk.bold('🟣 ¿Nuevos cambios?\n'))
      console.log(chalk.yellow('1.') + ' Generar proyectos')
      console.log(chalk.yellow('2.') + ' Generar series')
      console.log(chalk.yellow('3.') + ' Generar marks')
      console.log(chalk.redBright('0. Terminar'))
      console.log(chalk.magentaBright('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'))

      try {
        option = (await rl.question(chalk.blueBright('-> Elige una opción: '))).trim()
      } catch {
        option = '0'
      }

      console.clear()

      if (option === '0') {
        console.log(chalk.bold.green('\n👋 Programa finalizado.'))
        break
      }

      if (option === '1') {
        await runProjectsMenu(rl)
        continue
      }

      const options: Record<string, () => Promise<void>> = {
        '2': () => generateSeries(),
        '3': () => generateMarks()
      }

      const task = options[option]
      if (task) await loadAction(task)
      else console.log(chalk.redBright('\n❌ Opción no válida.\n'))
    } while (option !== '0')
  } finally {
    rl.close()
  }
}

async function runProjectsMenu(rl: ReturnType<typeof createInterface>) {
  console.log(chalk.magentaBright('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
  console.log(chalk.bold('Proyectos — modo de sync\n'))
  console.log(chalk.yellow('Enter') + '  Sync inteligente (nuevos + modificados)')
  console.log(chalk.yellow('a') + '      Descargar todo')
  console.log(chalk.yellow('s') + '      Elegir específicos')
  console.log(chalk.redBright('0') + '      Volver')
  console.log(chalk.magentaBright('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'))

  let choice = ''
  try {
    choice = (await rl.question(chalk.blueBright('-> Modo: '))).trim().toLowerCase()
  } catch {
    return
  }

  console.clear()

  if (choice === '0') return

  if (choice === 'a') {
    await loadAction(() => generateProjects({ mode: 'all', skipConfirm: true }))
    return
  }

  if (choice === 's') {
    await generateProjects({
      mode: 'selected',
      skipConfirm: true,
      requestPicks: () => rl.question(chalk.blueBright('-> Índices o ids (ej. 1,3 o fragmento): '))
    })
    console.log(chalk.greenBright('\n🍀 Proceso terminado.\n'))
    return
  }

  await generateProjects({
    mode: 'smart',
    confirm: async () => {
      const answer = (await rl.question(chalk.blueBright('-> Enter para sincronizar, n para cancelar: ')))
        .trim()
        .toLowerCase()
      return answer !== 'n' && answer !== 'no'
    }
  })
  console.log(chalk.greenBright('\n🍀 Proceso terminado.\n'))
}

main()
