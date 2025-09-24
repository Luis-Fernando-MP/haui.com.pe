import { Technology } from '@/lib/techQuery/tech.type'
import Button from '@/shared/ui/components/Button'
import { Image } from '@unpic/react/nextjs'
import type { FC } from 'react'

interface Props extends Technology {
  noLabel?: boolean
  className?: string
}

const TechChip: FC<Props> = ({ name, icon, noLabel, className = '' }) => {
  return (
    <Button className={`border-bg3 bg-bg1 border ${className}`} title={name}>
      <Image className='contain' src={icon} width={25} height={25} alt={name} />
      {!noLabel && <h5 className='text-fn2 font-mono'>{name}</h5>}
    </Button>
  )
}

export default TechChip
