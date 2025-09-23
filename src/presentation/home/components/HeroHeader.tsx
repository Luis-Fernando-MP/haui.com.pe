import { Image } from '@unpic/react/nextjs'
import Link from 'next/link'
import type { FC } from 'react'

const HeroHeader: FC = () => {
  return (
    <article className='relative flex h-[80vh] w-full items-center justify-center gap-24 overflow-x-hidden max-lg:flex-col max-lg:gap-10 max-md:px-5'>
      <Image
        src='/logo-big.webp'
        width={370}
        height={370}
        alt='logo principal'
        className='contain pointer-events-none relative z-[1] select-none max-lg:h-[200px] max-lg:w-[200px]'
      />

      <div className='flex w-fit flex-col gap-5 max-lg:text-center'>
        <h2 className='text-fn2 font-mono'>Portfolio / 2025</h2>
        <h1 className='mb-4 text-6xl font-bold'>
          LUIS
          <br /> FERNANDO
        </h1>
        <p className='text-fn2 text-h4 max-w-[440px] font-mono'>
          <strong className='text-fn1'> Desarrollador y diseñador de aplicaciones full stack</strong>, pero mi fuerte es la
          creación de <strong>aplicaciones web</strong> funcionales e interactivas centradas en el usuario.
        </p>
        <Link href='#contact' className='flex items-center gap-2 max-lg:justify-center'>
          <span className='text-[0.5rem] text-green-500'>●</span>
          <h4 className='text-fn2'>Disponible para trabajar</h4>
        </Link>
      </div>
      <div className='font-rubik text-fn2 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[10rem] leading-[1] opacity-15 select-none max-md:text-[6rem]'>
        LUIS
        <br /> FERNANDO
        <br /> DEVELOPER
      </div>
    </article>
  )
}

export default HeroHeader
