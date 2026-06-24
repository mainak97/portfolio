import { ButtonItem } from '@/components/shared/ButtonGroup/types';

export const ButtonItems: ButtonItem[] = [
    {
        name: 'photography',
        link: '',
        default: true,
        imgLink: '/images/profile/White.webp',
        subHeader: 'Visual Philosophy',
        socialList: ['instagram', 'unsplash', 'gmail'],
        cssClass: 'photographyText'
    },
    {
        name: 'technology',
        link: '',
        imgLink: '/images/profile/Black.webp',
        subHeader: 'Full Stack Developer',
        socialList: ['github', 'linkedin', 'gmail'],
        cssClass: 'technologyText'
    }
];