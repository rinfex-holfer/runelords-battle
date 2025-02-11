import Menu from "../components/Menu"
import { useGameMenu } from "./store"

export const MenuGameOver = () => {
    const { clearMenuStack, openMenu } = useGameMenu()

    return <Menu>
        <Menu.Title>Game Over</Menu.Title>
        <Menu.Item onClick={() => clearMenuStack()}>Play Again</Menu.Item>
        <Menu.Item onClick={() => openMenu('main')}>Main Menu</Menu.Item>
        <Menu.Item onClick={() => {}}>Exit</Menu.Item>
    </Menu>
} 