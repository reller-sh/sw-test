import React from "react";

import styles from './styles.module.scss'


interface IInput {
    name: string
    label?: string
    onChange?: (arg: string) => void
}

export const Input: React.FC<IInput> = ({ name, label, onChange }) => {
    return <>
        <input className={styles.input} onChange={(event) => onChange && onChange(event.target.value)} name={name} placeholder={label} />
    </>
}