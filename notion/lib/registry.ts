import { generateDomain } from '@notion/utils/generate/generateDomain'

import type { DomainConfig, GenerateOpts } from './types'

export type Domain = DomainConfig

export const listDomains = (domains: Domain[]) => [...domains].sort((a, b) => a.option - b.option)

export const defaultDomain = (domains: Domain[]) => listDomains(domains).find(d => d.default) ?? listDomains(domains)[0]

export const generate = (domain: Domain, opts?: GenerateOpts) => generateDomain(domain, opts)
