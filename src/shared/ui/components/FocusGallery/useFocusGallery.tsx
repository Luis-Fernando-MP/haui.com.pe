import { JourneysImage } from '@/shared/config/constants/personalJourneys'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

interface Position {
  x: number
  y: number
}

interface PanLimits {
  maxPanX: number
  maxPanY: number
}

const CONF = {
  // Factor de escala cuando se hace zoom
  ZOOM_SCALE: 1.5,
  // Límite de paneo basado en el tamaño de la imagen
  PAN_LIMIT_PERCENTAGE: 0.25,
  // Sensibilidad de movimiento
  DRAG_SENSITIVITY: 0.4,
  // Umbral mínimo para iniciar el drag (evita micro-movimientos)
  DRAG_THRESHOLD: 2,
  GROUP_GALLERY_ATTRIBUTE: 'data-gallery-group'
} as const

export const useFocusGallery = () => {
  // Estados principales
  const [imageGallery, setImageGallery] = useState<JourneysImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [panPosition, setPanPosition] = useState<Position>({ x: 0, y: 0 })
  const [isDraggingImage, setIsDraggingImage] = useState(false)
  const [dragStartPosition, setDragStartPosition] = useState<Position>({ x: 0, y: 0 })
  const [initialPanPosition, setInitialPanPosition] = useState<Position>({ x: 0, y: 0 })
  const matches = useMediaQuery('(max-width: 610px)')

  // Referencias del DOM
  const modalContainerRef = useRef<HTMLDivElement>(null)
  const mainImageRef = useRef<HTMLImageElement>(null)
  const btnCloseRef = useRef<HTMLButtonElement>(null)
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null)

  // Estados computados
  const isModalOpen = currentImageIndex !== null
  const activeImage = isModalOpen ? imageGallery[currentImageIndex] : null
  const canNavigateToPrevious = isModalOpen && currentImageIndex > 0
  const canNavigateToNext = isModalOpen && currentImageIndex < imageGallery.length - 1
  const hasMultipleImages = imageGallery.length > 1

  // Función para centrar la miniatura activa
  const scrollToActiveThumbnail = useCallback(() => {
    if (!thumbnailsContainerRef.current || !hasMultipleImages) return

    const container = thumbnailsContainerRef.current
    const activeButton = container.children[currentImageIndex] as HTMLElement

    if (!activeButton) return

    // Calcular la posición para centrar la miniatura activa
    const containerWidth = container.offsetWidth
    const buttonWidth = activeButton.offsetWidth
    const buttonLeft = activeButton.offsetLeft

    // Calcular el scroll necesario para centrar
    const targetScroll = buttonLeft - containerWidth / 2 + buttonWidth / 2

    // Aplicar el scroll suavemente
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }, [currentImageIndex, hasMultipleImages])

  const resetZoomAndPanState = useCallback(() => {
    setIsImageZoomed(false)
    setPanPosition({ x: 0, y: 0 })
    setIsDraggingImage(false)
    setInitialPanPosition({ x: 0, y: 0 })
  }, [])

  const closeModal = useCallback(() => {
    setImageGallery([])
    setCurrentImageIndex(0)
    resetZoomAndPanState()
  }, [resetZoomAndPanState])

  const navigateToPrevious = useCallback(() => {
    resetZoomAndPanState()
    const index = canNavigateToPrevious ? currentImageIndex - 1 : imageGallery.length - 1
    setCurrentImageIndex(index)
  }, [currentImageIndex, canNavigateToPrevious, resetZoomAndPanState, imageGallery.length])

  const navigateToNext = useCallback(() => {
    resetZoomAndPanState()
    const index = canNavigateToNext ? currentImageIndex + 1 : 0
    setCurrentImageIndex(index)
  }, [currentImageIndex, canNavigateToNext, resetZoomAndPanState])

  const navigateToIndex = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= imageGallery.length) return
      setCurrentImageIndex(targetIndex)
      resetZoomAndPanState()
    },
    [imageGallery.length, resetZoomAndPanState]
  )

  const toggleImageZoom = useCallback(() => {
    setIsImageZoomed(prevZoomed => !prevZoomed)
    if (!isImageZoomed) return
    setPanPosition({ x: 0, y: 0 })
    setInitialPanPosition({ x: 0, y: 0 })
  }, [isImageZoomed])

  const handleMouseDown = useCallback(
    (mouseEvent: React.MouseEvent) => {
      if (!isImageZoomed) return

      mouseEvent.preventDefault()
      setIsDraggingImage(true)
      setDragStartPosition({
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      })
      setInitialPanPosition({ ...panPosition })
    },
    [isImageZoomed, panPosition]
  )

  const handleMouseUp = useCallback(() => {
    setIsDraggingImage(false)
  }, [])

  // Calcula los límites de paneo basados en el tamaño de la imagen
  const calculatePanLimits = useCallback((): PanLimits => {
    if (!mainImageRef.current || !modalContainerRef.current) return { maxPanX: 0, maxPanY: 0 }

    const imageRect = mainImageRef.current.getBoundingClientRect()

    // Calcular el tamaño de la imagen sin escalar
    const originalWidth = imageRect.width
    const originalHeight = imageRect.height

    // Calcular el tamaño de la imagen escalada
    const scaledWidth = originalWidth * CONF.ZOOM_SCALE
    const scaledHeight = originalHeight * CONF.ZOOM_SCALE

    // Calcular la diferencia entre el tamaño escalado y original
    const widthDifference = scaledWidth - originalWidth
    const heightDifference = scaledHeight - originalHeight

    // Los límites son la mitad de la diferencia multiplicado por el porcentaje permitido
    const maxPanX = (widthDifference / 2) * CONF.PAN_LIMIT_PERCENTAGE
    const maxPanY = (heightDifference / 2) * CONF.PAN_LIMIT_PERCENTAGE

    return {
      maxPanX: Math.max(0, maxPanX),
      maxPanY: Math.max(0, maxPanY)
    }
  }, [])

  // Actualiza la posición de paneo dentro de los límites permitidos
  const updatePanPosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!isImageZoomed || !isDraggingImage) return

      // Calcular el delta desde el punto inicial de drag
      const deltaX = (clientX - dragStartPosition.x) * CONF.DRAG_SENSITIVITY
      const deltaY = (clientY - dragStartPosition.y) * CONF.DRAG_SENSITIVITY

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
      if (distance < CONF.DRAG_THRESHOLD) return

      const { maxPanX, maxPanY } = calculatePanLimits()

      // Calcular la nueva posición: posición inicial + delta
      const targetX = initialPanPosition.x + deltaX
      const targetY = initialPanPosition.y + deltaY

      // Aplicar límites estrictos
      const clampedX = Math.min(Math.max(targetX, -maxPanX), maxPanX)
      const clampedY = Math.min(Math.max(targetY, -maxPanY), maxPanY)

      setPanPosition({ x: clampedX, y: clampedY })
    },
    [isImageZoomed, isDraggingImage, dragStartPosition, initialPanPosition, calculatePanLimits]
  )

  const handleWheelZoom = useCallback(
    (wheelEvent: WheelEvent) => {
      if (!isModalOpen) return

      wheelEvent.preventDefault()

      if (matches) return

      // Zoom in
      if (wheelEvent.deltaY < 0 && !isImageZoomed) setIsImageZoomed(true)

      // Zoom out
      if (wheelEvent.deltaY > 0 && isImageZoomed) {
        setIsImageZoomed(false)
        setPanPosition({ x: 0, y: 0 })
        setInitialPanPosition({ x: 0, y: 0 })
      }
    },
    [isModalOpen, isImageZoomed, matches]
  )

  const HandleCloseOverlay = useCallback(
    (event: React.MouseEvent) => {
      if (event.target !== event.currentTarget || !btnCloseRef || isImageZoomed) return

      btnCloseRef?.current?.click()
    },
    [isImageZoomed]
  )

  // Efecto para centrar la miniatura activa cuando cambia el índice
  useEffect(() => {
    // Usar un pequeño delay para asegurar que el DOM se haya actualizado
    const timeoutId = setTimeout(() => {
      scrollToActiveThumbnail()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [currentImageIndex, scrollToActiveThumbnail])

  useEffect(() => {
    // Inicializa la galería desde el DOM cuando se hace click
    const handleGalleryClick = (clickEvent: MouseEvent) => {
      const clickedElement = clickEvent.target as HTMLElement
      const galleryContainer = clickedElement.closest(`[${CONF.GROUP_GALLERY_ATTRIBUTE}]`) as HTMLElement
      if (!galleryContainer) return

      const galleryId = galleryContainer.dataset.galleryGroup
      const clickedSrc = galleryContainer.dataset.gallerySrc

      // Buscar todas las imágenes del mismo grupo
      const galleryElements = document.querySelectorAll(`[${CONF.GROUP_GALLERY_ATTRIBUTE}="${galleryId}"]`)

      let galleryImages = Array.from(galleryElements).map(element => {
        const el = element as HTMLElement
        const index = Number(el.dataset.galleryIndex)
        return {
          src: el.dataset.gallerySrc ?? '/fallback.webp',
          caption: el.dataset.galleryCaption ?? '',
          action: el.dataset.galleryAction,
          actionText: el.dataset.galleryActionText ?? 'Ver más',
          index: isNaN(index) ? undefined : index
        }
      })

      // Verifica si al menos una imagen tiene un índice válido
      const hasValidIndexes = galleryImages.some(img => typeof img.index === 'number')

      if (hasValidIndexes) {
        galleryImages = galleryImages.sort((a, b) => {
          const aIndex = typeof a.index === 'number' ? a.index : Infinity
          const bIndex = typeof b.index === 'number' ? b.index : Infinity
          return aIndex - bIndex
        })
      }

      // Buscar el índice de la imagen clickeada
      const realClickedIndex = galleryImages.findIndex(img => img.src === clickedSrc)
      const clickedImageIndex = realClickedIndex >= 0 ? realClickedIndex : 0

      setImageGallery(galleryImages)
      setCurrentImageIndex(clickedImageIndex)
    }

    document.addEventListener('click', handleGalleryClick)
    return () => document.removeEventListener('click', handleGalleryClick)
  }, [])

  useEffect(() => {
    if (!isModalOpen) return
    // Atajos de teclado

    const EVENTS = {
      Escape: () => btnCloseRef?.current?.click(),
      ArrowLeft: navigateToPrevious,
      ArrowRight: navigateToNext,
      Enter: toggleImageZoom,
      ' ': (k: KeyboardEvent) => {
        k.preventDefault()
        toggleImageZoom()
      }
    }

    const handleKeyNavigation = (k: KeyboardEvent) => {
      const action = EVENTS[k.key as keyof typeof EVENTS]
      if (action) action(k)
    }

    document.addEventListener('keydown', handleKeyNavigation)
    return () => document.removeEventListener('keydown', handleKeyNavigation)
  }, [isModalOpen, navigateToPrevious, navigateToNext, toggleImageZoom])

  useEffect(() => {
    if (!isDraggingImage) return
    // Eventos drag
    const handleGlobalMouseMove = (mouseMoveEvent: MouseEvent) => {
      mouseMoveEvent.preventDefault()
      updatePanPosition(mouseMoveEvent.clientX, mouseMoveEvent.clientY)
    }

    const handleGlobalMouseUp = () => setIsDraggingImage(false)

    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false })
    document.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDraggingImage, updatePanPosition])

  useEffect(() => {
    if (!isModalOpen || !activeImage) return
    // Evento para el Zoom

    document.addEventListener('wheel', handleWheelZoom, { passive: false })
    return () => document.removeEventListener('wheel', handleWheelZoom)
  }, [isModalOpen, activeImage, handleWheelZoom])

  return {
    // Estados del modal
    isModalOpen,
    activeImage,
    currentImageIndex,
    isImageZoomed,
    panPosition,
    canNavigateToPrevious,
    canNavigateToNext,
    hasMultipleImages,
    imageGallery,
    isDraggingImage,

    // Referencias del DOM
    modalContainerRef,
    mainImageRef,
    btnCloseRef,
    thumbnailsContainerRef,

    // Configuración
    zoomScale: CONF.ZOOM_SCALE,

    // Funciones de navegación
    closeModal,
    navigateToPrevious,
    navigateToNext,
    navigateToIndex,
    toggleImageZoom,

    handleMouseDown,
    handleMouseUp,
    HandleCloseOverlay
  }
}
