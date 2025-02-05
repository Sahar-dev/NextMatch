
'use client'
import { HeroUIProvider } from '@heroui/react'
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

export default function provider({children}: {children: ReactNode}) {
  return (
    <HeroUIProvider>
      <ToastContainer position='bottom-left' hideProgressBar className='z-50'/>
    {children}
  </HeroUIProvider>
  )
}
