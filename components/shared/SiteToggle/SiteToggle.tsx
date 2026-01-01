"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import styles from './Component.module.css';
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { ButtonItems } from "./config";
import { ButtonItem } from "../ButtonGroup/types";
import SocialGroup from "../SocialGroup/SocialGroup";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";

type SiteToggleProp = {
    router: AppRouterInstance
};

export default function SiteToggle({ router }: SiteToggleProp) {
    const pathname = usePathname();
    const [active, setActive] = useState<string>(pathname.split("/")[1]);
    const [buttonItems, setButtonItems] = useState<ButtonItem[]>(ButtonItems.map(item => ({
        ...item,
        cssClass: item.cssClass ? `${styles[item.cssClass]}` : '',
        active: item.name === active ? true : false
    })));

    const updateActive = (name: string) => {
        setButtonItems((prev) => prev.map((item) => ({ ...item, active: item.name === name ? true : false })));
        setActive(() => name);
    };

    const onClickHandler = (button: ButtonItem) => {
        updateActive(button.name);
        setTimeout(() => {
            router.push(`/${button.name}`);
        }, 400);
    };
    useEffect(() => updateActive(active), []);
    return (
        <>
            <div className={`flex items-center justify-center flex items-center justify-center bg-zinc-50 font-sans dark:bg-black ${styles.imageContainer}`}>
                <section className="sticky top-0 z-50 w-full bg-black" style={{ position: "absolute" }}>
                    <div className={`${styles.slider} ${styles.imageContainer}`}>
                        {buttonItems.map((item, i) => <Fragment key={i} >
                            <Image src={`${item.imgLink}`} alt='' style={{ objectFit: "cover" }} fill
                                className={`object-cover ${styles.opacity} ${item.name === active ? styles.active : ''}`} loading="eager" />
                            <div className={`absolute inset-0 flex flex-col items-center justify-center ${styles.opacity} ${item.name === active ? styles.active : ''}`}>
                                <span className={`text-white text-xl font-bold ${styles.name} ${styles[`${item.name}NameFont`]}`}>
                                    <h1>Mainak Bose</h1></span>
                                <span className={`text-white ${styles[`${item.name}SubHeaderFont`]} ${styles.subHeader}`}><h2>{`${item.subHeader}`}</h2></span>
                                <SocialGroup socialList={item.socialList ? item.socialList : []}
                                    linkList={buttonItems.find((i) => i.name === active)?.socialList} />
                            </div>
                        </Fragment>)}
                    </div>
                </section>
            </div>
            <ButtonGroup buttonList={buttonItems} onClickHandler={onClickHandler} divider={true} />
        </>
    );
}