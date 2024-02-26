import React, { useState } from 'react'
import M from 'matter-js'
import { useEffect, useRef } from 'react'
import WorldContextProvider from '@/src/context/WorldContextProvider'
import WorldCallbacksType from '@/src/types/WorldCallbacksType'
import usePub from '@/src/bus/usePub'
import messageTypes from '../bus/messageTypes'

export default function World({ children }: { children?: React.ReactNode }) {
    const [rerender, setRerender] = useState(Date.now())
    const physicsCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const renderCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const engineRef = useRef<M.Engine | null>()
    const renderRef = useRef<M.Render | null>()
    const runnerRef = useRef<M.Runner | null>()
    const [focusObj, setFocusObj] = useState<M.Body | null>(null)
    const isInitialised = useRef(false)
    const pubSetupFinished = usePub({
        messageType: messageTypes['WORLD_SETUP_FINISHED']
    })

    const [callbacks, setCallbacks] = useState<WorldCallbacksType>({})
    const [updateTime, setUpdateTime] = useState(50)
    const [tick, setTick] = useState(1)
    const tickerInterval = useRef<NodeJS.Timeout | null>(null)

    /* Ticker setup */
    useEffect(() => {
        if (engineRef.current && runnerRef.current) {
            /* Clear existing ticker */
            if (tickerInterval.current) {
                clearInterval(tickerInterval.current)
                tickerInterval.current = null
            }

            /* Set world ticker */
            tickerInterval.current = setInterval(() => {
                /* Call all callbacks */
                Object.values(callbacks).forEach((callback) => callback())

                /* Move engine by a 'tick' amounts */
                if (engineRef.current && runnerRef.current) {
                    M.Runner.tick(runnerRef.current, engineRef.current, tick)
                }
            }, updateTime)
        }
    }, [tick, updateTime, callbacks])


    /* World setup */
    useEffect(() => {
        if (physicsCanvasRef.current && isInitialised.current === false) {
            engineRef.current = M.Engine.create()
            renderRef.current = M.Render.create({
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
                }
            })
            runnerRef.current = M.Runner.create()

            isInitialised.current = true

            // create two boxes and a ground
            var boxA = M.Bodies.rectangle(window.innerWidth/2, window.innerHeight/2, 5, 5, {
                isStatic: true,
                isSensor: true,
            });
            // var boxB = M.Bodies.rectangle(window.innerWidth/2, window.innerHeight/2, 50, 100)
            // setFocusObj(boxB)
            var ground = M.Bodies.rectangle(window.innerWidth/2, window.innerHeight-window.innerHeight/8, 400, 80, { isStatic: true })

            // add all of the bodies to the world
            // M.Composite.add(engineRef.current, [boxA, boxB, ground]);
            M.Composite.add(engineRef.current.world, [boxA, ground])

            // run the renderer
            M.Render.run(renderRef.current)

            // Inform bus that world setup finished
            setRerender(Date.now())
            setTimeout(() => pubSetupFinished.publish(), 1000)
        }
    }, [physicsCanvasRef.current])

    return (
        <div>
            <canvas id='physics-canvas' ref={physicsCanvasRef} />
            {/* <canvas id='color-canvas' ref={renderCanvasRef}
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    left: 0,
                    top: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    backgroundColor: 'rgba(50,50,50,0.5)'
                }}
            /> */}
            {
                (physicsCanvasRef.current && engineRef.current && renderRef.current && runnerRef.current) ? (
                    <WorldContextProvider
                        physicsCanvasRef={physicsCanvasRef as React.RefObject<HTMLCanvasElement>}
                        renderCanvasRef={renderCanvasRef as React.RefObject<HTMLCanvasElement>}
                        engineRef={engineRef as React.RefObject<M.Engine>}
                        renderRef={renderRef as React.RefObject<M.Render>}
                        runnerRef={runnerRef as React.RefObject<M.Runner>}
                        focusObj={focusObj}
                        setFocusObj={setFocusObj}
                        callbacks={callbacks}
                        setCallbacks={setCallbacks}
                    >
                        {children}
                    </WorldContextProvider>
                ) : (
                    <h1>
                        Could not initialize the world
                    </h1>
                )
            }
        </div>
    )
}
