import {createContext, useContext} from "react";
import {Store} from "@/store";


export const StoreContext = createContext<Store | null>(null)


export const useStore = () => {
    let context = useContext(StoreContext);
    if (context === null) {
        throw Error('Store is not provided')
    }
    return context;
}