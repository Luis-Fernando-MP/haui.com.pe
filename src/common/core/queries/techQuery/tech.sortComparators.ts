import { Technology, TechnologyLevel, technologyCategories } from './tech.type'

export const sortComparators = {
  Nombre: (a: Technology, b: Technology) => a.name.localeCompare(b.name),
  Experiencia: (a: Technology, b: Technology) => {
    const levelA = TechnologyLevel[a.level] ?? 0
    const levelB = TechnologyLevel[b.level] ?? 0
    return levelA - levelB
  },
  Categoría: (a: Technology, b: Technology) => {
    const getMaxCategoryValue = (tech: Technology) => Math.max(...tech.categories.map(cat => technologyCategories[cat] ?? 0))
    return getMaxCategoryValue(a) - getMaxCategoryValue(b)
  }
} as const
