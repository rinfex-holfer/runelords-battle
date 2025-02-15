import { GameCard } from "../domain/cards"
import { TEMPLE_INITIAL_HP } from "../domain/constants"
import { GameState } from "../domain/types"
import { generateCards } from "./cards/cards"
import { CardsQueue } from "./cards/СardsQueue"

// TODO this is serialized, so it won't be in enginer - only on client side
const createGame = () => {
    const gameState: GameState = {
        phase: 'Player1Turn',
        cardsQueue1: generateCards(10),
        cardsQueue2: generateCards(10),
        hero1: {
            type: 'hero',
            limbs: [],
            wields: [],
            speed: 0,
            coord: { x: 0, y: 0 },
        },
        hero2: {
            type: 'hero',
            limbs: [],
            wields: [],
            speed: 0,
            coord: { x: 0, y: 0 },
        },
        creeps1: [],
        creeps2: [],
        temple1Hp: TEMPLE_INITIAL_HP,
        temple2Hp: TEMPLE_INITIAL_HP,
    }

    return gameState
}

const GameEventKeys = {
    CardsAdded: 'CardsAdded',
    CardsRemoved: 'CardsRemoved',
} as const

type GameEventKey = typeof GameEventKeys[keyof typeof GameEventKeys]

type GameEventData = {
    [GameEventKeys.CardsAdded]: {
        cards: GameCard[]
    }
    [GameEventKeys.CardsRemoved]: {
        ids: string[]
    }
}

type GameEvent = {
    key: GameEventKey,
    data: GameEventData[GameEventKey]
}

export class Game {
    private events: GameEvent[] = []
    private cardsQueue1: CardsQueue
    private cardsQueue2: CardsQueue

    constructor() {
        this.cardsQueue1 = new CardsQueue()
        this.cardsQueue2 = new CardsQueue()
    }
}