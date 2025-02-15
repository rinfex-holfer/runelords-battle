import { GameClient } from ".";
import { GameState, useStore } from "../store";
import { StateCreator } from 'zustand';

export type GameClientState = {
    gameClient: GameClient | null;
}

export type GameClientActions = {
    setGameClient: (gameClient: GameClient) => void;
}

type GameClientSlice = {
    initialState: GameClientState;
    actions: StateCreator<GameState, [], [], GameClientActions>;
}

export const createGameClientSlice: GameClientSlice = {
    initialState: {
        gameClient: null,
    },
    actions: (set) => ({
        setGameClient: (gameClient) => set({ gameClient }),
    }),
};

// selectors
export const useGameClient = () => useStore((store) => ({
    gameClient: store.gameClient,
    setGameClient: store.setGameClient,
}));
