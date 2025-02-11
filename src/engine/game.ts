import { TEMPLE_INITIAL_HP } from "../domain/constants"
import { Card, GameState } from "../domain/types"

const generateCards = (count: number) => {
    const cards: Card[] = []
    for (let i = 0; i < count; i++) {
        cards.push({

            id: i.toString(),
            name: `Card ${i}`,
            description: `Description ${i}`,
        })
    }
    return cards
}


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
