'use client'
import { useEffect, useRef } from 'react'
import { WorldTypes } from '@/src/types/WorldTypes'
import { clearTicker } from '../World/utils'
import useSub from '@/src/bus/useSub'
import Img from './image.png'
import messageTypes from '@/src/bus/messageTypes'

export default function Render() {
    const renderCanvasRef: WorldTypes['renderCanvasRef'] = useRef(null)
    const tickerInterval: WorldTypes['tickerInterval'] = useRef()
    const rocketRef: WorldTypes['rocketRef'] = useRef()

    useSub({
        messageType: messageTypes['PHYSICS_TICK'],
        // @ts-expect-error Dynamic arguments
        fn: ({
            data,
        }: {
            data: {
                rocketRef: WorldTypes['rocketRef']
            }
        }) => {
            if (data.rocketRef && data.rocketRef.current) {
                rocketRef.current = data.rocketRef.current
            }
        },
    })

    useEffect(() => {
        const imageObj1 = new Image()
        imageObj1.src = Img.src

        clearTicker(tickerInterval)
        tickerInterval.current = setInterval(() => {
            if (renderCanvasRef && renderCanvasRef.current) {
                const ctx = renderCanvasRef.current.getContext('2d')

                if (imageObj1.complete) {
                    if (ctx && rocketRef && rocketRef.current) {
                        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

                        const x = window.innerWidth / 2
                        const y = window.innerHeight / 2 + 25

                        ctx.translate(x, y)
                        ctx.rotate(rocketRef.current.angle)
                        ctx.drawImage(imageObj1, -25, -25, 50, 50)
                        ctx.rotate(-rocketRef.current.angle)
                        ctx.translate(-x, -y)
                    }
                }
            }
        }, 25)
    }, [])

    return (
        <canvas
            ref={renderCanvasRef}
            className="absolute w-[100vw] h-[100vh] top-0"
            width={window.innerWidth}
            height={window.innerHeight}
        />
    )
}
