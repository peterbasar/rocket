import { WorldTypes } from '@/src/types/WorldTypes'
import followPlayer from './followPlayer'
import { usePubI } from '@/src/bus/usePub'
import M from 'matter-js'

export default function setWorldTicker({
    tickPublisher,
    updateTime,
    tickTime,
    engineRef,
    runnerRef,
    renderRef,
    rocketRef,
}: {
    tickPublisher: usePubI
    updateTime: number
    tickTime: number
    engineRef: WorldTypes['engineRef']
    runnerRef: WorldTypes['runnerRef']
    renderRef: WorldTypes['renderRef']
    rocketRef: WorldTypes['rocketRef']
}) {
    return setInterval(() => {
        /* Follow player on each frame */
        followPlayer({
            engineRef,
            runnerRef,
            renderRef,
            rocketRef,
        })

        /* Move engine by a 'tick' amounts */
        if (engineRef.current && runnerRef.current) {
            M.Runner.tick(runnerRef.current, engineRef.current, tickTime)
        }

        if (rocketRef && rocketRef.current) {
            const xf = -0.009 * Math.cos(rocketRef.current.angle + Math.PI / 2)
            const yf = -0.009 * Math.sin(rocketRef.current.angle + Math.PI / 2)
            M.Body.applyForce(
                rocketRef.current,
                { x: rocketRef.current.position.x + 10, y: rocketRef.current.position.y - 50 },
                { x: xf, y: yf },
            )
        }

        tickPublisher.publish({
            data: {
                rocketRef,
            },
        })
    }, updateTime)
}
