import { marks } from './marks'
import { projects } from './projects'
import { series } from './series'
import type { Domain } from '@notion/lib/registry'

export const DOMAINS: Domain[] = [projects, series, marks] as Domain[]

