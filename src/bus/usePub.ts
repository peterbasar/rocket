import { useEffect, useContext, useState } from 'react'
import { messageTypesI } from './messageTypes'
import { BusContext } from './BusContextProvider'

interface usePubI {
    id: string
    messageType: messageTypesI
    unpub: () => void
    publish: (...props: any) => void
}

export default function usePub({ messageType }: { messageType: messageTypesI }): usePubI {
    const busContext = useContext(BusContext)

    const [id] = useState(`${messageType}_${Date.now()}_${crypto.randomUUID()} `)

    useEffect(() => {
        console.debug(`usePub registered: ${messageType}`)
        busContext?.addPub({ id, messageType })
    }, [])

    function unpub() {
        busContext?.delPub(messageType, id)
    }

    function publish(...props: any) {
        if (busContext) {
            console.debug(
                `usePub triggered: ${messageType}, props: ${props}, sub count: ${Object.keys(busContext.subs).length}`,
            )

            Object.entries(busContext.subs[messageType]).forEach((entry) => {
                try {
                    entry[1].fn(...props)
                } catch (e) {
                    console.error(e)
                }
            })
            return
        }
    }

    return {
        id,
        messageType,
        unpub,
        publish,
    }
}
