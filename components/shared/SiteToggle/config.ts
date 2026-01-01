import { ButtonItem } from '@/components/shared/ButtonGroup/types';

export const ButtonItems: ButtonItem[] = [
    {
        name: 'photography',
        link: '',
        default: true,
        imgLink: '/images/profile/DSC_07402.jpg',
        subHeader: 'Visual Philosophy',
        socialList: ['instagram', 'unsplash', 'gmail'],
        cssClass: 'photographyText'
    },
    {
        name: 'technology',
        link: '',
        imgLink: '/images/profile/DSC_08401.jpg',
        subHeader: 'There is nothing we can\'t do',
        socialList: ['github', 'linkedin', 'gmail'],
        cssClass: 'technologyText'
    }
];