import chalk from 'chalk'
import type { Interface } from 'readline/promises'

export async function ask(rl: Interface, prompt = '→ ') {
  try {
    return (await rl.question(chalk.blueBright(prompt))).trim()
  } catch {
    return '0'
  }
}

export async function choose(rl: Interface, title: string, options: [key: string, label: string][]) {
  console.log(chalk.magentaBright('\n━━━━━━━━━━━━━━━━━━━━'))
  console.log(chalk.bold(title))
  for (const [key, label] of options) {
    const paint = key === '0' ? chalk.redBright : chalk.yellow
    console.log(`${paint(`${key}.`)} ${label}`)
  }
  console.log(chalk.magentaBright('━━━━━━━━━━━━━━━━━━━━\n'))

  const choice = await ask(rl)
  console.clear()
  return choice
}

export async function confirm(rl: Interface, label = 'Confirmar') {
  console.log(chalk.yellow('\n1.') + ` ${label}`)
  console.log(chalk.redBright('0.') + ' Cancelar')
  return (await ask(rl)) === '1'
}

type MenuItem = { label: string; run?: () => Promise<void> | void }

export async function runMenu(
  rl: Interface,
  title: string,
  menu: Record<string, MenuItem>,
  order: string[]
) {
  const choice = await choose(
    rl,
    title,
    order.map(key => [key, menu[key].label])
  )

  const item = menu[choice]
  if (!item) return { choice, ok: false as const }
  if (item.run) await item.run()
  return { choice, ok: true as const }
}
