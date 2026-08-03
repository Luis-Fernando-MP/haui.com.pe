import chalk from 'chalk'

const loadAction = async (task: () => Promise<any>) => {
  const loadingChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

  let index = 0
  let isRunning = true

  const intervalId = setInterval(() => {
    if (isRunning) {
      process.stdout.write(`\r${chalk.yellowBright.bold('▎Generando')} ${loadingChars[index]} `)
      index = (index + 1) % loadingChars.length
    }
  }, 50)

  try {
    await task()
  } finally {
    isRunning = false
    clearInterval(intervalId)
    process.stdout.write('\r')
    console.log(chalk.greenBright('\n\n🍀 Proceso terminado.\n\n'))
  }
}

export default loadAction
