import { Overlay } from "../components/Overlay"
import { useCurrentMenu } from "./store"
import { MenuMain } from "./MenuMain"
import { MenuSettings } from "./MenuSettings"
import { MenuPause } from "./MenuPause"
import { MenuGameOver } from "./MenuGameOver"

export const GameMenu = () => {
    const currentMenu = useCurrentMenu()

    if (!currentMenu) return null

    const getCurrentMenu = () => {
        switch (currentMenu) {
            case 'main':
                return <MenuMain />
            case 'settings':
                return <MenuSettings />
            case 'pause':
                return <MenuPause />
            case 'gameOver':
                return <MenuGameOver />
            default:
                return <MenuMain />
        }
    }

    return <Overlay>
        {getCurrentMenu()}
    </Overlay>
}
