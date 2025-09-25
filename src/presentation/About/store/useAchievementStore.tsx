import { achievementsQuery } from '@/lib/achievementsQuery'
import { Achievements, FiltersAchievements } from '@/lib/achievementsQuery/achievement.type'
import { achievements as achievementsData } from '@/shared/config/constants/achievements'
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
      achievements: achievementsData
    }))
})

const useAchievementStore = create(state)

export default useAchievementStore
