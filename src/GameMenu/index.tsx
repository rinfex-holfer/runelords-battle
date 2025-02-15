import { Overlay } from "../components/Overlay"
import { MenuMain } from "./MenuMain"
import { MenuSettings } from "./MenuSettings"
import { MenuPause } from "./MenuPause"
import { MenuGameOver } from "./MenuGameOver"
import { selectors } from "../store"
export const GameMenu = () => {
    const currentMenu = selectors.useCurrentMenu()

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
                throw new Error(`Unknown menu: ${currentMenu}`)
        }
    }

    return <Overlay>
        {getCurrentMenu()}
    </Overlay>
}
