import React, { MutableRefObject, LegacyRef } from 'react'
import M from 'matter-js'

export interface WorldTypes {
    physicsCanvasRef: LegacyRef<HTMLCanvasElement | undefined>
    renderCanvasRef: LegacyRef<HTMLCanvasElement>
    engineRef: MutableRefObject<M.Engine | undefined>
    rocketRef: MutableRefObject<M.Body | undefined>
    renderRef: MutableRefObject<M.Render | undefined>
    runnerRef: MutableRefObject<M.Runner | undefined>
    focusObj: M.Body | null
    setFocusObj: React.Dispatch<React.SetStateAction<M.Body | null>>
    tickerInterval: MutableRefObject<NodeJS.Timeout | undefined>
}
