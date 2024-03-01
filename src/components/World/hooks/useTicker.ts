import { useEffect } from 'react'
import { clearTicker, setWorldTicker } from '../utils'
import { WorldTypes } from '@/src/types/WorldTypes'
import usePub from '@/src/bus/usePub'
import messageTypes from '@/src/bus/messageTypes'

export default function useTicker({
    tickerInterval,
    tickTime,
    updateTime,
    engineRef,
    runnerRef,
    renderRef,
    rocketRef,
}: {
    tickerInterval: WorldTypes['tickerInterval']
    tickTime: number
    updateTime: number
    engineRef: WorldTypes['engineRef']
    runnerRef: WorldTypes['runnerRef']
    renderRef: WorldTypes['renderRef']
    rocketRef: WorldTypes['rocketRef']
}) {
    const tickPublisher = usePub({ messageType: messageTypes.PHYSICS_TICK })

    useEffect(() => {
        if (engineRef.current && runnerRef.current && renderRef.current) {
            clearTicker(tickerInterval)

            /* Set world ticker */
            tickerInterval.current = setWorldTicker({
                tickPublisher,
                updateTime,
                tickTime,
                engineRef,
                runnerRef,
                renderRef,
                rocketRef,
            })
        }
    }, [tickTime, updateTime])
}
