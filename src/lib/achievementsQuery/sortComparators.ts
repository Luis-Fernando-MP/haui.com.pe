import dayjs from 'dayjs'

import { Achievements, achievementWeight, devContribution, skillDomainCategories } from './achievement.type'

type TPrimaryComparator = (a: Achievements, b: Achievements) => number
// Helper para sub-ordenamiento automático por weight
const withWeightTiebreaker = (primaryComparator: TPrimaryComparator) => (a: Achievements, b: Achievements) => {
  const primary = primaryComparator(a, b)
  if (primary !== 0) return primary
  // Desempate por weight cuando el criterio principal es igual
  return (achievementWeight[a.weight] ?? 0) - (achievementWeight[b.weight] ?? 0)
}

// Comparadores con sub-ordenamiento automático por weight
export const achievementSortComparators = {
  Nombre: (a: Achievements, b: Achievements) => a.name.localeCompare(b.name),

  Fecha: withWeightTiebreaker((a, b) => dayjs(a.acquisitionDate).valueOf() - dayjs(b.acquisitionDate).valueOf()),

  Contribución: withWeightTiebreaker(
    (a, b) => (devContribution[a.devContribution] ?? 0) - (devContribution[b.devContribution] ?? 0)
  ),

  Skill: withWeightTiebreaker((a, b) => {
    // Obtiene el skill domain con mayor valor
    const getMaxSkillValue = (x: Achievements) => {
      if (!Array.isArray(x.skillDomain) || x.skillDomain.length === 0) return -Infinity
      return Math.max(...x.skillDomain.map(s => skillDomainCategories[s] ?? -Infinity))
    }
    return getMaxSkillValue(a) - getMaxSkillValue(b)
  })
} as const
