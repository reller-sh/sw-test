import {LoadingStatus} from "@/core/clients/types";
import {action, autorun, makeObservable, observable, runInAction} from "mobx";
import {asyncUntil} from "@/core/utils";

type SimpleFunctionDef = (...args: any[]) => Promise<any>

export class StoreNetworkUtilities {
    @observable public status: LoadingStatus = LoadingStatus.NEVER;

    @observable private throttleStagnation: number | null  = null;
    private throttleArgs: any  = null;

    constructor() {
        makeObservable(this)
    }

    @action
    withThrottle = <Fn extends SimpleFunctionDef>(callback: Fn, stagnation: number = 100) => async (...args: Parameters<Fn>) => {
        this.throttleArgs = args
        if (performance.now() < Number(this.throttleStagnation)) {
            await asyncUntil(() => performance.now() > Number(this.throttleStagnation), stagnation / 2.1)
            if (args === this.throttleArgs)
                await callback(...this.throttleArgs)
        } else {
            this.throttleStagnation = performance.now() + stagnation
            await callback(...args)
        }
    }

    @action
    withLoading = <Fn extends SimpleFunctionDef>(callback: Fn) => async (...args: Parameters<Fn>) => {
        this.status = LoadingStatus.LOADING
        await runInAction(async () => {
            const statusReturn = await callback(...args)
            this.status = statusReturn ? statusReturn : LoadingStatus.LOADED
        })
    }

    @action
    withErrorBoundary = <Fn extends SimpleFunctionDef>(callback: Fn) => async (...args: Parameters<Fn>) => {
        let meta = null;
        try {
            meta = await callback(...args);
        } catch (e) {
            this.status = LoadingStatus.ERROR
            console.log(e);
        }
        return meta
    }
}