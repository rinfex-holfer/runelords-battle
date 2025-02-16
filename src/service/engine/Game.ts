import { EventChannel } from "../../EventChannel"
import { ClientActionKey } from "../../EventChannel/types"
import { ClientActionData } from "../../EventChannel/types"
import { GameEvent } from "../../EventChannel/types"
import { ClientAction } from "../../EventChannel/types"
import { getCardTemplateById } from "../../domain/cards"
import { TEMPLE_INITIAL_HP } from "../../domain/constants"
import { GameState } from "../../domain/types"
import { generateId } from "../../utils/generateId"
import { getCardExecuteFunctionById } from "./cards/execute"
import { CardsQueue } from "./cards/СardsQueue"

export class Game {
    id = generateId()
    private cardsQueues: CardsQueue[] = []

    private playerConnections: Record<string, EventChannel> = {}

    constructor() {

    }

    addPlayer(playerId: string) {
        const eventChannel = new EventChannel()
        this.playerConnections[playerId] = eventChannel
        // TODO: connect player EventChannel to player entity in game state
        this.cardsQueues.push(new CardsQueue(playerId))

        eventChannel.onPlayerAction(action => this.handlePlayerAction(playerId, action))
    }

    connectPlayer(playerId: string) {
        return this.playerConnections[playerId]
    }

    getPlayerConnection(playerId: string) {
        return this.playerConnections[playerId]
    }

    getPlayerQueue(playerId: string) {
        return this.cardsQueues.find(queue => queue.playerId === playerId)
    }

    handlePlayerAction(playerId: string, action: {
        key: ClientActionKey
        payload: ClientActionData[ClientActionKey]
    }) {
        console.log('handlePlayerAction', playerId, action)
        const channel = this.getPlayerConnection(playerId)
        const queue = this.getPlayerQueue(playerId)

        switch (action.key) {
            case ClientAction.Ready:
                if (!channel) throw new Error('Player not connected')
                if (!queue) throw new Error('Queue not found')

                queue.fillQueue()
                channel.sendGameEvent({
                    key: GameEvent.QueueCreated,
                    payload: queue.getState()
                })
                break
            case ClientAction.PlayCard:
                if (!queue) throw new Error(`Cant execute action ${ClientAction.PlayCard}: Queue not found for player ${playerId}`)
                if (!action.payload?.cardId) throw new Error(`Cant execute action ${ClientAction.PlayCard}: Card id not found in payload`)

                const card = queue.getCard(action.payload.cardId)
                if (!card) throw new Error(`Cant execute action ${ClientAction.PlayCard}: Card not found in queue`)

                const cardTemplate = getCardTemplateById(card.templateId)
                const executeFn = getCardExecuteFunctionById(cardTemplate.id)
                executeFn(this.getGameState())
                channel.sendGameEvent({
                    key: GameEvent.CardsRemoved,
                    payload: { ids: [card.id] }
                })
                break
        }
    }

    getGameState(): GameState {
        return {
            phase: 'Player1Turn',
            temples: [
                { hp: TEMPLE_INITIAL_HP, playerId: 'player1' },
                { hp: TEMPLE_INITIAL_HP, playerId: 'player2' },
            ],
            cardsQueues: this.cardsQueues.map(queue => queue.getState()),
            heroes: [
                {
                    playerId: 'player1',
                    type: 'hero',
                    limbs: [],
                    wields: [],
                    speed: 0,
                    coord: { x: 0, y: 0 },
                },
                {
                    playerId: 'player2',
                    type: 'hero',
                    limbs: [],
                    wields: [],
                    speed: 0,
                    coord: { x: 0, y: 0 },
                },
            ],
            creeps: [
                {
                    playerId: 'player1',
                    type: 'creep',
                    limbs: [],
                    wields: [],
                    speed: 0,
                    coord: { x: 0, y: 0 },
                },
                {
                    playerId: 'player2',
                    type: 'creep',
                    limbs: [],
                    wields: [],
                    speed: 0,
                    coord: { x: 0, y: 0 },
                },
            ],
        }
    }
}