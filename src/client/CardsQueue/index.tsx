import { FC, useCallback, useEffect, useMemo } from 'react';
import { CardsContainer } from './CardsContainer';
import { CardsRow } from './CardsRow';
import { useCardsQueue } from './selectors';
import { ROWS_COUNT, VISIBLE_CARDS_IN_ROW } from '../../domain/constants';
import { Card } from './Card';
import { GameCard } from '../../domain/cards';
import { useGameClient } from '../GameClient/selectors';
import { ClientAction, GameEvent, GameEventData } from '../../EventChannel/types';

export const CardsQueue: FC = () => {
    const { cards, setCards } = useCardsQueue();
    const { gameClient } = useGameClient();

    const rows = useMemo(() => {
        const rowsArray: GameCard[][] = Array.from({ length: ROWS_COUNT }, () => []);

        cards.forEach(card => {
            rowsArray[card.row] = [...rowsArray[card.row], card];
        });

        return rowsArray.map(rowCards =>
            rowCards
                .sort((a, b) => a.col - b.col)
                .slice(0, VISIBLE_CARDS_IN_ROW)
        );
    }, [cards]);

    const onCardClick = (cardId: string) => {
        gameClient?.sendAction(ClientAction.PlayCard, {
            cardId,
            payload: {}
        })
    }

    const onQueueCreated = useCallback((data: GameEventData[typeof GameEvent.QueueCreated]) => {
        setCards(data.cards)
    }, [setCards])

    useEffect(() => {
        gameClient?.onGameEvent(GameEvent.QueueCreated, onQueueCreated)
        return () => gameClient?.unsubscribeFromGameEvent(GameEvent.QueueCreated, onQueueCreated)
    }, [gameClient, onQueueCreated])

    return (
        <CardsContainer>
            {rows.map((rowCards, index) => (
                <CardsRow key={index}>
                    {rowCards.map(card => (
                        <Card key={card.id} card={card} onClick={onCardClick} />
                    ))}
                </CardsRow>
            ))}
        </CardsContainer>
    );
};
