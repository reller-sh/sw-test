import {GithubSearchRepositories, RepoSearchResultItem} from "@/core/clients/types";
import {github} from "@/core/clients/github";
import {StoreNetworkUtilities} from "@/core/store";
import {action, autorun, computed, makeObservable, observable} from "mobx";
import fp from 'lodash/fp'
import {isBrowser} from "@/core/utils";

// function timeout(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

class Repositories extends StoreNetworkUtilities {
    @observable public list: RepoSearchResultItem[] = []
    @observable public allLoaded: RepoSearchResultItem[] = []
    @observable public starredIds: number[] = []

    constructor() {
        super();
        makeObservable(this)
        if (isBrowser()) {
            // restore from LS cache
            this.starredIds = JSON.parse(localStorage.getItem('gh-stars') || '[]')
        }
    }

    @action
    pushOrRemoveStar = (id: number) => {
        this.starredIds = fp.xor(this.starredIds, [id])
    }

    @computed
    get starred () {
        return fp.filter(fp.pipe(fp.get('id'), (val) => fp.includes(val, this.starredIds)), this.allLoaded)
    }

    @action
    getRepos = this.withErrorBoundary(this.withLoading(this.withThrottle(async (search: string) => {
        const repos = await github<GithubSearchRepositories>({
            path: 'search/repositories',
            query: {q: search}
        })
        this.list = repos.items
        this.allLoaded = fp.uniqBy('id', [...this.allLoaded, ...repos.items])
    }, 1500)))
}



export const repositories = new Repositories();


autorun(() => {
    // cache in LS
    if (isBrowser())
        localStorage.setItem('gh-stars', JSON.stringify(repositories.starredIds))
})

