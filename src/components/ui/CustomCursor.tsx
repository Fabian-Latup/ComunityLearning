import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            setIsVisible(true);

            const target = e.target as HTMLElement;
            const isClickable = target.closest('a') || target.closest('button') || window.getComputedStyle(target).cursor === 'pointer';
            setIsHovering(!!isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <style>{`
                * {
                    cursor: none !important;
                }
            `}</style>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] drop-shadow-[0_0_10px_rgba(0,113,227,0.8)]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 1 : 0
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 15 : 0,
                }}
                transition={{ duration: 0.2 }}
            >
                <img src="/assets/ai_cursor.png" alt="Cursor" className="w-full h-full object-contain filter drop-shadow-md" />
            </motion.div>
        </>
    );
}
