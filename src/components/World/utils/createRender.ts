import M from 'matter-js'
import { WorldTypes } from '@/src/types/WorldTypes'

export default function createRender({
    engineRef,
    physicsCanvasRef,
}: {
    engineRef: WorldTypes['engineRef']
    physicsCanvasRef: WorldTypes['physicsCanvasRef']
}) {
    if (engineRef.current && physicsCanvasRef && physicsCanvasRef.current) {
        return M.Render.create({
            element: document.body,
            engine: engineRef.current,
            canvas: physicsCanvasRef.current,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                // wireframes: false,
                background: 'transparent',
                wireframeBackground: 'transparent',
                showAngleIndicator: true,
                showAxes: true,
                showBounds: true,
                showDebug: true,
                showStats: true,
                showPositions: true,
            },
        })
    }
    return
}
