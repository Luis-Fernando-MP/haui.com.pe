import FocusGallery from '@common/components/focus-gallery'
import Footer from '@common/components/footer'
import FooterGradient from '@common/components/footer-gradient'
import NavBar from '@common/components/navbar'
import { bodyFonts } from '@common/metadata/fonts'
import { globalMetadata as metadata, viewport } from '@common/metadata/global.metadata'
import Themes from '@common/style/themes'
import NextTopLoader from 'nextjs-toploader'
import type { FC, ReactNode } from 'react'

import '@common/style/themes/themes.css'
import './globals.css'

interface Props {
  children?: ReactNode | ReactNode[]
}

const Bootstrap: FC<Props> = ({ children }) => {
  return (
    <html lang='es' className={`${bodyFonts} no-scrollbar`} data-lt-installed='true' suppressHydrationWarning>
      <body className='no-scrollbar bg-bg1 relative flex min-h-screen w-screen flex-col overflow-x-clip'>
        <NextTopLoader color='var(--fn1)' showSpinner={false} />
        <Themes>
          <NavBar />
          {children}
          <FooterGradient />
          <Footer />
          <FocusGallery />
        </Themes>
      </body>
    </html>
  )
}

export default Bootstrap
export { metadata, viewport }
