import { StateCreator, create } from 'zustand'

interface Props {
  enabledGradient: boolean
  toggleGradient: () => void
}

const state: StateCreator<Props> = set => ({
  enabledGradient: true,
  toggleGradient: () => set(state => ({ enabledGradient: !state.enabledGradient }))
})

const useUseAppStore = create(state)

export default useUseAppStore
