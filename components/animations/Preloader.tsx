"use client";
import React, { useState, useEffect } from "react";

const IMAGES_TO_PRELOAD = [
    "/hand-box.svg",
    "/lady.svg",
    "/benefits-bg.svg",
    "/benefits-add.svg",
    "/hand.svg",
    "/green.svg",
    "/red.svg",
    "/yellow.svg",
    "/brown.svg",
    "/lemon.svg",
    "/blue.svg",
    "/black.svg",
    "/soil.svg",
    "/hero-1.svg",
    "/hero-2.svg",
    "/hero-3.svg",
    "https://www.figma.com/api/mcp/asset/5ab95cff-f10b-4eff-989f-0a5e3bc2e130", // Logo
    "https://www.figma.com/api/mcp/asset/34cfc50e-814f-4f0c-a081-09a19855ca63", // Nutrition icons
    "https://www.figma.com/api/mcp/asset/156f63b8-eb6e-4ea0-941f-aa760b2e4727", // Wellness Banner
    "https://www.figma.com/api/mcp/asset/9b56e960-5b42-4831-804b-411c875415e4", // Model with patch
];

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const totalToLoad = IMAGES_TO_PRELOAD.length;

        // Minimum display time for the loader (e.g., 2 seconds)
        const startTime = Date.now();
        const MIN_LOAD_TIME = 2000;

        const updateProgress = () => {
            loadedCount++;
            const percent = Math.floor((loadedCount / totalToLoad) * 100);
            setProgress(percent);

            if (loadedCount === totalToLoad) {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, MIN_LOAD_TIME - elapsedTime);

                setTimeout(() => {
                    setIsLoaded(true);
                }, remainingTime);
            }
        };

        IMAGES_TO_PRELOAD.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = updateProgress;
            img.onerror = updateProgress; // Count as loaded even on error to avoid sticking
        });

        // Fallback timer in case some images fail to report
        const fallbackTimer = setTimeout(() => {
            setProgress(100);
            setIsLoaded(true);
        }, 5000);

        return () => clearTimeout(fallbackTimer);
    }, []);

    if (isLoaded) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f2f2f2] transition-opacity duration-700 ${progress === 100 && isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            <div className="relative w-[200px] mb-8">
                <img
                    src="https://www.figma.com/api/mcp/asset/5ab95cff-f10b-4eff-989f-0a5e3bc2e130"
                    alt="IVPATCH Logo"
                    className="w-full h-auto"
                />
            </div>

            <div className="w-[280px] h-[4px] bg-black/5 rounded-full overflow-hidden relative">
                <div
                    className="absolute top-0 left-0 h-full bg-[#366436] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="mt-4 font-['Satoshi:Medium',sans-serif] text-[18px] text-[#366436] tracking-widest">
                {progress}%
            </div>

            <div className="mt-2 font-['Satoshi:Regular',sans-serif] text-[12px] text-black/40 tracking-[2px] uppercase">
                Optimizing your wellness experience
            </div>
        </div>
    );
}
