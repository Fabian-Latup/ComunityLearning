import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
}

export const FadeIn = ({
    children,
    className,
    delay = 0,
    direction = 'up',
    duration = 0.5,
}: FadeInProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const getDirectionOffset = () => {
        switch (direction) {
            case 'up':
                return { y: 20 };
            case 'down':
                return { y: -20 };
            case 'left':
                return { x: 20 };
            case 'right':
                return { x: -20 };
            case 'none':
                return { x: 0, y: 0 };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...getDirectionOffset(),
            }}
            animate={
                isInView
                    ? {
                        opacity: 1,
                        x: 0,
                        y: 0,
                    }
                    : {}
            }
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Apple-like ease out
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};
