import React, { createContext, RefObject } from "react"
import M from 'matter-js'
import WorldCallbacksType from "@/src/types/WorldCallbacksType"

interface WorldContextInterface {
    physicsCanvasRef: RefObject<HTMLCanvasElement>,
    renderCanvasRef: RefObject<HTMLCanvasElement>,
    engineRef: RefObject<M.Engine>,
    renderRef: RefObject<M.Render>,
    runnerRef: React.RefObject<M.Runner>,
    focusObj: M.Body | null,
    setFocusObj: React.Dispatch<React.SetStateAction<M.Body | null>>,
    callbacks: WorldCallbacksType,
    setCallbacks: React.Dispatch<React.SetStateAction<WorldCallbacksType>>,
}

export const WorldContext = createContext<WorldContextInterface | null>(null)

export default function WorldContextProvider({
    physicsCanvasRef,
    renderCanvasRef,
    engineRef,
    renderRef,
    runnerRef,
    focusObj,
    setFocusObj,
    callbacks,
    setCallbacks,
    children,
}: WorldContextInterface & { children: React.ReactNode }
) {
    return (
        <WorldContext.Provider value={{
            physicsCanvasRef,
            renderCanvasRef,
            engineRef,
            renderRef,
            runnerRef,
            focusObj,
            setFocusObj,
            callbacks,
            setCallbacks,
        }}>
            {children}
        </WorldContext.Provider>
    )
}