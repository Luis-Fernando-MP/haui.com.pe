import { techQuery } from '@common/core/queries/techQuery'
import { FiltersTechnologies, Technology } from '@common/core/queries/techQuery/tech.type'
import { technologies } from '@common/core/constants/technologies'
import { StateCreator, create } from 'zustand'

interface Props {
  filters: FiltersTechnologies
  technologies: Technology[]
  setFilters: (filters: Partial<FiltersTechnologies>) => void
  resetFilters: () => void
}

const state: StateCreator<Props> = (set, get) => ({
  filters: {},
  technologies: techQuery({ orderBy: ['Nombre'] }),

  setFilters: newFilters => {
    const prevFilter = get().filters
    const mergedFilter = { ...prevFilter, ...newFilters }
    const filtered = techQuery({ ...mergedFilter, orderBy: ['Nombre'] }, technologies)

    set(() => {
      return { filters: mergedFilter, technologies: filtered }
    })
  },

  resetFilters: () => set(() => ({ filters: {}, technologies }))
})

const useTechStore = create(state)

export default useTechStore
