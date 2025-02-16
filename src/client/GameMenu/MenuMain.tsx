import Menu from "../components/Menu"
import { useMenu } from "./selectors"
import { useGameClient } from "../GameClient/selectors"
import { ClientAction } from "../../EventChannel/types"

export const MenuMain = () => {
    const { openMenu, closeMenu, closeAll } = useMenu()
    const { gameClient } = useGameClient()

    return <Menu>
        <Menu.Title>Main Menu</Menu.Title>
        <Menu.Item onClick={() => {
            if (!gameClient) throw new Error('Game client not found')
            gameClient.createGame(true)
            closeAll()
            gameClient.sendAction(ClientAction.Ready, undefined)
        }}>Play</Menu.Item>
        <Menu.Item onClick={() => openMenu('settings')}>Settings</Menu.Item>
        <Menu.Item onClick={() => closeMenu()}>Exit</Menu.Item>
    </Menu>
}


