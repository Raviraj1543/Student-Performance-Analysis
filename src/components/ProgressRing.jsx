import { useEffect, useState } from 'react';
import './ProgressRing.css';

export default function ProgressRing({ value, size = 100, strokeWidth = 8, color = '#6366F1', label }) {
    const [offset, setOffset] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const timer = setTimeout(() => {
            setOffset(circumference - (value / 100) * circumference);
        }, 100);
        return () => clearTimeout(timer);
    }, [value, circumference]);

    return (
        <div className="progress-ring-container">
            <svg className="progress-ring-svg" width={size} height={size}>
                <circle
                    className="progress-ring-bg"
                    cx={size / 2} cy={size / 2} r={radius}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="progress-ring-fg"
                    cx={size / 2} cy={size / 2} r={radius}
                    strokeWidth={strokeWidth}
                    stroke={color}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
                <text className="progress-ring-text" x={size / 2} y={size / 2}>
                    {value}%
                </text>
            </svg>
            {label && <span className="progress-ring-label">{label}</span>}
        </div>
    );
}
