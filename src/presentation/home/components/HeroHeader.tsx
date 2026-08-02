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
    <article className='relative flex min-h-[72vh] w-full items-center justify-center gap-16 overflow-x-hidden px-5 pt-8 max-lg:flex-col max-lg:gap-8 md:pt-4'>
      <Image
        src='/logo-big.webp'
        width={340}
        height={340}
        alt='logo principal'
        priority
        className='contain pointer-events-none relative z-[1] select-none max-lg:h-[180px] max-lg:w-[180px]'
      />

      <div className='relative z-[1] flex w-fit flex-col gap-4 max-lg:items-center max-lg:text-center'>
        <p className='text-fn2 font-mono text-sm tracking-wide'>Portfolio / 2026</p>
        <h1 className='text-6xl leading-[1.05] font-extrabold md:text-7xl'>
          <span className='text-gradient'>LUIS</span>
          <br /> FERNANDO
        </h1>
        <p className='text-fn2 text-h4 max-w-[440px] font-mono'>
          <strong className='text-fn1'>Desarrollador y diseñador de aplicaciones full stack</strong>, con foco en{' '}
          <strong className='text-fn1'>aplicaciones web</strong> funcionales, interactivas y centradas en el usuario.
        </p>
        <Button href='#contact' variant='border' className='mt-1'>
          <span className='text-[0.5rem] text-green-500' aria-hidden>
            ●
          </span>
          <span>Disponible para trabajar</span>
        </Button>
      </div>

      <div
        aria-hidden
        className='font-rubik text-fn2 pointer-events-none absolute top-1/2 left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 text-center text-[8rem] leading-[0.95] opacity-10 select-none md:text-[10rem]'
      >
        LUIS
        <br /> FERNANDO
        <br /> DEVELOPER
      </div>
    </article>
  )
}

export default HeroHeader
