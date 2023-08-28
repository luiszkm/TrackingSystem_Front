import './globals.css'
import type { Metadata } from 'next'
import { AiFillCar } from 'react-icons/ai'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full '>
      <body className={'h-full'}>
        <header className="bg-yellow-400 px-8 text-white py-5 flex justify-between items-center">
          <a href='/'
           className="font-bold text-2xl flex items-center gap-4 text-zinc-900">
            <AiFillCar />
            Dev Driver</a>
        </header>
        {children}</body>
    </html>
  )
}
