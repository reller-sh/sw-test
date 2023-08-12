import React from "react";
import {RepoSearchResultItem} from "@/core/clients/types";
import Image from "next/image";
import Link from "next/link";
import clsx from 'clsx'

import styles from './styles.module.scss'
import {observer} from "mobx-react";
import {useStore} from "@/hooks/useStore";
import fp from "lodash/fp";

export const RepositoryItem: React.FC<{ item: RepoSearchResultItem }> = observer(({item}) => {

    const {repositories: {pushOrRemoveStar, starredIds}} = useStore()

    const isStarred = fp.includes(item.id, starredIds)
    return (<>
        <div className={styles.container}>
            <div className={`d-flex align-items-center gap-3`}>
                <Image src={item.owner?.avatar_url || ''}
                       alt={item.name}
                       width={70}
                       height={70}
                       className={styles.avatar}
                />
                <div className={clsx(styles.link, 'd-flex align-items-center')}>
                    <Link href={item.html_url}>
                        {item.full_name}
                    </Link>
                </div>
            </div>
            <div className={styles.info}>
                <div className={'d-flex flex-column p-2'}>
                    <div>
                        Stars: {item.stargazers_count} /
                        Forks: {item.stargazers_count} /
                        <button onClick={() => pushOrRemoveStar(item.id)}>
                            {isStarred ? 'remove star' : 'set star'}
                        </button> /
                        <button onClick={() => pushOrRemoveStar(item.id)}>
                            Read more
                        </button>

                    </div>
                </div>
            </div>
            <hr/>
        </div>
    </>)
})