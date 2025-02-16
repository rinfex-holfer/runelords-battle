import { GameState } from "./types"

export const CardTemplateIdMap = {
    Lightning: 'Lightning',
    Fireball: 'Fireball',
    HealingPotion: 'HealingPotion',
    ShieldBash: 'ShieldBash'
} as const

export type CardTemplateId = typeof CardTemplateIdMap[keyof typeof CardTemplateIdMap]

export type CardTemplate = {
    readonly id: CardTemplateId
    readonly name: string
    readonly description: string
}

export type CardExecuteFn = (gameState: GameState) => Partial<GameState>

export type GameCard = {
    readonly id: string
    readonly templateId: CardTemplateId
    row: number
    col: number
}

// Card template definitions
const CardTemplateLightning: CardTemplate = {
    id: CardTemplateIdMap.Lightning,
    name: 'Lightning',
    description: 'Thunderbolt strikes the enemy, dealing damage and stunning them for 1 turn.',
}

const CardTemplateFireball: CardTemplate = {
    id: CardTemplateIdMap.Fireball,
    name: 'Fireball',
    description: 'Launches a ball of fire that explodes on impact, dealing area damage to all nearby enemies.',
}

const CardTemplateHealingPotion: CardTemplate = {
    id: CardTemplateIdMap.HealingPotion,
    name: 'Healing Potion',
    description: 'Restores health points and removes minor negative effects.',
}

const CardTemplateShieldBash: CardTemplate = {
    id: CardTemplateIdMap.ShieldBash,
    name: 'Shield Bash',
    description: 'Slam your shield into the enemy, dealing damage and pushing them back.',
}

export const CardsTemplatesMap = {
    [CardTemplateIdMap.Lightning]: CardTemplateLightning,
    [CardTemplateIdMap.Fireball]: CardTemplateFireball,
    [CardTemplateIdMap.HealingPotion]: CardTemplateHealingPotion,
    [CardTemplateIdMap.ShieldBash]: CardTemplateShieldBash,
}

export const getCardTemplateById = (id: CardTemplateId) => CardsTemplatesMap[id] 