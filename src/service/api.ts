import { EventChannel } from "../EventChannel"
import { gamesManager } from "./GamesManager"

const api = {
    createNewGame: () => {
        const game = gamesManager.createGame()
        return game.id
    },

    connectToGame: (gameId: string, playerId: string): EventChannel => {
        const game = gamesManager.getGame(gameId)
        if (!game) {
            throw new Error('Game not found')
        }
        game.addPlayer(playerId)
        return game.getPlayerConnection(playerId)
    }
}

export default api
