import { ROWS_COUNT } from "../../../domain/constants"
import { VISIBLE_CARDS_IN_ROW } from "../../../domain/constants"
import { GameCard } from "../../../domain/cards"
import { CardTemplates } from "./cardTemplates"

export const generateCards = (count: number): GameCard[] => {
    const cards: GameCard[] = []

    for (let i = 0; i < count; i++) {
        const randomTemplate = CardTemplates[Math.floor(Math.random() * CardTemplates.length)]
        const row = Math.floor(i / VISIBLE_CARDS_IN_ROW) % ROWS_COUNT
        const col = i % VISIBLE_CARDS_IN_ROW

        cards.push({
            id: `card_${i}`,
            templateId: randomTemplate.id,
            row,
            col
        })
    }
    return cards
}
