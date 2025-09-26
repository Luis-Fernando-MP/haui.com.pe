import HeroGrainGradient from '@/presentation/home/components/HeroGrainGradient'
import { bodyFonts } from '@/shared/config/fonts'
import { globalMetadata as metadata, viewport } from '@/shared/config/metadata/global.metadata'
import FocusGallery from '@/shared/ui/components/FocusGallery'
import Footer from '@/shared/ui/components/Footer'
import FooterGradient from '@/shared/ui/components/FooterGradient'
import NavBar from '@/shared/ui/components/NavBar'
import { listThemes } from '@/shared/ui/components/ThemeChanger/ThemeChanger'
import { ThemeProvider } from 'next-themes'
import { ViewTransitions } from 'next-view-transitions'
import NextTopLoader from 'nextjs-toploader'
import type { FC, ReactNode } from 'react'
import { Toaster } from 'sonner'

import './global-themes.css'
import './globals.css'

interface Props {
  children?: ReactNode | ReactNode[]
}

const Bootstrap: FC<Props> = ({ children }) => {
  return (
    <ViewTransitions>
      <html lang='es' className={`${bodyFonts} no-scrollbar`} data-lt-installed='true' suppressHydrationWarning>
        <body className='no-scrollbar bg-bg1 relative flex min-h-screen w-screen flex-col overflow-x-clip'>
          <Toaster position='top-center' />
          <NextTopLoader color='var(--tn1)' showSpinner={false} />
          <ThemeProvider defaultTheme='system' themes={listThemes} enableSystem attribute={'class'} disableTransitionOnChange>
            <HeroGrainGradient />
            <NavBar />
            {children}
            <FooterGradient />
            <Footer />
            <FocusGallery />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}

export default Bootstrap
export { metadata, viewport }
