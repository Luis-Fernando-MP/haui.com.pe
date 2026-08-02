'use client'

import { useFocusGalleryStore } from '@common/components/focus-gallery/store'
import { Achievements, devContributionColor } from '@common/core/queries/achievementsQuery/achievement.type'
import { memo, type FC } from 'react'

type Props = Achievements

/**
 * Achievement
 * descripcion: tarjeta de logro; abre FocusGallery por store sin montar imágenes ocultas
 * propiedades: Achievements (name, path, AdditionalImages, achievementType, ...)
 * ejemplos: <Achievement {...achievement} />
 */
const Achievement: FC<Props> = props => {
  const { achievementType, name, devContribution, acquisitionDate, path, AdditionalImages, actionLink } = props
  const open = useFocusGalleryStore(s => s.open)
  const achievementColor = devContributionColor[devContribution]

  const handleOpen = (): void => {
    const images = [
      {
        src: path,
        caption: `<p>${name}</p>`,
        action: actionLink,
        actionText: 'Consultar information'
      },
      ...(AdditionalImages?.map(src => ({ src })) ?? [])
    ]
    open(images, 0)
  }

  return (
    <button
      onClick={handleOpen}
      className='border-bg3 flex h-[200px] w-[290px] flex-col justify-between rounded-xl border p-5 text-left focus:outline-none'
    >
      <span className='bg-bg2 border-bg3 text-fn2 w-fit rounded-full border px-3 py-1.5 font-mono'>{achievementType}</span>

      <h4 className='font-medium'>{name}</h4>

      <div className='flex justify-between'>
        <div className='flex items-center gap-2.5'>
          <div className='h-4 w-4 rounded-md' style={{ background: achievementColor }} />
          <h5 className='text-fn2 flex gap-2.5 font-mono'>{devContribution}</h5>
        </div>
        <span className='text-fn2 font-mono'>{acquisitionDate}</span>
      </div>
    </button>
  )
}

export default memo(Achievement)
