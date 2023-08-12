import {useStore} from "@/hooks/useStore";
import {useRouter} from "next/router";
import fp from "lodash/fp";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import {observer} from "mobx-react";
import {toJS} from "mobx";


const RepoId = observer(() => {

    const {query } = useRouter()

    const {repositories: { list }} = useStore()

    const item = fp.find(['id', parseInt(query.id as string)], toJS(list))

    // console.log(fp.find(['id', parseInt(query.id as string)], toJS(list)), query, toJS(list))

    if (typeof item === 'undefined')
        return <>Error</>

    return <>
        <div className={`d-flex align-items-center gap-3`}>
            <Image src={item.owner?.avatar_url || ''}
                   alt={item.name}
                   width={70}
                   height={70}
                   // className={styles.avatar}
            />
            <div className={clsx('d-flex align-items-center')}>
                <Link href={item.html_url}>
                    {item.full_name}
                </Link>
                {` --${item.license?.name}`}
            </div>
        </div>
        <div className={'p-4'}>
            <h5>
                {`Git: `}
                <pre className={'d-inline-flex '}>git clone {item.url}</pre>
            </h5>
            <h5>
                {`Owner: ${item.owner?.login} (${item.owner?.type})`}
            </h5>
            <h5>
                Make fork:
                <Link href={item.forks_url}>
                    {item.forks_url}
                </Link>
            </h5>
        </div>
        <details className={'p-4'}>
            <summary>View as JSON</summary>
            <pre>{JSON.stringify(list, null, 2)}</pre>
        </details>
        <pre>

        </pre>
    </>
})

export default RepoId;