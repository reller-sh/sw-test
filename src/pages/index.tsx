import Head from "next/head";
import {useStore} from "@/hooks/useStore";
import React, {useState} from "react";
import {observer} from "mobx-react";
import {BlockStateView} from "@/components/BlockStateView";
import {RepositoryItem} from "@/components/RepositoryItem";
import {RepoSearchResultItem} from "@/core/clients/types";
import {Input} from "@/components/Input";
import {CopyButton} from "@/components/CopyButton";

export const List: React.FC<{
    other?: RepoSearchResultItem[]
}> = observer(({other}) => {
    const {repositories} = useStore();

    const repos = other || repositories.list
    return <div className={'d-flex flex-column gap-2'}>
        {repos.map(item =>
            <RepositoryItem item={item} key={item.id}/>)}
    </div>
})


const Home = observer(() => {

    const {repositories} = useStore();

    const [searchText, setSearchText] = useState('');
    const search = (searchString: string) => {
        setSearchText(searchString)
        repositories.getRepos(searchString).then()
    }

    return (
        <>
            <Head>
                <title>List repositories</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={'d-flex p-4 gap-4 m-0'}>
                <div className={'d-flex w-50 flex-column gap-3 flex-fill'}>
                    <div className={'d-flex'}>
                        <Input name={'search'} label={'search'} onChange={search}/>
                        <CopyButton text={searchText}/>
                    </div>

                    <h1>
                        Repositories list:
                    </h1>
                    <BlockStateView keyStatus={repositories.status}>
                        <List/>
                    </BlockStateView>
                </div>
                <div className={'d-flex w-50 flex-column gap-3 flex-fill'}>
                    <h1>
                        Local starred repositories:
                    </h1>
                    <List other={repositories.starred}/>
                </div>
            </main>
        </>
    )
})

export default Home