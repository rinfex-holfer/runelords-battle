export type GameCardTemplate = {
    readonly id: string
    readonly name: string
    readonly description: string
    readonly execute: () => void
}

export type GameCard = {
    readonly id: string
    readonly templateId: string
    row: number
    col: number
} 