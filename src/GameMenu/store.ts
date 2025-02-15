import { GameState, useStore } from "../store";
import { StateCreator } from 'zustand';

export type MenuType = 'main' | 'pause' | 'gameOver' | 'settings';

export type GameMenuState = {
    stack: MenuType[];
}

export type GameMenuActions = {
    openMenu: (menuType: MenuType) => void;
    closeMenu: () => void;
    clearMenuStack: () => void;
}

type GameMenuSlice = {
    initialState: GameMenuState;
    actions: StateCreator<GameState, [], [], GameMenuActions>;
}

export const createGameMenuSlice: GameMenuSlice = {
    initialState: {
        stack: [],
    },
    actions: (set) => ({
        openMenu: (menuType) =>
            set((state) => ({ stack: [...state.stack, menuType] })),
        closeMenu: () =>
            set((state) => ({ stack: state.stack.slice(0, -1) })),
        clearMenuStack: () => set({ stack: [] }),
    })
};

// selectors
export const useMenu = () => useStore((store) => ({
    stack: store.stack,
    currentMenu: store.stack[store.stack.length - 1],
    openMenu: store.openMenu,
    closeMenu: store.closeMenu,
    clearMenuStack: store.clearMenuStack,
}));

