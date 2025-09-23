import { bodyFonts } from '@/shared/config/fonts'
import { globalMetadata as metadata, viewport } from '@/shared/config/metadata/global.metadata'
import Footer from '@/shared/ui/components/Footer'
import FooterGradient from '@/shared/ui/components/FooterGradient'
import NavBar from '@/shared/ui/components/NavBar'
import { ThemeProvider } from 'next-themes'
import { ViewTransitions } from 'next-view-transitions'
import NextTopLoader from 'nextjs-toploader'
import type { FC, ReactNode } from 'react'
import { Toaster } from 'sonner'

import './globals.css'

interface Props {
  children?: ReactNode | ReactNode[]
}

const Bootstrap: FC<Props> = ({ children }) => {
  return (
    <ViewTransitions>
      <html lang='es' className={`${bodyFonts} no-scrollbar`} data-lt-installed='true' suppressHydrationWarning>
        <body className='bg-bg1 relative flex min-h-screen max-w-screen flex-col'>
          <Toaster position='top-center' />
          <NextTopLoader color='var(--tn1)' showSpinner={false} />
          <ThemeProvider defaultTheme='system' enableSystem attribute={'class'} disableTransitionOnChange>
            <NavBar />
            {children}
            <FooterGradient />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}

export default Bootstrap
export { metadata, viewport }
