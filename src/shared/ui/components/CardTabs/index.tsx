'use client'

import { cn } from '@/lib/utils'
import { twMerge } from 'tailwind-merge'

/* eslint-disable @typescript-eslint/no-explicit-any */
import useCardTabs from './useCardTabs'

type TabOrientation = 'vertical' | 'horizontal'

interface CardTabsProps<T> {
  items: T[]
  renderTab: (item: T, isActive: boolean, index: number) => React.ReactNode
  renderContent: (item: T, index: number) => React.ReactNode
  orientation?: TabOrientation
  defaultIndex?: number
  className?: string
  onTabChange?: (item: T, index: number) => void
  enableGradientLines?: boolean
  gradientColors?: string[]
  tabsClassName?: string
  contentClassName?: string
  autoAdvance?: boolean
  autoAdvanceInterval?: number
  connectorLineSize?: number
}

const CardTabs = <T,>({
  items,
  renderTab,
  renderContent,
  orientation = 'vertical',
  defaultIndex = 0,
  className,
  onTabChange,
  enableGradientLines = true,
  gradientColors = ['var(--gr-from)', 'var(--gr-via)', 'var(--gr-to)'],
  tabsClassName,
  contentClassName,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
  connectorLineSize = 30
}: CardTabsProps<T>) => {
  const { activeIndex, handleTabClick, sectionRef, buttonRefs, isVertical, setIsHovering } = useCardTabs({
    items,
    orientation,
    defaultIndex,
    onTabChange,
    autoAdvance,
    autoAdvanceInterval
  })

  const currentItem = items[activeIndex]

  const defaultConnectorLine = (index: number) => {
    const isLineActive = index < activeIndex

    const baseStyle = isVertical
      ? { height: `${connectorLineSize}px`, width: '1.5px' }
      : { height: '1.5px', width: `${connectorLineSize}px` }

    if (!enableGradientLines || !isLineActive || gradientColors.length < 2) {
      return <div className='bg-bg3' style={baseStyle} />
    }

    const effectiveActiveIndex = activeIndex > 0 ? activeIndex : 1
    const startColorIndex = Math.floor((index / effectiveActiveIndex) * (gradientColors.length - 1))
    const endColorIndex = Math.min(startColorIndex + 1, gradientColors.length - 1)

    const startColor = gradientColors[startColorIndex]
    const endColor = gradientColors[endColorIndex]

    const gradientDirection = isVertical ? 'to top' : 'to right'

    return (
      <div
        style={{
          ...baseStyle,
          backgroundImage: `linear-gradient(${gradientDirection}, ${startColor}, ${endColor})`
        }}
      />
    )
  }

  const containerClasses = cn(isVertical ? 'flex gap-5 w-fit' : 'flex flex-col gap-5 w-fit max-w-full', className)

  const tabsContainerClasses = cn(
    'no-scrollbar',
    isVertical
      ? 'max-h-[390px] h-full flex flex-col items-center overflow-y-auto min-w-[50px]'
      : 'max-w-[390px] w-full flex overflow-x-auto',
    tabsClassName
  )

  const tabItemWrapperClasses = cn(isVertical ? 'flex flex-col items-center' : 'flex flex-row items-center')

  return (
    <div className={twMerge(containerClasses)} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <section ref={sectionRef} className={twMerge(tabsContainerClasses)}>
        {items.map((item, index) => {
          const isActive = index === activeIndex
          const itemId = (item as any).id || index

          return (
            <div
              key={itemId}
              ref={el => (buttonRefs.current[index] = el as any)}
              className={tabItemWrapperClasses}
              onClick={() => handleTabClick(index)}
            >
              {renderTab(item, isActive, index)}
              {index < items.length - 1 && defaultConnectorLine(index)}
            </div>
          )
        })}
      </section>

      <div className={contentClassName}>{renderContent(currentItem, activeIndex)}</div>
    </div>
  )
}

export default CardTabs
