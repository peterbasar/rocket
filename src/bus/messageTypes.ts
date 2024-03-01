const messageTypes: { [id: string]: string } = {
    WORLD_SETUP_FINISHED: 'WORLD_SETUP_FINISHED',
    ROCKET_ADDED: 'ROCKET_ADDED',
    PHYSICS_TICK: 'PHYSICS_TICK',
}

export type messageTypesI = keyof typeof messageTypes

export default messageTypes
