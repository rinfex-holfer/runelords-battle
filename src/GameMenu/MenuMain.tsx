import Menu from "../components/Menu"
import { useGameMenu } from "./store"

export const MenuMain = () => {
    const { openMenu, closeMenu } = useGameMenu()

    return <Menu>
        <Menu.Title>Main Menu</Menu.Title>
        <Menu.Item onClick={() => openMenu('play')}>Play</Menu.Item>
        <Menu.Item onClick={() => openMenu('settings')}>Settings</Menu.Item>
        <Menu.Item onClick={() => closeMenu()}>Exit</Menu.Item>
    </Menu>
}


