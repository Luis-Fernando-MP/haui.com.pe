import Button from '@common/components/button'
import Image from '@common/components/image'
import { Technology } from '@common/core/queries/techQuery/tech.type'
import type { FC } from 'react'

interface Props extends Technology {
  noLabel?: boolean
  className?: string
}

const TechChip: FC<Props> = ({ name, icon, noLabel, className = '' }) => {
  return (
    <Button variant='outline' className={className} title={name}>
      <Image
        className='size-[25px] object-contain'
        src={icon}
        width={25}
        height={25}
        layout='fixed'
        unstyled
        objectFit='contain'
        alt={name}
      />
      {!noLabel && <h5 className='text-fn2 font-mono'>{name}</h5>}
    </Button>
  )
}

export default TechChip
