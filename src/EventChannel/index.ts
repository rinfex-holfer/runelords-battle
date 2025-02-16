import { EventEmitter } from "eventemitter3";
import { ClientActionData, ClientActionKey, GameEventData, GameEventKey } from "./types";

const EventChannelEvents = {
    PlayerAction: 'player-action',
    GameEvent: 'game-event',
}

// TODO: adapter between client and server
// it will be proper WS connection, but for now it is just async event bus
export class EventChannel {
    emitter = new EventEmitter()
    // server-side
    sendGameEvent<T extends GameEventKey>(event: {
        key: T
        payload: GameEventData[T]
    }) {
        this.emitter.emit(EventChannelEvents.GameEvent, event)
    }

    onPlayerAction<T extends ClientActionKey>(callback: (payload: {
        key: T
        payload: ClientActionData[T]
    }) => void) {
        this.emitter.on(EventChannelEvents.PlayerAction, callback)
    }

    unsubscribeFromPlayerAction<T extends ClientActionKey>(callback: (payload: {
        key: T
        payload: ClientActionData[T]
    }) => void) {
        this.emitter.off(EventChannelEvents.PlayerAction, callback)
    }

    // client-side
    sendPlayerAction<T extends ClientActionKey>(event: {
        key: T
        payload: ClientActionData[T]
    }) {
        this.emitter.emit(EventChannelEvents.PlayerAction, event)
    }

    onGameEvent<T extends GameEventKey>(callback: (payload: {
        key: T
        payload: GameEventData[T]
    }) => void) {
        this.emitter.on(EventChannelEvents.GameEvent, callback)
    }

    unsubscribeFromGameEvent<T extends GameEventKey>(callback: (payload: {
        key: T
        payload: GameEventData[T]
    }) => void) {
        this.emitter.off(EventChannelEvents.GameEvent, callback)
    }
}
