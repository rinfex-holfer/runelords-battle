import Menu from "../components/Menu"
import { GameStore, useStore } from "../store"

export const MenuGameOver = () => {
    const { clearMenuStack, openMenu } = useStore((state: GameStore) => ({
        clearMenuStack: state.clearMenuStack,
        openMenu: state.openMenu,
    }))

    return <Menu>
        <Menu.Title>Game Over</Menu.Title>
        <Menu.Item onClick={() => clearMenuStack()}>Play Again</Menu.Item>
        <Menu.Item onClick={() => openMenu('main')}>Main Menu</Menu.Item>
        <Menu.Item onClick={() => { }}>Exit</Menu.Item>
    </Menu>
}