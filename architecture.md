# server-side
temporarily in the same folder as the client

## domain (src/domain)
contains types, constants and general game util functions. Shared between client and server.

## engine (src/engine)

### Game (src/engine/Game.ts)
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

## event bus
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

2. server validates the action, processes it, and sends result of action with sequence of visuals and state updates:
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
        path: ['cardsQueue1', 'lightning-123']
      },
      {
        type: 'remove-creep',
        path: ['creeps2', 'creep-456']
      },
      {
        type: 'add-card',
        path: ['cardsQueue1'],
        value: {
          id: 'new-card-789',
          templateId: 'fireball',
          row: 2,
          col: 3
        }
      }
    ]
  }