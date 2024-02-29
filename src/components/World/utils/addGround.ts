import M from 'matter-js'
import { WorldTypes } from '@/src/types/WorldTypes'

export default function addGround({ engineRef }: { engineRef: WorldTypes['engineRef'] }) {
    if (engineRef.current) {
        const ground = M.Bodies.rectangle(
            window.innerWidth / 2,
            window.innerHeight - window.innerHeight / 8,
            400,
            80,
            { isStatic: true },
        )
        M.Composite.add(engineRef.current.world, [ground])
    }
}
