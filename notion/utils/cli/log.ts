import chalk from 'chalk'

const clog = {
  info: (msg: string) => console.log(chalk.cyan(`○ ${msg}`)),
  success: (msg: string) => console.log(chalk.green(`✓ ${msg}`)),
  warn: (msg: string) => console.log(chalk.yellow(`! ${msg}`)),
  error: (msg: string) => console.log(chalk.red(`✗ ${msg}`)),
  block: (title: string) => console.log(chalk.magentaBright(`\n▸ ${title}`)),
  timer: (label: string, ms: number) => console.log(chalk.dim(`  ${label} ${ms}ms`)),
  item: (index: number, label: string, detail = '') => {
    const extra = detail ? chalk.dim(`  ${detail}`) : ''
    console.log(`  ${chalk.yellow(`${index}.`)} ${label}${extra}`)
  },
  dim: (msg: string) => console.log(chalk.dim(msg))
}

export default clog
