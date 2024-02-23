import { useEffect, useContext } from "react"
import { WorldContext } from "@/src/context/WorldContextProvider"
import M from 'matter-js'

export default function FollowPlayer() {
    const callbackName = 'FollowPlayer'
    const worldContext = useContext(WorldContext)

    useEffect(() => {
        /* Set callback if not already set */
        if (worldContext && worldContext.focusObj && !(callbackName in worldContext?.callbacks)) {
            worldContext.setCallbacks({
                ...worldContext.callbacks,
                [callbackName]: () => {
                    if (worldContext.engineRef.current && worldContext.runnerRef.current) {
                        M.Render.lookAt(worldContext.renderRef.current as M.Render, worldContext.focusObj as M.Body, {
                            x: window.innerHeight/2,
                            y: window.innerWidth/2,
                        });
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
    }, [worldContext?.focusObj])

    return (<></>)
}