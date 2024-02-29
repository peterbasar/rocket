import { WorldTypes } from "@/src/types/WorldTypes"
import followPlayer from "./followPlayer"
import M from 'matter-js'

export default function setWorldTicker({
    tickerInterval, updateTime, tickTime, engineRef, runnerRef, renderRef, rocketRef,
}: {
    tickerInterval: WorldTypes['tickerInterval'],
    updateTime: number,
    tickTime: number,
    engineRef: WorldTypes['engineRef'],
    runnerRef: WorldTypes['runnerRef'],
    renderRef: WorldTypes['renderRef'],
    rocketRef: WorldTypes['rocketRef'],
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
    }, updateTime)
}