import { Major_Mono_Display, Agdasima, Tangerine, Merriweather } from "next/font/google";

export const photographyNameFont = Major_Mono_Display({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal"],
    variable: "--font-name-photography",
    display: "swap"
});

export const technologyNameFont = Agdasima({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal"],
    variable: "--font-name-technology",
    display: "swap"
});

export const photographySubHeaderFont = Tangerine({
    subsets: ["latin"],
    weight: ["700"],
    style: ["normal"],
    variable: "--font-sub-header-photography",
    display: "swap"
});

export const aboutPhotographyText = Merriweather({
    subsets: ["latin"],
    weight: ["300"],
    style: ["normal"],
    variable: "--font-photography-about-text",
    display: "swap"
})