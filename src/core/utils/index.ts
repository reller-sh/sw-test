
type CommonCallBack = (...arg: any[]) => boolean

interface AsyncUntil {
    (conditionFunction: CommonCallBack, interval?: number):Promise<void>
}

export const asyncUntil:AsyncUntil = (conditionFunction, interval = 100) =>  {

    const poll = (resolve: () => void) => {
        if(conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), interval);
    }

    return new Promise(poll);
}

export const isBrowser = () => typeof window !== 'undefined'