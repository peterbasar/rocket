import { useEffect, useContext, useState } from 'react'
import { messageTypesI } from './messageTypes'
import { BusContext } from './BusContextProvider'

interface useSubI {
    id: string
    messageType: messageTypesI
    unsub: () => void
}

export default function useSub({
    messageType,
    fn,
}: {
    messageType: messageTypesI
    fn: (...props: any) => void
}): useSubI {
    const busContext = useContext(BusContext)
    const [id] = useState(`${messageType}_${Date.now()}_${crypto.randomUUID()} `)

    useEffect(() => {
        // console.debug(`useSub registered: ${messageType}`)
        busContext?.addSub({
            id,
            messageType,
            fn: (...props: any) => {
                // console.debug(`useSub triggered: ${messageType}, props: ${props}`)
                return fn(...props)
            },
        })
    }, [])

    function unsub() {
        busContext?.delSub(messageType, id)
    }

    return {
        id,
        messageType,
        unsub,
    }
}
