import { CardTemplateId, CardTemplateIdMap, GameCard, getCardTemplateById } from "../../../domain/cards"
import { VISIBLE_CARDS_IN_ROW } from "../../../domain/constants"
import { ROWS_COUNT } from "../../../domain/constants"
import { generateId } from "../../../utils/generateId"
import { getRndItemFromMap } from "../../../utils/rnd"

export class CardsQueue {
    private cards: GameCard[]

    playerId: string

    constructor(playerId: string, cards: GameCard[] = []) {
        this.playerId = playerId
        this.cards = cards
    }

    getCard(cardId: string): GameCard | undefined {
        return this.cards.find(card => card.id === cardId)
    }

    getCardsInRow(row: number): GameCard[] {
        return this.cards.filter(card => card.row === row)
    }

    generateCards(count: number): GameCard[] {
        const cards: GameCard[] = []

        for (let i = 0; i < count; i++) {
            const randomTemplateId = getRndItemFromMap(CardTemplateIdMap)
            const randomTemplate = getCardTemplateById(randomTemplateId)
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

    createCard(templateId: CardTemplateId, row: number, col: number): GameCard {
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

    getState(): CardsQueueState {
        return {
            cards: this.cards,
            playerId: this.playerId
        }
    }
}

export type CardsQueueState = {
    cards: GameCard[]
    playerId: string
}
