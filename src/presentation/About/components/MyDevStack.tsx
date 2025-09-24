import { technologies } from '@/shared/config/constants/technologies'
import Button from '@/shared/ui/components/Button'
import Title from '@/shared/ui/components/Title'
import { Image } from '@unpic/react/nextjs'
import type { FC } from 'react'

const MyDevStack: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const favTechs = technologies.filter((tech: any) => tech?.favorite)

  return (
    <section className='region max-region:px-5 relative mx-auto flex min-h-[50vh] w-full flex-col items-center gap-10 text-center'>
      <Title>Mi Stack Favorito 🌱</Title>
      <p className='w-full max-w-[400px] text-center font-mono'>
        Los uso en proyectos personales, prototipos rápidos y aprendizajes diarios
      </p>
      <div className='flex max-w-[500px] flex-wrap items-center justify-center gap-2.5'>
        {favTechs.map(tech => {
          const { icon, name } = tech

          return (
            <Button key={name + icon} className='border-bg3 bg-bg1 border' title={name}>
              <Image className='contain' src={icon} width={20} height={20} alt={name} />
              <h4 className='text-fn2'>{name}</h4>
            </Button>
          )
        })}
      </div>

      <div className='bg-fn2 pointer-events-none absolute top-0 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full opacity-50 blur-[150px] select-none'></div>
    </section>
  )
}

export default MyDevStack
