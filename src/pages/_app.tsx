import type {AppProps} from 'next/app'

import {store} from "@/store";
import {StoreContext} from "@/hooks/useStore";


import '@/styles/global.scss'

export default function App({Component, pageProps}: AppProps) {
    return <StoreContext.Provider value={store}>
        <Component {...pageProps} />
    </StoreContext.Provider>
}
