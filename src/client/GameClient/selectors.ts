import { useStore } from "../store";
import { useShallow } from "zustand/react/shallow";

export const useGameClient = () => useStore(
    useShallow((store) => ({
        gameClient: store.gameClient,
        setGameClient: store.setGameClient,
    }))
); 