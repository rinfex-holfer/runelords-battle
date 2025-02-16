import { GameState } from "../store";
import { StateCreator } from 'zustand';
import { GameCard } from "../../domain/cards";

export type CardsQueueState = {
    cards: GameCard[];
}

export type CardsQueueActions = {
    addCard: (card: GameCard) => void;
    removeCard: (cardId: string) => void;
    updateCard: (cardId: string, updates: Partial<GameCard>) => void;
    setCards: (cards: GameCard[]) => void;
}

type CardsQueueSlice = {
    initialState: CardsQueueState;
    actions: StateCreator<GameState, [], [], CardsQueueActions>;
}

export const createCardsQueueSlice: CardsQueueSlice = {
    initialState: {
        cards: [],
    },
    actions: (set) => ({
        addCard: (card) =>
            set((state) => ({ cards: [...state.cards, card] })),

        removeCard: (cardId) =>
            set((state) => ({
                cards: state.cards.filter(card => card.id !== cardId)
            })),

        updateCard: (cardId, updates) =>
            set((state) => ({
                cards: state.cards.map(card =>
                    card.id === cardId ? { ...card, ...updates } : card
                )
            })),

        setCards: (cards) => set({ cards }),
    })
};
