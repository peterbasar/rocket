'use client'
import dynamic from 'next/dynamic'
import BusContextProvider from '@/src/bus/BusContextProvider'

/* Dynamic imports */
const World = dynamic(() => import('../components/World/World'), { ssr: false })

export default function Home() {
    return (
        <BusContextProvider>
            <canvas className="absolute w-[100vw] h-[100vh] top-0 z-[-1] bg-gray-900" />
            <World />
        </BusContextProvider>
    )
}
