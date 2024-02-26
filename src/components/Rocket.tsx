import React, { useEffect, useContext, useRef, useState } from "react"
import { WorldContext } from "@/src/context/WorldContextProvider"
import M from 'matter-js'
import DrawNozzle from "./callbacks/DrawNozzle"
import useSub from "@/src/bus/useSub"
import messageTypes from "@/src/bus/messageTypes"

export default function Rocket({ children }: { children?: React.ReactNode }) {
    const [rerender, setRerender] = useState(Date.now())
    const worldContext = useContext(WorldContext)
    const rocketRef = useRef<M.Body | null>()

    const subWorldSetup = useSub({
        messageType: messageTypes['WORLD_SETUP_FINISHED'],
        fn: () => {
            /* Add rocket object to the world */
            if (!rocketRef.current && worldContext?.engineRef.current) {
                rocketRef.current = M.Bodies.rectangle(
                    window.innerWidth/2, window.innerHeight/2, 50, 100
                )
                M.Composite.add(worldContext.engineRef.current.world, [rocketRef.current])
                worldContext.setFocusObj(rocketRef.current)

                /* Rerender */
                setRerender(Date.now())
            } else {
                console.error('Could not initialize the Rocket');
            }
        }
    })

    /* Remove sub on unmount */
    useEffect(() => {
        return subWorldSetup.unsub
    }, [])

    return (
        <>
            {rocketRef.current ? (
                <>
                    {/* <DrawNozzle rocketRef={rocketRef} /> */}
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