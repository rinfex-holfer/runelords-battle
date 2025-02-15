import { Game } from "./engine/Game";


class GameManager {
    private games: Game[] = []

    constructor() {

    }

    createGame() {
        const game = new Game()
        this.games.push(game)
        return game
    }

    deleteGame(gameId: string) {
        this.games = this.games.filter(game => game.id !== gameId)
    }

    getGame(gameId: string) {
        return this.games.find(game => game.id === gameId)
    }

    getPlayerConnection(playerId: string) {
        return this.games.find(game => game.getPlayerConnection(playerId))
    }
}

export const gamesManager = new GameManager()
