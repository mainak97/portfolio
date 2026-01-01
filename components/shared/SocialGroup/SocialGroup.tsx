"use client";

import styles from './Component.module.css';
import { SocialMediaItems } from './config';

export function InstagramIcon() {
    return (
        <svg
            viewBox="0 -0.5 15.5 15.5"
            fill="rgba(0, 0, 0, 0)"
            className={`${styles.svg} ml-2 mr-2`}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m 10.75,0.25 h -6 c -2.20914,0 -4,1.79086 -4,4 v 6 c 0,2.2091 1.79086,4 4,4 h 6 c 2.2091,0 4,-1.7909 4,-4 v -6 c 0,-2.20914 -1.7909,-4 -4,-4 z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                id="path1" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m 7.75,10.25 c -1.6569,0 -3,-1.3431 -3,-3 0,-1.6569 1.3431,-3 3,-3 1.6569,0 3,1.3431 3,3 0,0.7956 -0.3161,1.5587 -0.8787,2.1213 C 9.3087,9.9339 8.5456,10.25 7.75,10.25 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                id="path2" />
            <rect
                x="-4.25"
                y="10.75"
                width="2"
                height="2"
                rx="1"
                transform="rotate(-90)"
                fill="currentColor"
                id="rect2" />
            <rect
                x="-3.75"
                y="11.25"
                width="1"
                height="1"
                rx="0.5"
                transform="rotate(-90)"
                stroke="currentColor"
                strokeLinecap="round"
                id="rect3" />
        </svg>
    );
}

export function UnsplashIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="rgba(0, 0, 0, 0)"
            className={`${styles.svg} ml-2 mr-2`}
        >
            <path fill="none" d="M0 0H24V24H0z" />
            <path d="M8.5 11v5h7v-5H21v10H3V11h5.5zm7-8v5h-7V3h7z" stroke="currentColor" fill='currentColor' />
        </svg>);
}

export function GmailIcon() {
    return (
        <svg
            viewBox="0 0 192 192"
            fill="rgba(0, 0, 0, 0)"
            className={`${styles.svg} ml-2 mr-2`}
        >
            <path stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="12"
                d="M22 57.265V142c0 5.523 4.477 10 10 10h24V95.056l40 30.278 40-30.278V152h24c5.523 0 10-4.477 10-10V57.265c0-13.233-15.15-20.746-25.684-12.736L96 81.265 47.684 44.53C37.15 36.519 22 44.032 22 57.265Z" />
        </svg>);
}

type SocialGroupProps = {
    socialList: string[],
    linkList?: string[]
};

export default function SocialGroup({ socialList, linkList }: SocialGroupProps) {
    type IconMap = {
        [key: string]: React.ComponentType
    };

    const iconMap: IconMap = {
        instagram: InstagramIcon,
        unsplash: UnsplashIcon,
        gmail: GmailIcon,
        github: UnsplashIcon,
        linkedin: InstagramIcon
    };
    return (
        <>
            <section className={`flex items-center justify-evenly flex items-center justify-center font-sans mt-2`}>
                {socialList?.map((s, i) => {
                    const Icon = iconMap[s];
                    const link = linkList && linkList[i] ? linkList[i] : s;
                    return (<a key={`${SocialMediaItems[s].id}`}
                        href={`${SocialMediaItems[s].email ? 'mailto:' : ''}${SocialMediaItems[link].link}`}><Icon /></a>);
                })}
            </section>
        </>
    );
}