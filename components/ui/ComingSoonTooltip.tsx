"use client";

import { useState } from "react";

interface ComingSoonTooltipProps {
    children: React.ReactNode;
    className?: string;
}

export default function ComingSoonTooltip({
    children,
    className = "",
}: ComingSoonTooltipProps) {
    const [visible, setVisible] = useState(false);

    return (
        <span
            className={`relative cursor-not-allowed select-none ${className}`}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <span
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-[8px] bg-[#1a1a1a] px-3 py-1.5 text-[12px] font-medium text-white shadow-lg pointer-events-none z-50"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                    Coming Soon
                    {/* arrow */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1a]" />
                </span>
            )}
        </span>
    );
}
