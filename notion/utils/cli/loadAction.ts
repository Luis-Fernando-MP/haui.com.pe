import chalk from 'chalk'

import clog from '@notion/utils/cli/log'

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

const loadAction = async (task: () => Promise<unknown>) => {
  let i = 0
  let live = true

  const tick = setInterval(() => {
    if (!live) return
    process.stdout.write(`\r${chalk.yellow(frames[i])} `)
    i = (i + 1) % frames.length
  }, 80)

  try {
    await task()
  } finally {
    live = false
    clearInterval(tick)
    process.stdout.write('\r')
    clog.success('listo')
  }
}

export default loadAction
