const messageTypes: { [id: string]: string } = {
    WORLD_SETUP_FINISHED: 'WORLD_SETUP_FINISHED',
    ROCKET_ADDED: 'ROCKET_ADDED',
}

export type messageTypesI = keyof typeof messageTypes

export default messageTypes
