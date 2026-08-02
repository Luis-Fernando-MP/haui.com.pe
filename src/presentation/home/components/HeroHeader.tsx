import Button from '@common/components/button'
import Image from '@common/components/image'
import type { FC } from 'react'

/**
 * HeroHeader
 * descripcion: hero de la home con marca, nombre y disponibilidad
 * propiedades: ninguna
 * ejemplos: <HeroHeader />
 */
const HeroHeader: FC = () => {
  return (
    <header className='relative flex min-h-[78vh] w-full items-center justify-center overflow-x-hidden px-5 pt-10 max-lg:flex-col max-lg:gap-10 md:gap-20 md:pt-6'>
      <Image
        src='/logo-big.webp'
        width={360}
        height={360}
        alt='Logo de Haui'
        priority
        className='pointer-events-none relative z-[1] h-auto w-[220px] object-contain select-none max-lg:w-[160px] md:w-[320px]'
      />

      <div className='relative z-[1] flex max-w-[520px] flex-col gap-5 max-lg:items-center max-lg:text-center'>
        <p className='text-fn2 font-mono text-xs tracking-[0.2em] uppercase'>Portfolio · 2026</p>

        <h1 className='text-pretty text-6xl leading-[0.98] font-extrabold tracking-tight md:text-7xl lg:text-8xl'>
          <span className='text-gradient'>LUIS</span>
          <br />
          FERNANDO
        </h1>

        <p className='text-fn2 text-pretty max-w-[440px] font-mono text-base leading-relaxed md:text-lg'>
          <strong className='text-fn1 font-semibold'>Desarrollador y diseñador full stack</strong> con foco en aplicaciones web
          funcionales, interactivas y centradas en el usuario.
        </p>

        <div className='mt-1 flex flex-wrap items-center gap-3 max-lg:justify-center'>
          <Button href='#contact' variant='active' className='px-5'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500' />
            </span>
            Disponible para trabajar
          </Button>
          <Button href='#experience' variant='border' className='px-5'>
            Ver experiencia
          </Button>
        </div>
      </div>

      <p
        aria-hidden
        className='font-rubik text-fn2 pointer-events-none absolute top-1/2 left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 text-center text-[7rem] leading-[0.92] opacity-[0.07] select-none md:text-[9.5rem]'
      >
        LUIS
        <br />
        FERNANDO
        <br />
        DEVELOPER
      </p>
    </header>
  )
}

export default HeroHeader
