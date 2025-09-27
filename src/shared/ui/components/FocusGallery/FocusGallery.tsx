'use client'

import { cl } from '@/lib/utils'
import { Image } from '@unpic/react/nextjs'
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import Button from '../Button'
import { useFocusGallery } from './useFocusGallery'

/* eslint-disable @next/next/no-img-element */

const FocusGalleryComponent = () => {
  const body = typeof document !== 'undefined' ? document.body : null
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
    HandleCloseOverlay,
    btnCloseRef
  } = useFocusGallery()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
  }, [activeImage?.src])

  if (!isModalOpen || !activeImage) return null

  const { src, caption, action, actionText } = activeImage
  const transform = `scale(${zoomScale}) translate(${panPosition.x}px, ${panPosition.y}px)`

  const gridNormal = 'grid-rows-[60px_1fr_100px]'
  const gridZoom = 'grid-rows-[60px_1fr]'

  const dynamicGrid = isImageZoomed || !hasMultipleImages ? gridZoom : gridNormal

  const Modal = (
    <div
      role='dialog'
      aria-modal='true'
      aria-label='Image gallery modal'
      ref={modalContainerRef}
      onClick={HandleCloseOverlay}
      className={`bg-bg1/50 fixed inset-0 z-100 grid max-h-screen w-full max-w-screen gap-5 overflow-hidden p-5 backdrop-blur-lg ${dynamicGrid}`}
    >
      {/* Controles */}
      <nav className='bg-bg1 text-fn2 border-bg3 mx-auto flex w-full max-w-[500px] flex-wrap items-center justify-between gap-2 rounded-full border px-4 py-2'>
        <Button onClick={navigateToPrevious} disabled={!canNavigateToPrevious}>
          <ArrowLeft />
        </Button>

        <div className='flex items-center gap-2.5'>
          <Button onClick={toggleImageZoom}>{isImageZoomed ? <ZoomOut /> : <ZoomIn />}</Button>

          {hasMultipleImages && (
            <h5 className='text-fn1'>
              {currentImageIndex + 1} / {imageGallery.length}
            </h5>
          )}

          <Button ref={btnCloseRef} onClick={closeModal}>
            <X />
          </Button>
        </div>

        <Button onClick={navigateToNext} disabled={!canNavigateToNext}>
          <ArrowRight />
        </Button>
      </nav>

      <figure
        onClick={e => e.stopPropagation()}
        onDoubleClick={toggleImageZoom}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={`relative flex h-full w-full items-center justify-center ${isImageZoomed ? '' : ''} ${cl(!isLoaded, 'loading')}`}
      >
        {/* Header */}
        {(caption || action) && (
          <header className='bg-bg1 absolute bottom-0 left-1/2 mb-5 flex w-full max-w-[400px] -translate-x-1/2 flex-col gap-5 overflow-hidden rounded-lg p-4'>
            <div className='flex items-center gap-2'>
              <span className='bg-from size-3 rounded-full' />
              <span className='bg-via size-3 rounded-full' />
              <span className='bg-to size-3 rounded-full' />
            </div>

            <div className='flex flex-col gap-2.5'>
              {caption && <figcaption dangerouslySetInnerHTML={{ __html: caption }} />}

              {action && (
                <Link href={action} target='_blank' rel='noopener noreferrer'>
                  <Button asClass variant='active'>
                    <span>{actionText}</span>
                  </Button>
                </Link>
              )}
            </div>
          </header>
        )}

        <img
          ref={mainImageRef}
          src={src}
          alt={caption ?? 'Image from gallery'}
          draggable={false}
          fetchPriority='high'
          onLoad={() => setIsLoaded(true)}
          style={{ transform: isImageZoomed ? transform : undefined }}
          className={`max-h-[calc(100vh-200px)] max-w-full rounded-lg object-contain transition-transform duration-300 ${cl(isImageZoomed, 'cursor-grab active:cursor-grabbing')} ${cl(!isLoaded, 'loading')} ${cl(!isImageZoomed, 'cursor-zoom-in')} ${cl(isDraggingImage, 'transition-none')} `}
        />
      </figure>

      {/* Miniaturas */}
      {hasMultipleImages && !isImageZoomed && (
        <nav ref={thumbnailsContainerRef} className='no-scrollbar mx-auto flex max-w-[90%] overflow-x-scroll overflow-y-hidden'>
          {imageGallery.map((galleryImage, imageIndex) => {
            const isActive = imageIndex === currentImageIndex

            return (
              <Button
                key={`thumb-${imageIndex}`}
                onClick={() => navigateToIndex(imageIndex)}
                className={`border-bg3 h-16 w-16 min-w-16 overflow-hidden rounded-md border p-[1px] ${
                  isActive ? 'gradient' : 'opacity-50'
                }`}
              >
                <div className='bg-bg1 h-full w-full rounded-md p-1'>
                  <Image
                    src={galleryImage.src}
                    width={60}
                    height={60}
                    alt={`Thumbnail ${imageIndex + 1}`}
                    loading='lazy'
                    fetchPriority='low'
                    background='/fallback.webp'
                    className='contain h-full w-full'
                  />
                </div>
              </Button>
            )
          })}
        </nav>
      )}
    </div>
  )

  return body ? createPortal(Modal, body) : null
}

export default FocusGalleryComponent
