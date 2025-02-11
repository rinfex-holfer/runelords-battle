import { TEMPLE_INITIAL_HP } from "../domain/constants"
import { GameState } from "../domain/types"
import { generateCards } from "./cards/cards"


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
