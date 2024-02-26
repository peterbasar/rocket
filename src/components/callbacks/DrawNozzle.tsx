import React, { useEffect, useContext } from "react"
import { WorldContext } from "@/src/context/WorldContextProvider"
import M from 'matter-js'

export default function DrawNozzle({ rocketRef }: { rocketRef: React.RefObject<M.Body> }) {
    const callbackName = 'DrawNozzle'
    const worldContext = useContext(WorldContext)

    useEffect(() => {
        /* Set callback if not already set */
        if (worldContext && !(callbackName in worldContext?.callbacks)) {
            worldContext.setCallbacks({
                ...worldContext.callbacks,
                [callbackName]: () => {
                    if (worldContext.renderCanvasRef.current) {
                        const ctx = worldContext.renderCanvasRef.current.getContext('2d')
                        if (ctx) {
                            console.log('draw')
                            // Define a new Path:
                            ctx.beginPath();

                            // Define a start Point
                            ctx.moveTo(0, 0);

                            // Define an end Point
                            ctx.lineTo(200, 100);

                            // Stroke it (Do the Drawing)
                            ctx.stroke();
                        }
                    }
                }
            })
        }

        /* Remove callback on unmount */
        return () => {
            if (worldContext) {
                const newCallbacks = Object.entries(worldContext.callbacks).filter(entry => {
                    if (entry[0] !== callbackName) return true
                })

                worldContext.setCallbacks(
                    newCallbacks.reduce((callbacks, entry) => ({
                        ...callbacks, [entry[0]]: entry[1]
                    }), {})
                )
            }
        }
    }, [rocketRef.current])

    return (<></>)
}