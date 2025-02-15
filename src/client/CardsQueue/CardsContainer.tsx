import { FC, PropsWithChildren } from 'react';

export const CardsContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 
                        flex flex-col gap-4 p-4 bg-slate-900/50 rounded-lg">
            {children}
        </div>
    );
}; 