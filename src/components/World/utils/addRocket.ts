import { WorldTypes } from '@/src/types/WorldTypes'
import M from 'matter-js'

export default function addRocket({ engineRef, rocketRef }: {
    engineRef: WorldTypes['engineRef'],
    rocketRef: WorldTypes['rocketRef'],
}) {
    if (!rocketRef.current && engineRef.current) {
        rocketRef.current = M.Bodies.rectangle(
            window.innerWidth / 2, window.innerHeight / 2, 50, 100
        )
        M.Composite.add(engineRef.current.world, [rocketRef.current])
    } else {
        console.error('Could not initialize the Rocket');
    }
}

// THRUST
/*
setTimeout(() => {
    setInterval(() => {
        const xf = -0.009*Math.cos(boxB.angle+(Math.PI/2))
        const yf = -0.009*Math.sin(boxB.angle+(Math.PI/2))
        M.Body.applyForce(
            boxB,
            { x: boxB.position.x+10, y: boxB.position.y - 50 },
            { x: xf, y: yf },
        )
    }, 50)
}, 2000)
*/