import { useEffect } from "react"
import { useGameClient } from "./selectors"
import { GameClient } from "."

export const useInitGameClient = () => {
    const { setGameClient, gameClient } = useGameClient()

    useEffect(() => {
        if (!gameClient) {
            setGameClient(new GameClient())
        }
    }, [gameClient, setGameClient])
}
