import { create } from 'zustand'

export const useFocusGalleryStore = create<{
  images: {
    src: string
    caption?: string
    action?: string
    actionText?: string
  }[]
  index: number
  open: (
    images: {
      src: string
      caption?: string
      action?: string
      actionText?: string
    }[],
    index?: number
  ) => void
  close: () => void
}>(set => ({
  images: [],
  index: 0,
  open: (images, index = 0) => set({ images, index }),
  close: () => set({ images: [], index: 0 })
}))
