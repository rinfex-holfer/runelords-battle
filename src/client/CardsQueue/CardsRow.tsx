import { FC, PropsWithChildren } from 'react';

export const CardsRow: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex gap-4 justify-center">
            {children}
        </div>
    );
}; 