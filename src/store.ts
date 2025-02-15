import { create } from "zustand";
import { combine } from "zustand/middleware";
import { createGameMenuSlice, GameMenuActions, GameMenuState } from "./GameMenu/store";
import { createGameClientSlice, GameClientActions, GameClientState } from "./GameClient/store";

export type GameState = GameMenuState & GameClientState;
export type GameActions = GameMenuActions & GameClientActions;
export type GameStore = GameState & GameActions;

export const useStore = create<GameStore>()(
    combine(
        {
            ...createGameMenuSlice.initialState,
            ...createGameClientSlice.initialState,
        },
        (set, get, store) => ({
            ...createGameMenuSlice.actions(set, get, store),
            ...createGameClientSlice.actions(set, get, store),
        })
    )
);
