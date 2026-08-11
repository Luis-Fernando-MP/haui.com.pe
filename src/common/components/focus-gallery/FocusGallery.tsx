'use client'

import Button from '@common/components/button'
import Image from '@common/components/image'
import { cn } from '@common/core/cn'
import { ChevronLeftIcon, ChevronRightIcon, XIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { useFocusGallery } from './useFocusGallery'

const ease = [0.22, 1, 0.36, 1] as const
const VIEW_W = 1600
const VIEW_H = 1200
const OPT_W = 1920
const OPT_Q = 75

const optimizedUrl = (src: string, width = OPT_W) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${OPT_Q}`

const FocusGalleryComponent = () => {
  const {
    isModalOpen,
    activeImage,
    currentImageIndex,
    isImageZoomed,
    panPosition,
    canNavigateToNext,
    canNavigateToPrevious,
    hasMultipleImages,
    imageGallery,
    modalContainerRef,
    mainImageRef,
    thumbnailsContainerRef,
    zoomScale,
    isDraggingImage,
    closeModal,
    navigateToPrevious,
    navigateToNext,
    navigateToIndex,
    toggleImageZoom,
    handleMouseDown,
    handleMouseUp,
    handleImageClick,
    HandleCloseOverlay,
    btnCloseRef
  } = useFocusGallery()

  const readySrcs = useRef(new Set<string>())
  const [, bumpReady] = useState(0)
  const [warmSiblings, setWarmSiblings] = useState(false)

  const markReady = useEffectEvent((src: string) => {
    if (readySrcs.current.has(src)) return
    readySrcs.current.add(src)
    bumpReady(n => n + 1)
    if (imageGallery.length > 1) setWarmSiblings(true)
  })

  useEffect(() => {
    if (!isModalOpen) {
      setWarmSiblings(false)
      return
    }

    const node = mainImageRef.current
    if (activeImage && node?.complete && node.naturalWidth > 0) {
      markReady(activeImage.src)
    }
  }, [isModalOpen, activeImage?.src, currentImageIndex, mainImageRef])

  useEffect(() => {
    if (!isModalOpen || !warmSiblings || imageGallery.length < 2) return

    for (let i = 0; i < imageGallery.length; i++) {
      if (i === currentImageIndex) continue
      const src = imageGallery[i]?.src
      if (!src || readySrcs.current.has(src)) continue

      const img = new window.Image()
      img.decoding = 'async'
      img.fetchPriority = 'low'
      img.onload = () => {
        if (!readySrcs.current.has(src)) {
          readySrcs.current.add(src)
          bumpReady(n => n + 1)
        }
      }
      img.src = optimizedUrl(src)
    }
  }, [isModalOpen, warmSiblings, imageGallery, currentImageIndex])

  if (typeof document === 'undefined') return null

  const caption = activeImage?.caption?.trim() ?? ''
  const action = activeImage?.action?.trim() ?? ''
  const showCaption = caption.length + action.length > 0 && !isImageZoomed
  const altText = caption.replace(/<[^>]+>/g, '').trim() || 'Imagen de la galería'
  const activeReady = Boolean(activeImage && readySrcs.current.has(activeImage.src))

  return createPortal(
    <AnimatePresence>
      {isModalOpen && activeImage != null && (
        <motion.div
          key='focus-gallery'
          role='dialog'
          aria-modal='true'
          aria-label='Galería de imágenes'
          ref={modalContainerRef}
          onClick={HandleCloseOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease }}
          className='bg-bg1/10 fixed inset-0 z-100 flex flex-col overflow-hidden backdrop-blur-sm'
        >
          {hasMultipleImages && (
            <div aria-hidden className='bg-bg3/50 absolute inset-x-0 top-0 h-0.5'>
              <motion.div
                initial={false}
                animate={{ width: `${((currentImageIndex + 1) / imageGallery.length) * 100}%` }}
                transition={{ duration: 0.35, ease }}
                className='gradient h-full'
              />
            </div>
          )}

          <header className='flex shrink-0 items-center justify-between gap-3 p-4'>
            {hasMultipleImages && (
              <div className='bg-bg1 border-bg3 flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 font-mono text-xs'>
                <span className='text-fn1 font-semibold'>{String(currentImageIndex + 1).padStart(2, '0')}</span>
                <span className='text-fn2/50'>/</span>
                <span className='text-fn2'>{String(imageGallery.length).padStart(2, '0')}</span>
              </div>
            )}

            <div className='bg-bg1 border-bg3 ml-auto flex h-10 shrink-0 items-center gap-1 rounded-full border px-1.5'>
              <Button
                onClick={toggleImageZoom}
                variant='ghost'
                size='icon'
                aria-pressed={isImageZoomed}
                aria-label={isImageZoomed ? 'Alejar imagen' : 'Acercar imagen'}
                className='size-8 rounded-full'
              >
                {isImageZoomed && <ZoomOutIcon className='size-4' />}
                {!isImageZoomed && <ZoomInIcon className='size-4' />}
              </Button>

              <span aria-hidden className='bg-bg3 h-5 w-px' />

              <Button
                ref={btnCloseRef}
                onClick={closeModal}
                variant='ghost'
                size='icon'
                aria-label='Cerrar galería'
                className='size-8 rounded-full'
              >
                <XIcon className='size-4' />
              </Button>
            </div>
          </header>

          <figure className='flex min-h-0 flex-1 flex-col px-4 pb-4'>
            <div
              onClick={HandleCloseOverlay}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className='relative flex min-h-0 flex-1 items-center justify-center'
            >
              {!activeReady && (
                <span
                  aria-hidden
                  className='border-bg3 border-t-fn1 pointer-events-none absolute size-8 animate-spin rounded-full border-2'
                />
              )}

              <div className='relative grid max-h-full max-w-full place-items-center'>
                {imageGallery.map((galleryImage, imageIndex) => {
                  const active = imageIndex === currentImageIndex
                  if (!active && !warmSiblings && imageIndex !== 0) return null

                  return (
                    <Image
                      key={`${galleryImage.src}-${imageIndex}`}
                      ref={active ? mainImageRef : undefined}
                      src={galleryImage.src}
                      width={VIEW_W}
                      height={VIEW_H}
                      layout='constrained'
                      unstyled
                      objectFit='contain'
                      sizes='100vw'
                      alt={active ? altText : ''}
                      aria-hidden={!active}
                      draggable={false}
                      loading={active || warmSiblings ? 'eager' : 'lazy'}
                      decoding='async'
                      fetchPriority={active ? 'high' : 'low'}
                      onLoad={() => markReady(galleryImage.src)}
                      onClick={e => {
                        if (!active) return
                        e.stopPropagation()
                        handleImageClick()
                      }}
                      style={{
                        transform:
                          active && isImageZoomed
                            ? `scale(${zoomScale}) translate(${panPosition.x}px, ${panPosition.y}px)`
                            : undefined
                      }}
                      className={cn(
                        'col-start-1 row-start-1 max-h-[calc(100vh-220px)] max-w-full rounded-2xl object-contain shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]',
                        'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
                        active && 'z-[1]',
                        active && activeReady ? 'opacity-100' : 'opacity-0',
                        !active && 'pointer-events-none',
                        active && isImageZoomed && 'cursor-grab active:cursor-grabbing',
                        active && !isImageZoomed && 'cursor-zoom-in',
                        isDraggingImage && active && 'transition-none'
                      )}
                    />
                  )
                })}
              </div>

              {showCaption && (
                <figcaption
                  onClick={e => e.stopPropagation()}
                  className='bg-bg1 border-bg3 absolute bottom-4 left-1/2 z-10 flex w-[min(100%-2rem,400px)] -translate-x-1/2 flex-col gap-3 overflow-hidden rounded-xl border p-4 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.4)]'
                >
                  <div className='flex items-center gap-1.5' aria-hidden>
                    <span className='bg-semantic-danger size-2.5 rounded-full' />
                    <span className='bg-semantic-warning size-2.5 rounded-full' />
                    <span className='bg-semantic-success size-2.5 rounded-full' />
                  </div>

                  {caption.length > 0 && (
                    <div
                      className='text-fn1 [&_p]:text-fn1 min-w-0 text-sm leading-relaxed [&_p]:text-sm'
                      dangerouslySetInnerHTML={{ __html: caption }}
                    />
                  )}

                  {action.length > 0 && (
                    <Button
                      href={action}
                      target='_blank'
                      rel='noopener noreferrer'
                      showIconLink
                      className='h-9 w-fit shrink-0 rounded-full px-4'
                    >
                      {activeImage.actionText}
                    </Button>
                  )}
                </figcaption>
              )}

              {hasMultipleImages && !isImageZoomed && (
                <>
                  <Button
                    onClick={e => {
                      e.stopPropagation()
                      navigateToPrevious()
                    }}
                    disabled={!canNavigateToPrevious}
                    variant='outline'
                    size='icon'
                    aria-label='Imagen anterior'
                    className='absolute top-1/2 left-0 z-10 size-10 -translate-y-1/2 rounded-full sm:left-2'
                  >
                    <ChevronLeftIcon className='size-5' />
                  </Button>

                  <Button
                    onClick={e => {
                      e.stopPropagation()
                      navigateToNext()
                    }}
                    disabled={!canNavigateToNext}
                    variant='outline'
                    size='icon'
                    aria-label='Imagen siguiente'
                    className='absolute top-1/2 right-0 z-10 size-10 -translate-y-1/2 rounded-full sm:right-2'
                  >
                    <ChevronRightIcon className='size-5' />
                  </Button>
                </>
              )}
            </div>
          </figure>

          {hasMultipleImages && !isImageZoomed && (
            <nav aria-label='Miniaturas de la galería' className='shrink-0 px-4 pb-4'>
              <div ref={thumbnailsContainerRef} className='no-scrollbar mx-auto flex w-fit max-w-full gap-2 overflow-x-auto'>
                {imageGallery.map((galleryImage, imageIndex) => (
                  <Button
                    key={`thumb-${galleryImage.src}-${imageIndex}`}
                    onClick={() => navigateToIndex(imageIndex)}
                    variant='ghost'
                    size='icon'
                    aria-label={`Ver imagen ${imageIndex + 1}`}
                    aria-current={imageIndex === currentImageIndex}
                    className={cn(
                      'size-14 shrink-0 overflow-hidden rounded-xl p-px transition-[opacity,background-color] duration-200 motion-reduce:transition-none',
                      imageIndex === currentImageIndex && 'gradient',
                      imageIndex !== currentImageIndex && 'bg-bg3/70 hover:bg-bg3 opacity-50 hover:opacity-100'
                    )}
                  >
                    <span className='bg-bg1 flex size-full items-center justify-center overflow-hidden rounded-[11px]'>
                      <Image
                        src={galleryImage.src}
                        width={56}
                        height={56}
                        layout='fixed'
                        unstyled
                        objectFit='cover'
                        alt=''
                        loading={warmSiblings || imageIndex <= currentImageIndex + 1 ? 'eager' : 'lazy'}
                        fetchPriority='low'
                        decoding='async'
                        className='size-full object-cover'
                      />
                    </span>
                  </Button>
                ))}
              </div>
            </nav>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default FocusGalleryComponent
