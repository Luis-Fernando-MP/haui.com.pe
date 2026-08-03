import chalk from 'chalk'

const clog = {
  info: (msg: string, prev: string = '\n') => console.log(chalk.blueBright(`${prev}○  ${msg}`)),
  success: (msg: string, prev: string = '') => console.log(chalk.greenBright(`${prev}▎${msg}`)),
  warn: (msg: string, prev: string = '\n') => console.log(chalk.yellow(`${prev}▎${msg}`)),
  error: (msg: string) => console.log(chalk.red(`\n▎${msg}`)),
  block: (title: string) => {
    const line = '━'.repeat(title.length + 4)
    console.log(chalk.magentaBright(`\n╭${line}╮`))
    console.log(chalk.magentaBright(`│  ${title}  │`))
    console.log(chalk.magentaBright(`╰${line}╯`))
  },
  timer: (label: string, ms: number, prev: string = '') => {
    console.log(chalk.blueBright(`${prev}▎${label}: ${ms}ms`))
  }
}

export default clog
