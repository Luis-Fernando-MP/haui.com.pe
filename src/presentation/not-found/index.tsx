import Link from 'next/link'
import type { FC, ReactNode } from 'react'

interface Props {
  children?: ReactNode | ReactNode[]
}

const NotFound: FC<Props> = ({}) => {
  return (
    <main className='flex h-full w-full flex-1 flex-col items-center justify-center'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='/' className='text-tn1 underline underline-offset-4'>
        Return NotFound
      </Link>
    </main>
  )
}

export default NotFound
