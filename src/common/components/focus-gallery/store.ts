import type { JourneysImage } from '@common/core/constants/personalJourneys'
import { create } from 'zustand'

export const useFocusGalleryStore = create<{
  images: JourneysImage[]
  index: number
  open: (images: JourneysImage[], index?: number) => void
  close: () => void
}>(set => ({
  images: [],
  index: 0,
  open: (images, index = 0) => set({ images, index }),
  close: () => set({ images: [], index: 0 })
}))
