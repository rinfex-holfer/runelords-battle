import { GameCard } from "../domain/cards"

export const ClientAction = {
    PlayCard: 'PlayCard',
} as const

export type ClientActionKey = typeof ClientAction[keyof typeof ClientAction]

export type ClientActionData = {
    [ClientAction.PlayCard]: {
        cardId: string
        payload: any // TODO: define payload type
    }
}

export const GameEvent = {
    CardsAdded: 'CardsAdded',
    CardsRemoved: 'CardsRemoved',
} as const

export type GameEventKey = typeof GameEvent[keyof typeof GameEvent]

export type GameEventData = {
    [GameEvent.CardsAdded]: {
        cards: GameCard[]
    }
    [GameEvent.CardsRemoved]: {
        ids: string[]
    }
}
