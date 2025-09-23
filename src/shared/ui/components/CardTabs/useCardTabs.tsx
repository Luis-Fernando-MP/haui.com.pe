import { useEffect, useRef, useState } from 'react'

type TabOrientation = 'vertical' | 'horizontal'

interface Props<T> {
  items: T[]
  orientation: TabOrientation
  defaultIndex: number
  onTabChange?: (item: T, index: number) => void
  autoAdvance?: boolean
  autoAdvanceInterval?: number
}

const useCardTabs = <T,>({
  items,
  orientation,
  defaultIndex,
  onTabChange,
  autoAdvance = true,
  autoAdvanceInterval = 3000
}: Props<T>) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([])

  const isVertical = orientation === 'vertical'

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    onTabChange?.(items[index], index)
  }

  // Lógica de Auto-avance
  useEffect(() => {
    if (!autoAdvance || isHovering || items.length <= 1) return

    const intervalId = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % items.length)
    }, autoAdvanceInterval)

    return () => clearInterval(intervalId)
  }, [autoAdvance, isHovering, autoAdvanceInterval, items.length])

  // Centered scroll logic
  useEffect(() => {
    const container = sectionRef.current
    const element = buttonRefs.current[activeIndex]

    if (!container || !element) return

    const scrollToCenter = () => {
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()

      if (isVertical) {
        const elementRelativeTop = elementRect.top - containerRect.top + container.scrollTop
        const elementMiddle = elementRelativeTop + element.offsetHeight / 2
        const containerMiddle = container.clientHeight / 2
        const scrollTop = elementMiddle - containerMiddle

        const currentScrollTop = container.scrollTop
        const containerHeight = container.clientHeight
        const elementTop = elementRelativeTop
        const elementBottom = elementTop + element.offsetHeight

        const isElementVisible = elementTop >= currentScrollTop && elementBottom <= currentScrollTop + containerHeight

        if (!isElementVisible) {
          container.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
      } else {
        const elementRelativeLeft = elementRect.left - containerRect.left + container.scrollLeft
        const elementMiddle = elementRelativeLeft + element.offsetWidth / 2
        const containerMiddle = container.clientWidth / 2
        const scrollLeft = elementMiddle - containerMiddle

        const currentScrollLeft = container.scrollLeft
        const containerWidth = container.clientWidth
        const elementLeft = elementRelativeLeft
        const elementRight = elementLeft + element.offsetWidth

        const isElementVisible = elementLeft >= currentScrollLeft && elementRight <= currentScrollLeft + containerWidth

        if (!isElementVisible) {
          container.scrollTo({
            left: Math.max(0, scrollLeft),
            behavior: 'smooth'
          })
        }
      }
    }

    const timeoutId = setTimeout(scrollToCenter, 50)
    return () => clearTimeout(timeoutId)
  }, [activeIndex, isVertical])

  return {
    activeIndex,
    setActiveIndex,
    handleTabClick,
    sectionRef,
    buttonRefs,
    isVertical,
    setIsHovering
  }
}

export default useCardTabs
