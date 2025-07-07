
import React from 'react';

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => {
    const day = new Date().getDate();

    return (
        <svg
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="128" height="128" rx="28" fill="#FFFFFF" />
            <rect width="128" height="40" rx="0" fill="#E53935" y="0" border-radius="28 28 0 0" />
            <text x="50%" y="28" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="bold">
                {new Date().toLocaleString('id-ID', { month: 'short' }).toUpperCase()}
            </text>
            <text x="50%" y="80" dominantBaseline="middle" textAnchor="middle" fill="#333333" fontSize="72" fontWeight="300">
                {day}
            </text>
        </svg>
    );
}

export default CalendarIcon;
