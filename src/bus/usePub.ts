import { useEffect, useContext, useState } from 'react'
import { messageTypesI } from './messageTypes'
import { BusContext } from './BusContextProvider'

export interface usePubI {
    id: string
    messageType: messageTypesI
    unpub: () => void
    publish: (...props: Array<unknown>) => void
}

export default function usePub({ messageType }: { messageType: messageTypesI }): usePubI {
    const busContext = useContext(BusContext)

    const [id] = useState(`${messageType}_${Date.now()}_${crypto.randomUUID()} `)

    useEffect(() => {
        // eslint-disable-next-line no-console
        // console.debug(`usePub registered: ${messageType}`)
        busContext?.addPub({ id, messageType })
    }, [])

    function unpub() {
        busContext?.delPub(messageType, id)
    }

    function publish(...props: Array<unknown>) {
        if (busContext) {
            // eslint-disable-next-line no-console
            // console.debug(
            //     `usePub triggered: ${messageType}, props: ${props}, sub count: ${Object.keys(busContext.subs).length}`,
            // )

            Object.entries(busContext.subs[messageType]).forEach((entry) => {
                try {
                    entry[1].fn(...props)
                } catch (e) {
                    // eslint-disable-next-line no-console
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
