'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export default function Reveal({
    children,
    width = "fit-content",
    delay = 0.25,
    direction = "up"
}: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const getVariants = (): { hidden: Variant; visible: Variant } => {
        const distance = 75;

        switch (direction) {
            case "up": return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
            case "down": return { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } };
            case "left": return { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } };
            case "right": return { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } };
            default: return { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } };
        }
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }} // Custom smooth ease
                suppressHydrationWarning
            >
                {children}
            </motion.div>
        </div>
    );
}
