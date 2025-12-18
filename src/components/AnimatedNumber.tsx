import React, { useEffect, useRef } from 'react';

interface AnimatedNumberProps {
    value: number;
    className?: string;
    style?: React.CSSProperties;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className, style }) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!hasAnimated.current && value !== 0) {
            hasAnimated.current = true;
        }

        const duration = 1000;
        const steps = 30;
        const increment = value / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;

            if (step >= steps) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <span className={`${className} animate-count`} style={style}>
            {displayValue}
        </span>
    );
};
