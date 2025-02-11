import { GameCardTemplate } from "../../domain/cards"

const CardLightningId = 'lightning' as const
const CardFireballId = 'fireball' as const
const CardHealingPotionId = 'healing_potion' as const
const CardShieldBashId = 'shield_bash' as const

const CardTemplateLightning: GameCardTemplate = {
    id: CardLightningId,
    name: 'Lightning',
    description: 'Thunderbolt strikes the enemy, dealing damage and stunning them for 1 turn.',
    execute: () => {
        console.log('lightning execute')
    }
}

const CardTemplateFireball: GameCardTemplate = {
    id: CardFireballId,
    name: 'Fireball',
    description: 'Launches a ball of fire that explodes on impact, dealing area damage to all nearby enemies.',
    execute: () => {
        console.log('fireball execute')
    }
}

const CardTemplateHealingPotion: GameCardTemplate = {
    id: CardHealingPotionId,
    name: 'Healing Potion',
    description: 'Restores health points and removes minor negative effects.',
    execute: () => {
        console.log('healing potion execute')
    }
}

const CardTemplateShieldBash: GameCardTemplate = {
    id: CardShieldBashId,
    name: 'Shield Bash',
    description: 'Slam your shield into the enemy, dealing damage and pushing them back.',
    execute: () => {
        console.log('shield bash execute')
    }
}

export const CardTemplates = [
    CardTemplateLightning,
    CardTemplateFireball,
    CardTemplateHealingPotion,
    CardTemplateShieldBash
]

export const CardsTemplatesMap = {
    [CardTemplateLightning.id]: CardTemplateLightning,
    [CardTemplateFireball.id]: CardTemplateFireball,
    [CardTemplateHealingPotion.id]: CardTemplateHealingPotion,
    [CardTemplateShieldBash.id]: CardTemplateShieldBash,
} 