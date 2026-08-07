import { achievements as achievementsData } from '@common/core/data/achievements'
import { achievementsQuery } from '@common/core/queries/achievementsQuery'
import { Achievements, FiltersAchievements } from '@common/core/queries/achievementsQuery/achievement.type'
import { StateCreator, create } from 'zustand'

interface Props {
  filters: FiltersAchievements
  achievements: Achievements[]
  setFilters: (filters: Partial<FiltersAchievements>) => void
  resetFilters: () => void
}

const state: StateCreator<Props> = (set, get) => ({
  filters: {} as FiltersAchievements,
  achievements: achievementsQuery({ orderBy: ['Contribución', 'Fecha'], orderDirection: 'desc' }),

  setFilters: newFilters => {
    const prevFilters = get().filters
    const mergedFilters = { ...prevFilters, ...newFilters }

    const filtered = achievementsQuery(
      { ...mergedFilters, orderBy: ['Contribución', 'Fecha'], orderDirection: 'desc' },
      achievementsData
    )

    set(() => ({
      filters: mergedFilters,
      achievements: filtered
    }))
  },

  resetFilters: () =>
    set(() => ({
      filters: {} as FiltersAchievements,
      achievements: achievementsQuery({ orderBy: ['Contribución', 'Fecha'], orderDirection: 'desc' })
    }))
})

const useAchievementStore = create(state)

export default useAchievementStore
