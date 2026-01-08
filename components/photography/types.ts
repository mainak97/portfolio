export type Img = {
    filename: string,
    width: number,
    height: number,
    caption: string,
    loading?: boolean
};

export type Section = {
    id: string,
    label: string,
    show?: boolean
};