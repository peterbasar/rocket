import React, { useState, useEffect, useRef, LegacyRef } from 'react'
import M from 'matter-js'
import usePub from '@/src/bus/usePub'
import messageTypes from '@/src/bus/messageTypes'
import { WorldTypes } from '@/src/types/WorldTypes'
import { addRocket, createRender, addGround } from './utils'
import useTicker from './hooks/useTicker'

export default function World() {
    const physicsCanvasRef: WorldTypes['rocketRef'] = useRef()
    const rocketRef: WorldTypes['rocketRef'] = useRef()
    const engineRef: WorldTypes['engineRef'] = useRef()
    const renderRef: WorldTypes['renderRef'] = useRef()
    const runnerRef: WorldTypes['runnerRef'] = useRef()
    const isInitialised = useRef(false)
    const pubSetupFinished = usePub({
        messageType: messageTypes['WORLD_SETUP_FINISHED'],
    })

    const [updateTime, setUpdateTime] = useState(15)
    const [tickTime, setTickTime] = useState(1)
    const tickerInterval: WorldTypes['tickerInterval'] = useRef()

    /* Ticker setup */
    useTicker({
        tickerInterval: tickerInterval,
        tickTime: tickTime,
        updateTime: updateTime,
        engineRef: engineRef,
        runnerRef: runnerRef,
        renderRef: renderRef,
        rocketRef: rocketRef,
    })

    /* World setup */
    useEffect(() => {
        if (physicsCanvasRef.current && isInitialised.current === false) {
            // Prevent re-running of setup
            isInitialised.current = true

            engineRef.current = M.Engine.create()
            renderRef.current = createRender({ engineRef, physicsCanvasRef })
            runnerRef.current = M.Runner.create()

            addGround({ engineRef })
            addRocket({ engineRef, rocketRef })

            if (renderRef.current) M.Render.run(renderRef.current)

            /* Inform bus that world setup finished */
            setTimeout(() => pubSetupFinished.publish(), 1000)
        }
    }, [physicsCanvasRef.current])

    return (
        <div>
            <canvas ref={physicsCanvasRef as LegacyRef<HTMLCanvasElement>} />
        </div>
    )
}
