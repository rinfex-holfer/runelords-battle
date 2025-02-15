import { EventChannel } from "../../EventChannel"
import { TEMPLE_INITIAL_HP } from "../../domain/constants"
import { GameState } from "../../domain/types"
import { generateId } from "../../utils/generateId"
import { CardsQueue } from "./cards/СardsQueue"

export class Game {
    id = generateId()
    private cardsQueue1: CardsQueue
    private cardsQueue2: CardsQueue

    private playerConnections: Record<string, EventChannel> = {}

    constructor() {
        this.cardsQueue1 = new CardsQueue()
        this.cardsQueue2 = new CardsQueue()
    }

    addPlayer(playerId: string) {
        this.playerConnections[playerId] = new EventChannel()
        // TODO: connect player EventChannel to player entity in game state
    }

    connectPlayer(playerId: string) {
        return this.playerConnections[playerId]
    }

    getPlayerConnection(playerId: string) {
        return this.playerConnections[playerId]
    }

    getGameState(): GameState {
        return {
            phase: 'Player1Turn',
            cardsQueue1: this.cardsQueue1.getState(),
            cardsQueue2: this.cardsQueue2.getState(),
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
    }
}