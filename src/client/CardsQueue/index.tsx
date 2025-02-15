import { FC, useMemo } from 'react';
import { CardsContainer } from './CardsContainer';
import { CardsRow } from './CardsRow';
import { useCardsQueue } from './store';
import { ROWS_COUNT, VISIBLE_CARDS_IN_ROW } from '../../domain/constants';
import { Card } from './Card';
import { GameCard } from '../../domain/cards';

export const CardsQueue: FC = () => {
    const { cards } = useCardsQueue();

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

    return (
        <CardsContainer>
            {rows.map((rowCards, index) => (
                <CardsRow key={index}>
                    {rowCards.map(card => (
                        <Card key={card.id} card={card} />
                    ))}
                </CardsRow>
            ))}
        </CardsContainer>
    );
};
