import { EventChannel } from "../../EventChannel"
import { ClientActionKey, ClientActionData, GameEventData, GameEventKey } from "../../EventChannel/types"
import api from "../../service/api"
import { generateId } from "../../utils/generateId"

// client-side game instance
export class GameClient {
    playerId = generateId()
    gameId: string | null = null
    eventChannel: EventChannel | null = null

    constructor() {

    }

    createGame() {
        const game = api.createGame()
        this.gameId = game
    }

    connectToGame(gameId: string) {
        this.eventChannel = api.connectToGame(gameId, this.playerId)
        this.eventChannel.on('game-updated', (event) => {
            this.handleUpdate(event.key, event.data)
        })
    }

    sendAction<T extends ClientActionKey>(action: T, data: ClientActionData[T]) {
        if (!this.eventChannel) {
            throw new Error('Event channel not connected')
        }
        this.eventChannel.emit(action, data)
    }

    handleUpdate<T extends GameEventKey>(event: T, data: GameEventData[T]) {
        console.log('handleUpdate', event, data)
    }
}
