import { GameCard } from "../../domain/cards"
import { VISIBLE_CARDS_IN_ROW } from "../../domain/constants"
import { ROWS_COUNT } from "../../domain/constants"
import { generateId } from "../../utils/generateId"
import { CardTemplates } from "./cardTemplates"

export class CardsQueue {
    private cards: GameCard[] = []

    constructor(cards: GameCard[] = []) {
        this.cards = cards
    }

    getCardsInRow(row: number): GameCard[] {
        return this.cards.filter(card => card.row === row)
    }

    generateCards(count: number): GameCard[] {
        const cards: GameCard[] = []

        for (let i = 0; i < count; i++) {
            const randomTemplate = CardTemplates[Math.floor(Math.random() * CardTemplates.length)]
            const row = Math.floor(i / VISIBLE_CARDS_IN_ROW) % ROWS_COUNT
            const col = i % VISIBLE_CARDS_IN_ROW

            cards.push({
                id: generateId(),
                templateId: randomTemplate.id,
                row,
                col
            })
        }
        return cards
    }

    createCard(templateId: string, row: number, col: number): GameCard {
        return {
            id: generateId(),
            templateId,
            row,
            col
        }
    }

    fillQueue(): void {
        const totalSlots = ROWS_COUNT * VISIBLE_CARDS_IN_ROW
        const currentCards = this.cards.length
        const neededCards = totalSlots - currentCards

        if (neededCards > 0) {
            const newCards = this.generateCards(neededCards)
            this.cards.push(...newCards)
        }
    }

    removeCard(card: GameCard): void {
        // Remove the card from the queue
        this.cards = this.cards.filter(c => c.id !== card.id)

        // Get all cards in the same row after the removed card
        const cardsInRow = this.getCardsInRow(card.row)
            .filter(c => c.col > card.col)

        // Move remaining cards one position to the left
        cardsInRow.forEach(c => {
            c.col -= 1
        })
    }

    discardCard(card: GameCard): void {
        // Discard works the same as remove for now
        this.removeCard(card)
    }
}
