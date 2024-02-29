'use client'
import dynamic from 'next/dynamic'
import BusContextProvider from '@/src/bus/BusContextProvider'

/* Dynamic imports */
const World = dynamic(() => import('../components/World/World'), { ssr: false })

export default function Home() {
  return (
    <BusContextProvider>
      <World />
    </BusContextProvider>
  )
}
