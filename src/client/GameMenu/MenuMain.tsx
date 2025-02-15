import Menu from "../components/Menu"
import { useMenu } from "./store"

export const MenuMain = () => {
    const { openMenu, closeMenu } = useMenu()

    return <Menu>
        <Menu.Title>Main Menu</Menu.Title>
        <Menu.Item onClick={() => {

        }}>Play</Menu.Item>
        <Menu.Item onClick={() => openMenu('settings')}>Settings</Menu.Item>
        <Menu.Item onClick={() => closeMenu()}>Exit</Menu.Item>
    </Menu>
}


