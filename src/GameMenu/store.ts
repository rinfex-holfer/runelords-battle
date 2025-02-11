import { create } from "zustand";
import { combine } from "zustand/middleware";

type MenuType = 'main' | 'pause' | 'gameOver' | 'settings' | 'play'

export const useGameMenu = create(combine({
    stack: [] as MenuType[],
}, (set) => ({
    openMenu: (menuType: MenuType) => set((state) => ({ stack: [...state.stack, menuType] })),
    closeMenu: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
    clearMenuStack: () => set({ stack: [] }),
})))

export const useCurrentMenu = () => useGameMenu((state) => state.stack[state.stack.length - 1])
