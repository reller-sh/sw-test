import {repositories} from './repositories';


export class Store {
    public repositories = repositories;
}

export const store = new Store();