import { GameCard } from "../domain/cards"

export const ClientAction = {
    Ready: 'Ready',
    PlayCard: 'PlayCard',
} as const

export type ClientActionKey = typeof ClientAction[keyof typeof ClientAction]

export type ClientActionData = {
    [ClientAction.PlayCard]: {
        cardId: string
        payload: any // TODO: define payload type
    }
    [ClientAction.Ready]: undefined
}

export const GameEvent = {
    QueueCreated: 'QueueCreated',
    CardsAdded: 'CardsAdded',
    CardsRemoved: 'CardsRemoved',
} as const

export type GameEventKey = typeof GameEvent[keyof typeof GameEvent]

export type GameEventData = {
    [GameEvent.QueueCreated]: {
        playerId: string
        cards: GameCard[]
    }
    [GameEvent.CardsAdded]: {
        cards: GameCard[]
    }
    [GameEvent.CardsRemoved]: {
        ids: string[]
    }
}
