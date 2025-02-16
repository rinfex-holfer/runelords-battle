# server-side
temporarily in the same folder as the client

## api (src/service/api.ts)
API for client to interact with server.

## domain (src/domain)
contains types, constants and general game util functions. Shared between client and server.

## GamesManager (src/service/GamesManager.ts)
Creates, stores and deletes active games. Maintains connections between client and server.

## engine (src/service/engine)

Engine of a game. Manages global state of a particular game with Game class, contains rules of a game, validation functions, etc.

### Game (src/service/engine/Game.ts)
contains id of particular game session
acts as a container for managers - classes that handle different parts of the game

contains global game state, produced from managers' states and queue of events. 

### Managers
Each manager is a class that handles a specific part of the game. Produces serialized state and events.

managers:
- CardsQueue (src/engine/cards/CardsQueue.ts) - handles cards queue for each player
- CreepsManager - TODO
- HeroManager - TODO
- TempleManager - TODO
- FieldManager - TODO

## Game initiation:
1. client creates a game through REST API
2. server creates a game instance and returns its id to the client
3. client establishes a WS connection to the server. For each client Game creates an instance of EventChannel and communicates with the client through it.
4. server initializes a game instance
5. server sends initial state to the client
6. server and client start exchanging events through event channel

## event channel
client <-> server communication is done via WS

It is implemented through Two-Phase Updates:
1. client sends action to the server:
```
{
    event: 'card-played',
    payload: {
      cardId: 'lightning-123',
      targetId: 'creep-456'
    }
}
```

2. server validates the action and processes it. Example:

2.1 Game has CardsQueue instance for each player.
initial serialized state (Game has getState() method that gathers states from all managers)
```
cardsQueues: [
        {
            playerId: 'player1', 
            cards: [
                {id: 'lightning-123', templateId: 'lightning', row: 0, col: 0}, 
                {id: 'fireball-456', templateId: 'fireball', row: 0, col: 1}
            ]
        }
    ]
```

2.2 client sends action:
```
{
    event: 'card-played',
    payload: {
      cardId: 'lightning-123',
      targetId: 'creep-456'
    }
}

2.3. Game validates the action: it should happen in GameRules class, primarily with static methods.

2.4. Game processes the action: manager methods are called, their internal state is updated, and a sequence of events is produced. Again, where should it happen - in game, in manager, or in some GameRules class, or in other class? How to make this step from here, to next (described below) accummulation of changes?

3. server sends back sequence of visuals and state updates:
```
effects: {
    visuals: [
        {
            id: 'card-play',
            type: 'card-animation',
            params: {
                cardId: 'lightning-123',
                sequence: [
                    { type: 'hover', duration: 400 },
                    { type: 'glow', duration: 300 },
                    { type: 'fade-out', duration: 200 }
                ]
            }
        },
        {
            id: 'lightning-strike',
            type: 'projectile',
            params: {
                effect: 'lightning',
                from: { selector: '#card-lightning-123' },
                to: { selector: '#creep-456' },
                duration: 600
            }
        },
        {
            id: 'creep-damage',
            type: 'creature-effect',
            params: {
                targetId: 'creep-456',
                sequence: [
                    { type: 'damage-flash', duration: 200 },
                    { type: 'damage-numbers', value: -3, duration: 500 },
                    { type: 'death-animation', duration: 800 }
                ]
            }
        },
    ],
    state: [
        {
            type: 'remove-card',
            path: ['cardQueues', 'player1', 'lightning-123']
        },
        {
            type: 'remove-creep',
            path: ['creeps2', 'creep-456']
        },
        {
            type: 'add-card',
            path: ['cardQueues', 'player1'],
            value: {
                id: 'new-card-789',
                templateId: 'fireball',
                row: 2,
                col: 3
            }
        }
    ]
}
```