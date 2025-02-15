import { useCallback } from 'react'
import { GameMenu } from './GameMenu'
import { useKey } from '../utils/hooks/useKey'
import { useMenu } from './GameMenu/store'

function App() {
  const { openMenu, closeMenu, currentMenu } = useMenu()

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
