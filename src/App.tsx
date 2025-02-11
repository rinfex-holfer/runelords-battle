import { useCallback } from 'react'
import { GameMenu } from './GameMenu'
import { useCurrentMenu, useGameMenu } from './GameMenu/store'
import { useKey } from './utils/hooks/useKey'

function App() {
  const { openMenu, closeMenu } = useGameMenu()
  const currentMenu = useCurrentMenu()

  const onEscapePressed = useCallback(() => {
    if (currentMenu) {
      closeMenu()
    } else {
      openMenu('main')
    }
  }, [currentMenu, closeMenu, openMenu])
  
  useKey('Escape', onEscapePressed)

  return (
    <>
      <div className='w-full h-full bg-slate-100'>
        <GameMenu />
      </div>
    </>
  )
}

export default App
