import React, { MutableRefObject, RefObject } from 'react'
import { CANVAS_TYPES } from '../const'
import M from 'matter-js'

export interface WorldTypes {
    physicsCanvasRef: RefObject<HTMLCanvasElement>
    renderCanvasRef: RefObject<HTMLCanvasElement>
    engineRef: MutableRefObject<M.Engine | undefined>
    rocketRef: MutableRefObject<M.Body | undefined>
    renderRef: MutableRefObject<M.Render | undefined>
    runnerRef: MutableRefObject<M.Runner | undefined>
    focusObj: M.Body | null
    setFocusObj: React.Dispatch<React.SetStateAction<M.Body | null>>
    tickerInterval: MutableRefObject<NodeJS.Timeout | undefined>
    activeCanvas: CANVAS_TYPES
    setActiveCanvas: React.Dispatch<React.SetStateAction<CANVAS_TYPES>>
}
