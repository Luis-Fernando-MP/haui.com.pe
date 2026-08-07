import { DOMAINS } from './databases/registry'
import { run } from './lib/cli'

void run(DOMAINS, process.argv.slice(2))
