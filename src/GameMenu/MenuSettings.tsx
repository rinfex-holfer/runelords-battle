import Menu from "../components/Menu"
import { useGameMenu } from "./store"

export const MenuSettings = () => {
    const { closeMenu } = useGameMenu()

    return <Menu>
        <Menu.Title>Settings</Menu.Title>
        <Menu.Item onClick={() => closeMenu()}>Back</Menu.Item>
        <Menu.Item onClick={() => closeMenu()}>Apply</Menu.Item>
    </Menu>
}


