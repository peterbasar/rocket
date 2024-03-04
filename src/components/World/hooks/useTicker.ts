import { useEffect } from 'react'
import { clearTicker, setWorldTicker } from '../utils'
import { WorldTypes } from '@/src/types/WorldTypes'
import usePub from '@/src/bus/usePub'
import messageTypes from '@/src/bus/messageTypes'
import useSub from '@/src/bus/useSub'

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
    // eslint-disable-next-line no-console
    console.log('useTicker')
    const tickPublisher = usePub({ messageType: messageTypes.PHYSICS_TICK })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const subSetupFinished = useSub({
        messageType: messageTypes['WORLD_SETUP_FINISHED'],
        fn: () => {
            tickerSetup({ tickerInterval, tickTime, updateTime })
        },
    })

    function tickerSetup({
        tickerInterval,
        tickTime,
        updateTime,
    }: {
        tickerInterval: WorldTypes['tickerInterval']
        tickTime: number
        updateTime: number
    }) {
        if (engineRef.current && runnerRef.current && renderRef.current) {
            // eslint-disable-next-line no-console
            console.log('ticker not setup')

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
        } else {
            // eslint-disable-next-line no-console
            console.log('ticker not setup')
        }
    }

    useEffect(() => {
        tickerSetup({ tickerInterval, tickTime, updateTime })
    }, [tickTime, updateTime, engineRef.current, runnerRef.current, renderRef.current])
}
