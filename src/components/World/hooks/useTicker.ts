import { useEffect } from "react"
import { clearTicker, setWorldTicker } from "../utils"
import { WorldTypes } from "@/src/types/WorldTypes"

export default function useTicker({
    tickerInterval,
    tickTime,
    updateTime,
    engineRef,
    runnerRef,
    renderRef,
    rocketRef,
}: {
    tickerInterval: WorldTypes['tickerInterval'],
    tickTime: number,
    updateTime: number,
    engineRef: WorldTypes['engineRef'],
    runnerRef: WorldTypes['runnerRef'],
    renderRef: WorldTypes['renderRef'],
    rocketRef: WorldTypes['rocketRef'],
}) {
    useEffect(() => {
        if (engineRef.current && runnerRef.current && renderRef.current) {
            clearTicker(tickerInterval)

            /* Set world ticker */
            tickerInterval.current = setWorldTicker({
                tickerInterval, updateTime, tickTime, engineRef, runnerRef, renderRef, rocketRef,
            })
        }
    }, [tickTime, updateTime])
}