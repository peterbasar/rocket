import React, { createContext, useRef } from "react"
import messageTypes, { messageTypesI } from "./messageTypes"

interface IPub {
    id: string,
    messageType: messageTypesI,
}

type IPubs = { [key in messageTypesI]: {
    [id: string]: IPub,
}}

interface ISub {
    id: string,
    messageType: messageTypesI,
    fn: (...props: any) => void,
}

type ISubs = { [key in messageTypesI]: {
    [id: string]: ISub,
}}

interface IBusContext {
    subs: ISubs,
    addSub: (sub: ISub) => void,
    delSub: (messageType: messageTypesI, id: string) => void,
    pubs: IPubs,
    addPub: (pub: IPub) => void,
    delPub: (messageType: messageTypesI, id: string) => void,
}

export const BusContext = createContext<IBusContext | undefined>(undefined)

export default function BusContextProvider({ children }: { children: React.ReactNode }
) {
    const subs = useRef<ISubs>(getEmptySubs())
    const pubs = useRef<IPubs>(getEmptyPubs())

    function addSub(sub: ISub) {
        subs.current[sub.messageType][sub.id] = sub
    }
    function delSub(messageType: messageTypesI, id: string) {
        delete subs.current[messageType][id]
    }

    function addPub(pub: IPub) {
        pubs.current[pub.messageType][pub.id] = pub
    }
    function delPub(messageType: messageTypesI, id: string) {
        delete pubs.current[messageType][id]
    }

    return (
        <BusContext.Provider value={{
            subs: subs.current,
            addSub,
            delSub,
            pubs: pubs.current,
            addPub,
            delPub,
        }}>
            {children}
        </BusContext.Provider>
    )
}

function getEmptySubs() {
        let subs = {}
        Object.entries(messageTypes).forEach(entry => {
            Object.defineProperty(subs, entry[0], {
                value: {},
                writable: true,
            });
        })
        return subs as ISubs
    }

function getEmptyPubs() {
    let pubs = {}
    Object.entries(messageTypes).forEach(entry => {
        Object.defineProperty(pubs, entry[0], {
            value: {},
            writable: true,
        });
    })
    return pubs as IPubs
}