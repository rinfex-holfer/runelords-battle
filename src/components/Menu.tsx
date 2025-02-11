import { FC, PropsWithChildren } from "react"

const Menu = ({ children }: PropsWithChildren) => {
    return <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] text-gray-800">
        {children}
    </div>
}

const MenuItem: FC<PropsWithChildren<{
    onClick: () => void
}>> = ({ children, onClick }) => {
    return <button 
        className="w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg mb-2 last:mb-0 transition-colors cursor-pointer text-gray-800" 
        onClick={onClick}
    >
        {children}
    </button>
}

const MenuTitle: FC<PropsWithChildren> = ({ children }) => {
    return <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{children}</h2>
}

Menu.Item = MenuItem
Menu.Title = MenuTitle

export default Menu

