import { GameCard } from './cards'

export type GamePhase = 'Player1Turn' | 'Player2Turn' | 'GameOver' | 'Pause'

export type BodyPart = 'arm' | 'leg' | 'chest' | 'head'

export type Armor = {
    bodyPart: BodyPart
    protection: number
}

export type Weapon = {}
export type Shield = {}

export type CharState = {
    playerId: string
    limbs: {
        bodyPart: BodyPart
        armor: Armor | null
        canWield: boolean
        wields: string

    }[]
    wields: (Weapon | Shield)[]
    speed: number
    coord: {
        x: number
        y: number
    }
}

export type HeroState = CharState & {
    type: 'hero'
}

export type CreepState = CharState & {
    type: 'creep'
}

export type GameState = {
    phase: GamePhase
    temples: { hp: number, playerId: string }[]
    cardsQueues: { cards: GameCard[], playerId: string }[]
    heroes: HeroState[]
    creeps: CreepState[]
}

