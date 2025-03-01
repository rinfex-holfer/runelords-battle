import Menu from "../components/Menu"
import { useMenu } from "./selectors"

export const MenuPause = () => {
    const { closeMenu, openMenu, closeAll: clearMenuStack } = useMenu()

    return <Menu>
        <Menu.Title>Pause</Menu.Title>
        <Menu.Item onClick={() => closeMenu()}>Resume</Menu.Item>
        <Menu.Item onClick={() => openMenu('settings')}>Settings</Menu.Item>
        <Menu.Item onClick={() => clearMenuStack()}>Exit</Menu.Item>
    </Menu>
} 