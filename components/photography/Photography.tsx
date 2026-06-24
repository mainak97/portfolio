"use client";

import { useEffect, useRef, useState } from "react";
import ButtonGroup from "../shared/ButtonGroup/ButtonGroup";
import { ButtonItems, Sections } from "./config";
import { ButtonItem } from "../shared/ButtonGroup/types";
import Image from "next/image";
import { Img, Section } from "./types";
import styles from './Component.module.css';
import Spinner from "../shared/Spinner/Spinner";
import { AboutPic } from "./config";

export default function Photography() {
    const [buttonItems, setButtonItems] = useState<ButtonItem[]>(ButtonItems.map(item => ({ ...item, active: item.default ? true : false })));
    const [active, setActive] = useState<string | undefined>(ButtonItems.find(item => item.default)?.name);
    const [images, setImages] = useState<Img[]>([]);
    const [activeImg, setActiveImg] = useState<number | null>(null);
    const [origin, setOrigin] = useState<string>("top left");
    const [loading, setLoading] = useState<boolean>(false);
    const [sections, setSections] = useState<Section[]>([{
        id: 'contents',
        label: 'contents',
        show: true
    }].concat(Sections.map((s) => ({ ...s, show: true }))));
    const [show, hide] = ['|', '/'];
    const gallerySection = useRef<HTMLDivElement | null>(null);
    const gallery = useRef<HTMLDivElement | null>(null);
    const galleryCateg = useRef<HTMLDivElement | null>(null);
    const galleryHeading = useRef<HTMLDivElement | null>(null);
    const spinner = useRef<HTMLDivElement | null>(null);
    const aboutSection = useRef<HTMLDivElement | null>(null);
    const about = useRef<HTMLDivElement | null>(null);
    const aboutHeading = useRef<HTMLDivElement | null>(null);
    const faqSection = useRef<HTMLDivElement | null>(null);
    const faq = useRef<HTMLDivElement | null>(null);
    const faqHeading = useRef<HTMLDivElement | null>(null);

    const updateActive = (name: string) => {
        setButtonItems((prev) => prev.map((item) => ({ ...item, active: item.name === name ? true : false })));
        setActive(() => name);
        setActiveImg(null);
    };

    const onCategClickHandler = (button: ButtonItem) => {
        updateActive(button.name);
    };

    const onImgClickHandler = (index: number, el: HTMLDivElement) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const vw = window.innerWidth;
        if (vw >= 900) {
            setOrigin(centerX < vw * 0.25 ? "top left" :
                centerX < vw * 0.75 ? "top center" :
                    "top right"
            );
        } else {
            setOrigin(centerX < vw * 0.5 ? "top left" :
                "top right"
            );
        }
        setActiveImg(activeImg === index ? null : index);
    };

    const updateImgLoading = (index: number) => {
        setImages((prev) => {
            return prev.map((img, i) => i === index ? img : { ...img, loading: false })
        });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`/api/images?folder=${encodeURIComponent(active ? active : '')}`)
            .then((res) => {
                setLoading(false);
                return res.json();
            })
            .then((data: Img[]) => setImages(data.map(d => ({ ...d, loading: true }))));
    }, [active]);


    useEffect(() => {
        if (!gallery.current || !gallerySection.current ||
            !galleryHeading.current || !galleryCateg.current) return;
        const sync = () => {
            if (!gallery.current || !gallerySection.current ||
                !galleryHeading.current || !galleryCateg.current) return;
            if (sections[1].show && !loading) {
                const h1 = galleryHeading.current!.getBoundingClientRect().height;
                const h2 = galleryCateg.current!.getBoundingClientRect().height;
                const h3 = gallery.current!.getBoundingClientRect().height;
                gallerySection.current!.style.height = `${h1 + h2 + h3}px`;
                gallery.current!.style.display = 'block';
            } else if (sections[1].show && loading) {
                const h1 = galleryHeading.current!.getBoundingClientRect().height;
                const h2 = galleryCateg.current!.getBoundingClientRect().height;
                const h3 = spinner.current!.getBoundingClientRect().height;
                gallerySection.current!.style.height = `${h1 + h2 + h3}px`;
            } else {
                setTimeout(() => {
                    gallerySection.current!.style.height = 'auto';
                    gallery.current!.style.display = 'none';
                    aboutSection.current!.style.minHeight = `${gallerySection.current!.getBoundingClientRect().height}px`;
                }, 500);
            }
        };

        sync();

        const ro = new ResizeObserver(sync);
        ro.observe(gallery.current);

        return () => ro.disconnect();
    }, [loading, sections[1].show]);

    useEffect(() => {
        if (!about.current || !aboutHeading.current || !aboutSection.current) return;
        const sync = () => {
            if (!about.current || !aboutSection.current ||
                !aboutHeading.current) return;
            if (sections[2].show) {
                const h1 = aboutHeading.current!.getBoundingClientRect().height;
                const h2 = about.current!.getBoundingClientRect().height;
                aboutSection.current!.style.height = `${h1 + h2}px`;
                about.current!.style.display = 'flex';
            } else {
                setTimeout(() => {
                    aboutSection.current!.style.height = 'auto';
                    about.current!.style.display = 'none';
                }, 500);
            }
        };

        sync();

        const ro = new ResizeObserver(sync);
        ro.observe(about.current);

        return () => ro.disconnect();
    }, [sections[2].show]);

    useEffect(() => {
        if (!faq.current || !faqHeading.current || !faqSection.current) return;
        const sync = () => {
            if (!faq.current || !faqSection.current ||
                !faqHeading.current) return;
            if (sections[3].show) {
                const h1 = faqHeading.current!.getBoundingClientRect().height;
                const h2 = faq.current!.getBoundingClientRect().height;
                faqSection.current!.style.height = `${h1 + h2}px`;
                faq.current!.style.display = 'block';
            } else {
                setTimeout(() => {
                    faqSection.current!.style.height = 'auto';
                    faq.current!.style.display = 'none';
                }, 1000);
            }
        };

        sync();

        const ro = new ResizeObserver(sync);
        ro.observe(faq.current);

        return () => ro.disconnect();
    }, [sections[3].show]);


    const scrollTo = (button: ButtonItem) => {
        const el = document.getElementById(button.id ? button.id : '');
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const onClickSection = (index: number) => {
        setSections((prev) => prev.map((s, i) => ({ ...s, show: i === index ? !s.show : s.show })))
    };

    return (
        <div className={`${styles.photographyText}`}>
            <div className={`flex items-center justify-evenly flex items-center justify-center font-sans`}>
                <span>
                    <span className={styles.sectionHeaderDivider}>{`${sections[0].show ? show : hide}`}</span>
                    <button className={`${styles.sectionHeader}`} onClick={() => onClickSection(0)}>{`${sections[0].label}`}</button>
                    <span className={styles.sectionHeaderDivider}>{`${sections[0].show ? show : hide}`}</span>
                </span>
            </div>
            <div className={`${styles.sectionHeaderContainer} ${sections[0].show ? styles.show : styles.hide}`}>
                <ButtonGroup buttonList={sections.slice(1).map(section => ({ id: section.id, name: section.label }))} onClickHandler={scrollTo} />
            </div>
            <section ref={gallerySection} id={sections[1].id} title={sections[1].label} className={`${sections[1].show ? 'mb-10' : ''}`}>
                <div ref={galleryHeading} className={`flex items-center justify-evenly flex items-center justify-center font-sans`}>
                    <span><span className={styles.sectionHeaderDivider}>{`${sections[1].show ? show : hide}`}</span>
                        <button className={`${styles.sectionHeader}`} onClick={() => onClickSection(1)}>{`${sections[1].label}`}</button>
                        <span className={styles.sectionHeaderDivider}>{`${sections[1].show ? show : hide}`}</span></span>
                </div>
                <div ref={galleryCateg} className={`${styles.sectionHeaderContainer} ${sections[1].show ? styles.show : styles.hide}`}>
                    <ButtonGroup buttonList={buttonItems} onClickHandler={onCategClickHandler} />
                    {
                        loading ? <div ref={spinner}><Spinner /></div> : (<div ref={gallery} className={`${styles.masonry} ${activeImg !== null ? styles.blurLayer : ""}`}>
                            {images.map((img, i) => {
                                return (<div key={img.filename} className={`${styles.item}`}
                                    onClick={(e) => !img.loading ? onImgClickHandler(i, e.currentTarget) : ""}>
                                    <div className={`${styles.inner} ${activeImg === i ? styles.active : ""}`}
                                        style={{ transformOrigin: origin }}>
                                        <Image src={img.filename} alt="" width={img.width} height={img.height} loading="eager"
                                            onLoad={() => updateImgLoading(i)}
                                        />
                                        <span className={styles.imgCaption}>{img.caption}</span>
                                    </div>
                                </div>);
                            })}
                        </div>)
                    }
                </div>
            </section>
            <section ref={aboutSection} id={sections[2].id} title={sections[2].label}>
                <div ref={aboutHeading} className={`flex items-center justify-evenly flex items-center justify-center font-sans`}>
                    <span>
                        <span className={styles.sectionHeaderDivider}>{`${sections[2].show ? show : hide}`}</span>
                        <button className={`${styles.sectionHeader}`} onClick={() => onClickSection(2)}>{`${sections[2].label}`}</button>
                        <span className={styles.sectionHeaderDivider}>{`${sections[2].show ? show : hide}`}</span>
                    </span>
                </div>
                <div className={`${styles.sectionHeaderContainer} ${sections[2].show ? styles.show : styles.hide}`}>
                    <div ref={about} className="flex max-[900px]:flex-col w-full mt-5 pb-5">
                        <div className="basis-[30%]">
                            <Image src={AboutPic} alt='' width='5000' height='5000' loading="eager" className="rounded-full object-cover p-5" />
                        </div>
                        <div className={`p-5 ${styles.aboutPhotographyText} basis-[67%]`}>
                            <p>
                                Hi, I’m Mainak, a visual artist based in Kolkata, West Bengal, India.
                                I started photography on my phone in 2015, and I got my first camera in 2016.
                                Since then, I have taken tens of thousands of pictures, edited a few thousand of them,
                                and considered those worthy of sharing with the world.
                                Every image you see is a composite of two or more photographs I have taken over the years.
                                I enjoy combining, editing, and experimenting with my own images.
                            </p>
                            <br />
                            <p>
                                My style is what it is because I am rarely satisfied with a photograph as it is.
                                Making composites is my way of improving the original image.
                                It is my way of dreaming and capturing otherworldly sights while being grounded in reality.
                                I am incredibly grateful to have had opportunities to travel and witness remarkable places in real life,
                                but those moments are rare. What I create is my way of dreaming during ordinary days.
                            </p>
                            <br />
                            <p>
                                Recently, I have begun experimenting with video as well.
                                I do not think I am nearly as proficient with video as I am with still images,
                                but I want to learn and improve.
                                I want to keep experimenting, and I want to keep creating.
                            </p>
                            <br />
                            <p>
                                My goal is always to create work that my past self could never have imagined.
                                I want to look back at my work and see how it has changed over the years,
                                and through that, how I have changed as well.
                                I am not the same person I was yesterday, and I could not have imagined the ways I would change.
                                In the same way, I do not want my work to remain unchanged.
                            </p>
                            <br />
                            <p>
                                Thank you for visiting my site! And thank you if you read all this! I hope you have a great day!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section ref={faqSection} id={sections[3].id} title={sections[3].label}>
                <div ref={faqHeading} className={`flex items-center justify-evenly flex items-center justify-center font-sans`}>
                    <span>
                        <span className={styles.sectionHeaderDivider}>{`${sections[3].show ? show : hide}`}</span>
                        <button className={`${styles.sectionHeader}`} onClick={() => onClickSection(3)}>{`${sections[3].label}`}</button>
                        <span className={styles.sectionHeaderDivider}>{`${sections[3].show ? show : hide}`}</span>
                    </span>
                </div>
                <div className={`${styles.sectionHeaderContainer} ${sections[3].show ? styles.show : styles.hide}`}>
                    <div ref={faq}>
                        <dl className={`text-center mt-5 pb-5 ${styles.questionContainer}`}>
                            <dt>What camera do you use?</dt>
                            <dd>I used a Nikon d5200 from 2016 to 2025. Right now, I also use a Nikon Zf.</dd>
                            <dt>What software do you use to edit your pictures?</dt>
                            <dd>Photoshop CS6. What I do does not require any latest features from photoshop. And CS6 and even older versions are more than enough.</dd>
                            <dt>How do you make your digital photos look like film?</dt>
                            <dd>There is photoshop plugin suite created by Google that I use called Nik Collection.
                                In particular, I use Analog Efex Pro 2, Color Efex Pro 4 and for B&W images, Silver Efex Pro 2.</dd>
                            <dt>Do you work with other people?</dt>
                            <dd>I like working with my friends only.
                                I do this for fun at the end of the day, and I don't want to consider this as work by working with clients.
                                Maybe one day, that'll change.</dd>
                            <dt>What are some of your favorite places that you've visited?</dt>
                            <dd>Some of my favorites in no particular order would be Singapore, Kuala Lumpur,
                                Kashmir, Darjeeling, Agra, Mumbai, Goa. Wish to visit loads of more places and capture them soon!</dd>
                            <dt>Would you consider letting other people use your work for their own purpose?</dt>
                            <dd>Yes, I give away all my work for free and I have done so on multiple occasions and will continue to do so.</dd>
                        </dl>
                    </div>
                </div>
            </section>
        </div>
    );
}