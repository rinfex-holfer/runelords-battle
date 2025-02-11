import { FC, PropsWithChildren } from "react"

export const Overlay: FC<PropsWithChildren> = ({ children }) => {
    return <div className="absolute inset-0 bg-black/30 size-full flex justify-center">
        <div className="mt-32">
            {children}
        </div>
    </div>
}

