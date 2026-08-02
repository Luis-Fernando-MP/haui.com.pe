'use client'

import Button from '@common/components/button'
import Image from '@common/components/image'
import ThemeChanger from '@common/components/theme-changer'
import { cn } from '@common/core/cn'
import { INFO } from '@common/core/constants'
import { ArrowUpRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { type FC, useLayoutEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import NavLinks from './NavLinks'
import NavMenu from './NavMenu'

const MAX_WIDTH = 1100
const ease = [0.22, 1, 0.36, 1] as const

const NavBar: FC = () => {
  const shellRef = useRef<HTMLElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const [widths, setWidths] = useState({ full: MAX_WIDTH, fit: MAX_WIDTH })

  const { isIntersecting, ref, entry } = useIntersectionObserver({
    threshold: 0.9,
    rootMargin: '0px',
    freezeOnceVisible: false
  })

  const scrolled = entry != null && !isIntersecting

  useLayoutEffect(() => {
    const shell = shellRef.current
    const row = rowRef.current
    if (!shell || !row) return

    const measure = () => {
      const full = Math.min(MAX_WIDTH, shell.clientWidth)
      const previousWidth = row.style.width
      row.style.width = 'max-content'
      const fit = Math.ceil(row.scrollWidth)
      row.style.width = previousWidth
      setWidths({ full, fit: Math.min(fit, full) })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(shell)
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={ref} aria-hidden className='pointer-events-none absolute top-0 left-0 h-px w-full' />

      <header
        ref={shellRef}
        className='fixed top-0 right-0 left-0 z-50 flex h-20 w-full items-center justify-center px-4 md:px-6'
      >
        <motion.div
          initial={false}
          animate={{
            width: scrolled ? widths.fit + 2 : widths.full,
            borderRadius: scrolled ? 999 : 16
          }}
          transition={{ duration: 0.55, ease }}
          className={cn('relative max-w-full will-change-[width]', scrolled && 'p-px')}
        >
          <div
            aria-hidden
            className={cn(
              'gradient absolute inset-0 -z-10 rounded-[inherit] transition-opacity duration-500 ease-out',
              scrolled ? 'opacity-100' : 'opacity-0'
            )}
          />

          <nav
            className={cn(
              'bg-bg1 relative h-14 rounded-[inherit] transition-[box-shadow] duration-500 ease-out',
              scrolled ? 'shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]' : 'shadow-none'
            )}
          >
            <div ref={rowRef} className='flex h-14 w-full items-center justify-between gap-3 px-3'>
              <Link
                href='/'
                className='group focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
              >
                <Image
                  src='/logo.webp'
                  className='bg-logo-bg size-9 shrink-0 rounded-lg p-1 transition-transform duration-300 group-hover:scale-[1.05]'
                  width={36}
                  height={36}
                  alt={`${INFO.devShortName} logo`}
                  priority
                />
                <span className='text-fn1 text-lg font-bold tracking-tight whitespace-nowrap'>{INFO.devShortName}</span>
              </Link>

              <NavLinks className='max-region:hidden' />

              <div className='flex shrink-0 items-center gap-2'>
                <NavMenu />
                <ThemeChanger />
                <div className='bg-bg3/60 hidden h-6 w-px sm:block' />
                <Button
                  href={INFO.cv}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='active'
                  className='group h-9 shrink-0 rounded-full px-4 text-sm font-semibold whitespace-nowrap sm:px-5'
                  aria-label='Descargar CV'
                >
                  <span className='text-bg1'>CV</span>
                  <ArrowUpRightIcon className='text-bg1/70 size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </Button>
              </div>
            </div>
          </nav>
        </motion.div>
      </header>
    </>
  )
}

export default NavBar
