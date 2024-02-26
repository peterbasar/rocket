'use client'
import dynamic from 'next/dynamic'
import BusContextProvider from '@/src/bus/BusContextProvider'

/* Dynamic imports */
const World = dynamic(() => import('../components/World'), { ssr: false })
const FollowPlayer = dynamic(() => import('../components/callbacks/FollowPlayer'), { ssr: false })
const Rocket = dynamic(() => import('../components/Rocket'), { ssr: false })

export default function Home() {
  return (
    <BusContextProvider>
      <World>
        <Rocket />
        <FollowPlayer />
      </World>
    </BusContextProvider>
  )
}
