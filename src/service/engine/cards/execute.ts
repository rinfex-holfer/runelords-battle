import { CardTemplateId, CardTemplateIdMap, CardExecuteFn } from "../../../domain/cards"

const CardTemplateLightningExecute: CardExecuteFn = () => {
    console.log('lightning execute')
    return {}
}

const CardTemplateFireballExecute: CardExecuteFn = () => {
    console.log('fireball execute')
    return {}
}

const CardTemplateHealingPotionExecute: CardExecuteFn = () => {
    console.log('healing potion execute')
    return {}
}

const CardTemplateShieldBashExecute: CardExecuteFn = () => {
    console.log('shield bash execute')
    return {}
}

export const CardExecuteFunctions: Record<CardTemplateId, CardExecuteFn> = {
    [CardTemplateIdMap.Lightning]: CardTemplateLightningExecute,
    [CardTemplateIdMap.Fireball]: CardTemplateFireballExecute,
    [CardTemplateIdMap.HealingPotion]: CardTemplateHealingPotionExecute,
    [CardTemplateIdMap.ShieldBash]: CardTemplateShieldBashExecute,
}

export const getCardExecuteFunctionById = (id: CardTemplateId): CardExecuteFn => {
    const executeFn = CardExecuteFunctions[id]
    return executeFn
}
