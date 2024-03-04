'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Controls from '../components/Controls'
import BusContextProvider from '@/src/bus/BusContextProvider'
import { CANVAS_TYPES } from '../const'

/* Dynamic imports */
const World = dynamic(() => import('../components/World/World'), { ssr: false })
const Render = dynamic(() => import('../components/Render/Render'), { ssr: false })

export default function Home() {
    const [activeCanvas, setActiveCanvas] = useState(CANVAS_TYPES.RENDER)

    return (
        <BusContextProvider>
            {/* Show active canvas */}
            <World />
            {/* {activeCanvas === CANVAS_TYPES.PHYSICS ? <World /> : <></>} */}
            {activeCanvas === CANVAS_TYPES.RENDER ? <Render /> : <></>}

            <Controls activeCanvas={activeCanvas} setActiveCanvas={setActiveCanvas} />

            <div className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-gray-600 z-[-1]" />
        </BusContextProvider>
    )
}
