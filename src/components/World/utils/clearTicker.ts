import { WorldTypes } from '@/src/types/WorldTypes'

export default function clearTicker(tickerInterval: WorldTypes['tickerInterval']) {
    if (tickerInterval.current) {
        clearInterval(tickerInterval.current)
        tickerInterval.current = undefined
    }
}
