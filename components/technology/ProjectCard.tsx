import Image from "next/image";
import Link from "next/link";
import styles from './Component.module.css';

type ProjectCardProps = {
    imageSrc: string;
    imageAlt: string;
    description: string;
    href: string;
};


export default function ProjectCard({
    imageSrc,
    imageAlt,
    description,
    href,
}: ProjectCardProps) {

    return (
        <div className={`border border-gray-200 shadow-sm ${styles.intro_text3}`}>
            <div className="relative h-48 w-full">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 384px"
                />
            </div>

            <div className="p-4 space-y-2">
                <p className="text-sm text-white-600">{description}</p>

                <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                    Github repository
                </Link>
            </div>
        </div>
    );
}