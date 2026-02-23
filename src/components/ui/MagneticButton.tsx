import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number; // How strongly it pulls towards the mouse
}

export function MagneticButton({ children, className, onClick, strength = 30 }: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!buttonRef.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = buttonRef.current.getBoundingClientRect();

        // Calculate distance from center of button
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Move the button based on strength
        setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={buttonRef}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`cursor-pointer inline-flex ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
