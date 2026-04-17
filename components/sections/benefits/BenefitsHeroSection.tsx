"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function BenefitsHeroSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <section
      className="bg-[#425142] md:bg-[#366436] md:bg-gradient-to-b md:from-[#425a42] md:via-[#2d402d] md:to-[#0c140c] min-h-[600px] md:h-[731px] overflow-hidden relative rounded-[16px] w-full max-w-[1252px]"
      data-name="Benefits hero"
    >
      {/* Mobile Background Gradient Overlay */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none z-0" />

      {/* Background Image - Desktop only */}
      <div className="hidden md:block absolute inset-0 z-0">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="/benefits-bg.svg"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-full">
        {/* Text Content */}
        <div className="md:w-[40%] flex flex-col justify-center px-6 md:px-[70px] py-16 md:py-0 gap-4 md:gap-[20px] text-center md:text-left">
          <h1 className="font-['Satoshi:Bold',sans-serif] text-[40px] md:text-[60px] text-white leading-tight tracking-[-1.2px]">
            Feel The <br className="hidden md:block" />
            Difference
          </h1>
          <div className="font-['Satoshi:Regular',sans-serif] text-[14px] md:text-[22px] text-white/90 leading-relaxed md:tracking-[0.22px] max-w-[280px] md:max-w-none mx-auto md:mx-0">
            <p>Discover the next level of wellness with our premium transdermal patches.</p>
          </div>
          <div className="flex justify-center md:justify-start mt-2">
            <Link href="/range" className="bg-white px-6 md:px-8 py-2 md:py-3 rounded-[12px] md:rounded-[16px] shadow-xl hover:bg-white/90 transition-all active:scale-95 inline-block">
              <span className="font-['Satoshi:Bold',sans-serif] text-[16px] md:text-[24px] text-black tracking-[0.48px] whitespace-nowrap">
                Get the Patch
              </span>
            </Link>
          </div>
        </div>

        {/* Comparison Section - Full Height & Blended on Mobile */}
        <div className="md:w-[60%] flex-1 min-h-[450px] md:h-full relative overflow-hidden mt-4 md:mt-0">
          {/* Top Blend Gradient Overlay for Mobile */}
          <div className="md:hidden absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#425142] to-transparent z-10" />

          <div
            ref={containerRef}
            className="absolute inset-0 cursor-ew-resize group select-none"
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onMouseDown={onMouseDown}
          >
            {/* After Image (Base) */}
            <img
              src="/comparison-2.png"
              alt="After"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none md:object-center object-top"
            />

            {/* Before Image (Clip) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src="/comparison-1.png"
                alt="Before"
                className="w-full h-full object-cover md:object-center object-top"
              />
            </div>

            {/* Slider Handle Line */}
            <div
              className="absolute inset-y-0 z-20 transition-transform"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 -left-[2px] w-[4px] bg-white/60 backdrop-blur-sm shadow-[0_0_25px_rgba(255,255,255,0.9)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src="/slider.svg" alt="Slider" className="w-10 h-10 md:w-14 md:h-14 drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
