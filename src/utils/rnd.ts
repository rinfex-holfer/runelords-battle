

export const getRndItem = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
}

export const getRndItemFromMap = <T>(map: Record<string, T>): T => {
    return map[getRndItem(Object.keys(map))]
}
