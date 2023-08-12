import React, {useEffect, useState} from "react";

export const CopyButton: React.FC<{text: string}> = ({text}) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        setCopied(true);
        if (navigator.clipboard) {
            window.navigator.clipboard.writeText(text).then()
        }
    }

    useEffect(() => {
        let timer: any = null;
        if (copied)
            timer = setTimeout(() => setCopied(false), 2000)
        return () => {
            timer && clearTimeout(timer);
        };


    }, [copied]);


    return <button onClick={copyToClipboard}>{copied ? 'copied' : 'copy'}</button>
}