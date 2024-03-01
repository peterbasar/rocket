import { CANVAS_TYPES } from '../app/page'
import { WorldTypes } from '../types/WorldTypes'
import messageTypes from '../bus/messageTypes'
import useSub from '../bus/useSub'
import { useRef, useState } from 'react'

export default function Controls({
    activeCanvas,
    setActiveCanvas,
}: {
    activeCanvas: WorldTypes['activeCanvas'],
    setActiveCanvas: WorldTypes['setActiveCanvas'],
}) {
    const rocketRef: WorldTypes['rocketRef'] = useRef()
    const [speed, setSpeed] = useState(0)

    useSub({
        messageType: messageTypes['PHYSICS_TICK'],
        fn: (props) => {
            if (props && props.data.rocketRef && props.data.rocketRef.current) {
                rocketRef.current = props.data.rocketRef.current
                if (rocketRef.current) {
                    setSpeed(rocketRef.current?.speed)
                }
            }
        },
    })

    return (
        <div className="absolute top-0 w-[100vw] items-center justify-center flex flex-row gap-4 p-4">
            <div
                onClick={() => {
                    setActiveCanvas(CANVAS_TYPES['PHYSICS'])
                }}
                className={
                    `cursor-pointer text-white border px-4 py-2 ` +
                    (activeCanvas === CANVAS_TYPES.PHYSICS ? 'bg-red-400' : '')
                }
            >
                Physics
            </div>
            <div
                onClick={() => {
                    setActiveCanvas(CANVAS_TYPES.RENDER)
                }}
                className={
                    `cursor-pointer text-white border px-4 py-2 ` +
                    (activeCanvas === CANVAS_TYPES.RENDER ? 'bg-red-400' : '')
                }
            >
                Render
            </div>
            <div className='absolute left-0 text-white top-24'>
                Speed: {Math.round(speed * 100) / 100}
            </div>
        </div>
    )
}