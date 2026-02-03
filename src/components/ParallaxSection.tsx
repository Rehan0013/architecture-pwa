'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxSectionProps {
    id?: string;
    imageUrl: string;
    imageAlt: string;
    overlayOpacity?: number;
    children?: React.ReactNode;
    heightClass?: string;
    speed?: number;
}

export default function ParallaxSection({
    id,
    imageUrl,
    imageAlt,
    overlayOpacity = 0.4,
    children,
    heightClass = "h-screen",
    speed = 0.5
}: ParallaxSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${50 * speed}%`]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]); // Subtle zoom
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]); // Fade out slightly
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Parallax text

    return (
        <section id={id} ref={ref} className={`relative flex items-center justify-center overflow-hidden ${heightClass}`}>
            <motion.div
                style={{ y, scale, opacity }}
                className="absolute inset-0 z-0 h-[120%]" // Taller than container
                suppressHydrationWarning
            >
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority={true}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>
            </motion.div>

            <motion.div
                style={{ y: contentY }}
                className="relative z-10 w-full px-6"
            >
                {children}
            </motion.div>
        </section>
    );
}
