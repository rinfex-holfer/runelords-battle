import { EventChannel } from "../../EventChannel"
import { ClientActionKey, ClientActionData, GameEventData, GameEventKey, ClientAction, GameEvent } from "../../EventChannel/types"
import api from "../../service/api"
import { generateId } from "../../utils/generateId"
import { EventEmitter } from "eventemitter3"
// client-side game instance
export class GameClient {
    playerId = generateId()
    gameId: string | null = null

    eventChannel: EventChannel | null = null

    // emitter, on which React components could subscribe to game events
    eventEmitter = new EventEmitter<GameEventKey, GameEventData[GameEventKey]>()

    constructor() {

    }

    createGame(autoConnect = false) {
        const game = api.createNewGame()
        this.gameId = game
        if (autoConnect) {
            this.connectToGame(game)
        }
    }

    connectToGame(gameId: string) {
        this.gameId = gameId
        this.eventChannel = api.connectToGame(gameId, this.playerId)
        this.eventChannel.onGameEvent(event => {
            console.log('onGameEvent', event)
            this.eventEmitter.emit(event.key, event.payload)
        })
    }

    // TODO data could be undefined - then it is not required as parameter
    sendAction<T extends ClientActionKey>(action: T, data: ClientActionData[T]) {
        if (!this.eventChannel) {
            throw new Error('Event channel not connected')
        }
        this.eventChannel.sendPlayerAction({
            key: action,
            payload: data
        })
    }

    onGameEvent<T extends GameEventKey>(key: T, callback: (data: GameEventData[T]) => void) {
        this.eventEmitter.on(key, callback)
    }

    unsubscribeFromGameEvent<T extends GameEventKey>(key: T, callback: (data: GameEventData[T]) => void) {
        this.eventEmitter.off(key, callback)
    }
}
