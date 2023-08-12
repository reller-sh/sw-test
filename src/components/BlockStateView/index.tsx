import React, {PropsWithChildren} from "react";
import {LoadingStatus} from "@/core/clients/types";


export const BlockStateView: React.FC<PropsWithChildren<{ keyStatus: LoadingStatus }>> = ({keyStatus, children}) => {

    switch (keyStatus) {
        case LoadingStatus.ERROR:
            return <>Something Wrong!</>
        case LoadingStatus.NEVER:
            return <>Not Loaded</>
        case LoadingStatus.LOADED_EMPTY:
            return <>Nothing found!</>
        case LoadingStatus.LOADING:
            return <>Loading...</>
        case LoadingStatus.LOADED:
            return <>{children}</>
    }
}