import M from 'matter-js'
import { useEffect, useRef } from 'react'

export default function BasicWorld() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const engineRef = useRef<M.Engine | null>(null)
    const renderRef = useRef<M.Render | null>(null)
    const runnerRef = useRef<M.Runner | null>(null)
    const isInitialised = useRef(false)
    const applyForce = useRef<(() => void) | null>(null)

    useEffect(() => {
        if (canvasRef.current && isInitialised.current === false) {
            engineRef.current = M.Engine.create()
            renderRef.current = M.Render.create({
                element: document.body,
                engine: engineRef.current,
                canvas: canvasRef.current,
                options: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                }
            })
            runnerRef.current = M.Runner.create()

            isInitialised.current = true

            // create two boxes and a ground
            var boxA = M.Bodies.rectangle(window.innerWidth/2, window.innerHeight/2, 5, 5, {
                isStatic: true,
                isSensor: true,
            });
            var boxB = M.Bodies.rectangle(window.innerWidth/2, window.innerHeight/2, 50, 100)
            var ground = M.Bodies.rectangle(window.innerWidth/2, window.innerHeight-window.innerHeight/8, 400, 80, { isStatic: true })

            // add all of the bodies to the world
            // M.Composite.add(engineRef.current, [boxA, boxB, ground]);
            M.Composite.add(engineRef.current.world, [boxA, boxB, ground])

            // run the renderer
            M.Render.run(renderRef.current)

            // Focus on box
            M.Render.lookAt(renderRef.current, boxB, {
                x: window.innerHeight,
                y: window.innerWidth,
            });

            // run the engine
            // Runner.run(runner, engine);

            applyForce.current = () => {
                M.Body.applyForce(
                    boxB,
                    { x: boxB.position.x, y: boxB.position.y + 50 },
                    { x: 0.01, y: -0.2 },
                )
            }

            setInterval(() => {
                console.log('tick')
                if (engineRef.current && runnerRef.current) {
                    M.Runner.tick(runnerRef.current, engineRef.current, 1)
                }
            }, 10)

            setTimeout(() => {
                setInterval(() => {
                    console.log('boxB.angle:', boxB.angle)
                    const xf = 0.009*Math.sin(boxB.angle)
                    const yf = -0.009*Math.cos(boxB.angle)
                    console.log(`xf: ${xf}, yf: ${yf}`)
                    M.Body.applyForce(
                        boxB,
                        { x: boxB.position.x+0.01, y: boxB.angle + 50 },
                        { x: xf, y: yf },
                    )
                }, 10)
            }, 2000)

            // canvasRef.current.getContext("2d")?.scale(0.6, 0.6)
        }
    }, [])

    return (
        <div
            onClick={() => {
                if (applyForce.current) applyForce.current()
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    backgroundColor: 'white',
                }}
            />
        </div>
    )
}
