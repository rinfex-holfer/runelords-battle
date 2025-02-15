import { FC } from 'react';
import { GameCard } from '../../domain/cards';

interface CardProps {
    card: GameCard;
    onClick: (id: string) => void;
}

export const Card: FC<CardProps> = ({ card, onClick }) => {
    return (
        <div className="w-28 h-36 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-3 
                        text-white flex flex-col gap-2 shadow-lg cursor-pointer 
                        transition-transform hover:-translate-y-1"
            onClick={() => onClick(card.id)}>
            <div className="text-sm font-semibold">{card.templateId}</div>
            <div className="mt-auto">
                <span className="bg-slate-600/50 px-2 py-1 rounded text-xs">
                    Row: {card.row}, Col: {card.col}, id: {card.id}
                </span>
            </div>
        </div>
    );
}; 