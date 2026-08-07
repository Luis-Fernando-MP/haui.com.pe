import type { Domain } from '@notion/lib/registry'

import { marks } from './marks'
import { projects } from './projects'
import { series } from './series'

export const DOMAINS: Domain[] = [projects, series, marks] as Domain[]
