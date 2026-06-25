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
                    <ButtonGroup buttonList={buttonItems} onClickHandler={onCategClickHandler} style={{
                        transform: `translateX(-10%)`
                    }} />
                    {
                        loading ? <div ref={spinner}><Spinner /></div> : (<div ref={gallery} className={`${styles.masonry} ${activeImg !== null ? styles.blurLayer : ""}`}>
                            {images.map((img, i) => {
                                return (<div key={img.filename} className={`${styles.item}`}
                                    onClick={(e) => !img.loading ? onImgClickHandler(i, e.currentTarget) : ""}>
                                    <div className={`${styles.inner} ${activeImg === i ? styles.active : ""}`}
                                        style={{ transformOrigin: origin }}>
                                        <Image src={img.filename} alt="" width={img.width} height={img.height} loading="eager"
                                            onLoad={() => updateImgLoading(i)} className="mb-1"
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
                                Hi, I’m Mainak, a visual artist from Kolkata, India.
                                My journey with photography began in 2015 with a phone camera and curiosity.
                                A year later, I picked up my first camera, and since then I’ve captured tens of thousands of images.
                                Only a fraction of them make it here. Every piece on this site is built from two or more photographs taken across different places, moments, and years, carefully combined into a single image.
                                I’m drawn to the process of blending reality with imagination, reshaping familiar scenes into something that feels both believable and impossible.
                            </p>
                            <br />
                            <p>
                                I’ve rarely been interested in photography as pure documentation.
                                A photograph, for me, is often the beginning rather than the destination.
                                Through compositing, editing, and experimentation, I can push an image beyond what was originally in front of the lens.
                                It allows me to create landscapes that never existed, skies that never appeared, and moments that belong somewhere between memory and dream.
                            </p>
                            <br />
                            <p>
                                Travel has given me the privilege of witnessing extraordinary places firsthand, but those experiences are fleeting.
                                The images I create are a way of extending that sense of wonder into everyday life, a way of continuing to explore even when standing still.
                            </p>
                            <br />
                            <p>
                                Lately, I’ve started venturing into video.
                                It feels like learning a new language: unfamiliar, challenging, and exciting.
                                I’m nowhere near as comfortable with motion as I am with still images, but that uncertainty is part of the appeal.
                                Growth has always come from experimentation, and I intend to keep experimenting.
                            </p>
                            <br />
                            <p>
                                My goal has never been perfection.
                                It has been transformation.
                                I want to create work that would surprise the version of myself who started this journey years ago.
                                When I look back through old images, I see more than changing techniques.
                                I see changing perspectives, changing ambitions, and a changing person.
                                Just as I continue to evolve, I want my work to evolve with me.
                            </p>
                            <br />
                            <p>
                                Thank you for visiting. I hope you find something here that makes you pause, wonder, or imagine.
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