import { useStore } from "../store";
import { useShallow } from "zustand/react/shallow";

export const useCardsQueue = () => useStore(
    useShallow((store) => ({
        cards: store.cards,
        addCard: store.addCard,
        removeCard: store.removeCard,
        updateCard: store.updateCard,
        setCards: store.setCards,
    }))
); 