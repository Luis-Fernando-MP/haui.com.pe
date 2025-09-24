import { technologies } from '@/shared/config/constants/technologies'

import { sortComparators } from './tech.sortComparators'
import { FiltersTechnologies, Technology, stackAliases } from './tech.type'

/**
 * Filters and sorts a list of technologies based on given criteria.
 *
 * @param {FiltersTechnologies} filters - Object containing filtering and sorting options.
 * @param {Technology['level']} [filters.level] - Filters technologies by proficiency level.
 * @param {TechnologyCategory[]} [filters.categories] - Filters technologies by one or more categories.
 * @param {TechnologyStack} [filters.stack] - Filters technologies by their usage stack.
 * @param {'frontend' | 'backend'} [filters.favoriteFor] - Filters technologies marked as favorites for a specific context.
 * @param {boolean} [filters.hasNotionPage] - If true, includes only technologies with a linked Notion page.
 * @param {OrderBy[]} [filters.orderBy] - Defines keys to sort the results by, applied in order of priority.
 * @param {'asc' | 'desc'} [filters.orderDirection] - Defines the sort direction: 'asc' for ascending, 'desc' for descending.
 * @param {Technology[]} [techList=technologies] - Optional list of technologies to filter and sort. Defaults to the global list.
 *
 * @example
 * // Filter only frontend technologies marked as favorites
 * techQuery({ favoriteFor: 'frontend' })
 *
 * @example
 * // Filter technologies by levels and categories, and sort by name
 * techQuery({
 *   level: 'Dominated',
 *   categories: ['framework', 'preprocessor'],
 *   orderBy: ['name'],
 *   orderDirection: 'asc'
 * })
 *
 * @example
 * // Filter backend technologies with a Notion page
 * techQuery({
 *   stack: 'backend',
 *   hasNotionPage: true
 * })
 */
export function techQuery(filters: FiltersTechnologies = {}, techList?: Technology[]): Technology[] {
  const { orderBy, orderDirection, stack: filterStack } = filters

  const list = techList ?? technologies

  // Pre-process filters for efficiency
  const filterCategorySet = filters.categories && filters.categories.length > 0 ? new Set(filters.categories) : null

  const allowedStacks = filterStack ? stackAliases[filterStack] : null

  const filtered = list.filter(tech => {
    const { level, categories, stack } = tech

    if (filters.level && level !== filters.level) return false
    if (filterCategorySet && !categories.some(cat => filterCategorySet.has(cat))) return false
    if (allowedStacks && !stack.some(s => allowedStacks.includes(s))) return false
    if (filters.hasNotionPage && !tech.notionPage) return false

    return true
  })

  if (!orderBy || orderBy.length === 0) {
    return filtered
  }

  const direction = orderDirection === 'desc' ? -1 : 1

  // Pre-build the array of comparators to avoid lookup in the sort loop
  const sorters = orderBy.map(key => sortComparators[key]).filter(comparator => comparator) as ((
    a: Technology,
    b: Technology
  ) => number)[]

  // If no valid sorters, return filtered list as is
  if (sorters.length === 0) return filtered

  // Create a shallow copy only if sorting is actually going to occur
  return [...filtered].sort((a, b) => {
    for (const comparator of sorters) {
      const result = comparator(a, b)
      if (result !== 0) return result * direction
    }
    return 0
  })
}
