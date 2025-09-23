import { StateCreator, create } from 'zustand'

interface JobExperienceStore {
  selectedJob?: string
  setSelectedJob: (jobName?: string) => void
}

const state: StateCreator<JobExperienceStore> = set => ({
  selectedJob: undefined,
  setSelectedJob: jobName =>
    set(prev => ({
      selectedJob: prev.selectedJob === jobName ? undefined : jobName
    }))
})

const useJobExperienceStore = create(state)

export default useJobExperienceStore
