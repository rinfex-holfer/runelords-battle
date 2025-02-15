import Menu from "../components/Menu"
import { useMenu } from "./store"

export const MenuSettings = () => {
    const { closeMenu } = useMenu()

    return <Menu>
        <Menu.Title>Settings</Menu.Title>
        <Menu.Item onClick={() => closeMenu()}>Back</Menu.Item>
        <Menu.Item onClick={() => closeMenu()}>Apply</Menu.Item>
    </Menu>
}


