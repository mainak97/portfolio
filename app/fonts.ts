import { Major_Mono_Display, Agdasima, Tangerine, Merriweather, Audiowide, VT323, Monoton, Abril_Fatface, Newsreader } from "next/font/google";

export const photographyNameFont = Major_Mono_Display({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal"],
    variable: "--font-name-photography",
    display: "swap"
});

export const technologyNameFont = Audiowide({
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
});

export const technologySubHeaderFont = VT323({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal"],
    variable: "--font-sub-header-technology",
    display: "swap"
});

export const technologyF1 = Monoton({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal"],
    variable: "--font-technology-f1",
    display: "swap"
});

export const technologyF2 = Abril_Fatface({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal"],
    variable: "--font-technology-f2",
    display: "swap"
});

export const technologyF3 = Newsreader({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal"],
    variable: "--font-technology-f3",
    display: "swap"
});