import React, { useEffect, useContext, useRef } from "react"
import { WorldContext } from "@/src/context/WorldContextProvider"
import M from 'matter-js'
import DrawNozzle from "./callbacks/DrawNozzle"

export default function Rocket({ children }: { children?: React.ReactNode }) {
    const worldContext = useContext(WorldContext)
    const rocketRef = useRef<M.Body | undefined>()

    /* Add rocket object to the world */
    useEffect(() => {
        if (!rocketRef.current && worldContext?.engineRef.current && worldContext?.isSetup) {
            rocketRef.current = M.Bodies.rectangle(window.innerWidth/2, window.innerHeight/2, 50, 100)
            M.Composite.add(worldContext.engineRef.current.world, [rocketRef.current])
            worldContext.setFocusObj(rocketRef.current)
        }
    }, [worldContext?.isSetup])

    return (
        <>
            {worldContext?.isSetup ? (
                <>
                    <DrawNozzle rocketRef={rocketRef} />
                    {children}
                </>
            ) : <></>}
        </>
    )
}

/*
setTimeout(() => {
                setInterval(() => {
                    const xf = -0.009*Math.cos(boxB.angle+(Math.PI/2))
                    const yf = -0.009*Math.sin(boxB.angle+(Math.PI/2))
                    M.Body.applyForce(
                        boxB,
                        { x: boxB.position.x+10, y: boxB.position.y - 50 },
                        { x: xf, y: yf },
                    )
                }, 50)
            }, 2000)
*/