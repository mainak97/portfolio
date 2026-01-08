import { ButtonItem } from '@/components/shared/ButtonGroup/types';
import { Section } from './types';

export const ButtonItems: ButtonItem[] = [
    {
        name: 'life',
        link: '',
        default: true
    },
    {
        name: 'abstract',
        link: ''
    },
    {
        name: 'b&w',
        link: ''
    },
    {
        name: 'concerts',
        link: ''
    }
];

export const Sections: Section[] = [
    {
        id: "gallery",
        label: "gallery"
    },
    {
        id: "about",
        label: "about"
    },
    {
        id: "faq",
        label: "answers"
    }
];

export const AboutPic: string = '/images/profile/DSC_00151.webp';