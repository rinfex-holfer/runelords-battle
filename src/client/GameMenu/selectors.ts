import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store";

// selectors
export const useMenu = () => useStore(useShallow((store) => ({
    stack: store.stack,
    currentMenu: store.stack[store.stack.length - 1],
    openMenu: store.openMenu,
    closeMenu: store.closeMenu,
    closeAll: store.clearMenuStack,
})));
