import { techQuery } from '@/lib/techQuery'
import { FiltersTechnologies, Technology } from '@/lib/techQuery/tech.type'
import { technologies } from '@/shared/config/constants/technologies'
import { StateCreator, create } from 'zustand'

interface Props {
  filters: FiltersTechnologies
  technologies: Technology[]
  setFilters: (filters: Partial<FiltersTechnologies>) => void
  resetFilters: () => void
}

const state: StateCreator<Props> = (set, get) => ({
  filters: {},
  technologies: technologies,

  setFilters: newFilters => {
    const prevFilter = get().filters
    const mergedFilter = { ...prevFilter, ...newFilters }
    const filtered = techQuery(mergedFilter, technologies)

    set(() => {
      return { filters: mergedFilter, technologies: filtered }
    })
  },

  resetFilters: () => set(() => ({ filters: {}, technologies }))
})

const useTechStore = create(state)

export default useTechStore
