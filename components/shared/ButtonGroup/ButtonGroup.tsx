"use client";

import styles from './Component.module.css';
import { ButtonItem } from './types';
import { Fragment } from 'react/jsx-runtime';


type ButtonGroupProps = {
    buttonList: ButtonItem[]
    onClickHandler: Function,
    divider?: boolean,
    style?: React.CSSProperties
};

export default function ButtonGroup({ buttonList, onClickHandler, divider, style }: ButtonGroupProps) {
    const width = Math.floor(100 / (buttonList.length + (divider ? buttonList.length - 1 : 0)));
    return (
        <>
            <section className={`flex items-center justify-evenly flex items-center justify-center font-sans ${styles.buttonContainer}`}>
                {buttonList.map((bl, i) => <Fragment key={i}>
                    {i !== 0 && divider === true ? <span className={`${styles.buttonDivider} text-center`}
                    >/</span> : <></>}
                    <span key={i} className={`flex justify-center items-center text-center `}
                        style={{
                            width: `${width}%`,
                            ...style
                        }}>
                        <button className={`pointer-cursor ${bl.cssClass ? bl.cssClass : ''} ${styles.button} ${bl.active ? styles.active : ''}`} onClick={() => onClickHandler(bl)}>{bl.name}</button>
                    </span>
                </Fragment>)}
            </section>
        </>
    );
}