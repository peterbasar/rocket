import { WorldTypes } from "@/src/types/WorldTypes";
import M from 'matter-js'

export default function followPlayer({ engineRef, runnerRef, renderRef, rocketRef }: {
    engineRef: WorldTypes['engineRef'],
    runnerRef: WorldTypes['runnerRef'],
    renderRef: WorldTypes['renderRef'],
    rocketRef: WorldTypes['rocketRef']
}) {
    if (engineRef.current && runnerRef.current && renderRef.current && rocketRef.current) {
        M.Render.lookAt(renderRef.current as M.Render, rocketRef.current as M.Body, {
            x: window.innerHeight / 2,
            y: window.innerWidth / 2,
        });
    }
}