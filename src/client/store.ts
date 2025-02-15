import { create } from "zustand";
import { combine } from "zustand/middleware";
import { createGameMenuSlice, GameMenuActions, GameMenuState } from "./GameMenu/store";
import { createGameClientSlice, GameClientActions, GameClientState } from "./GameClient/store";
import { createCardsQueueSlice, CardsQueueActions, CardsQueueState } from "./CardsQueue/store";

export type GameState = GameMenuState & GameClientState & CardsQueueState;
export type GameActions = GameMenuActions & GameClientActions & CardsQueueActions;
export type GameStore = GameState & GameActions;

export const useStore = create<GameStore>()(
    combine(
        {
            ...createGameMenuSlice.initialState,
            ...createGameClientSlice.initialState,
            ...createCardsQueueSlice.initialState,
        },
        (set, get, store) => ({
            ...createGameMenuSlice.actions(set, get, store),
            ...createGameClientSlice.actions(set, get, store),
            ...createCardsQueueSlice.actions(set, get, store),
        })
    )
);
