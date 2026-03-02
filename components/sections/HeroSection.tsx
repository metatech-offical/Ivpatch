"use client";
import { useState, useEffect } from "react";
import ComingSoonTooltip from "../ui/ComingSoonTooltip";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const carouselImages = [
    "/hero-1.svg",
    "/hero-2.svg",
    "/hero-3.svg",
  ];

  // Append the first image to the end to create a seamless loop effect
  const displayImages = [...carouselImages, carouselImages[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentImageIndex === carouselImages.length) {
      // Once it reaches the cloned first slide, wait for the transition to finish
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Disable animation
        setCurrentImageIndex(0);   // Instantly snap back to the actual first slide
      }, 1000); // 1000ms = duration of the CSS transition
      return () => clearTimeout(timeout);
    }
  }, [currentImageIndex, carouselImages.length]);

  return (
    <div
      className="h-[731px] overflow-hidden relative rounded-[16px] shrink-0 w-full max-w-[1252px]"
      data-name="Neuro boost"
      data-node-id="449:185"
    >
      {/* Full Width Background Image Slider */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          className={`flex w-full h-full ${isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
            }`}
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {displayImages.map((src, index) => (
            <img
              key={index}
              alt={`Hero slide ${index}`}
              className="w-full h-full object-cover shrink-0 pointer-events-none"
              src={src}
            />
          ))}
        </div>
        {/* Optional overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Hero Text */}
      <div
        className="absolute flex flex-col gap-[20px] items-start left-[96px] top-[246px] w-[450px] z-10"
        data-node-id="449:191"
      >
        <div className="flex flex-col gap-[16px]">
          <h5
            className="font-['Satoshi:Bold',sans-serif] leading-none text-[60px] text-white tracking-[-1.2px]"
            data-node-id="449:192"
          >
            Care That Fits Life
          </h5>
          <p className="font-['Satoshi:Regular',sans-serif] text-[22px] leading-[1.4] text-[#e5e5e5] tracking-[0.22px]">
            Empower your journey to optimal health, one patch at a time.
          </p>
        </div>
        <ComingSoonTooltip>
          <a
            href="/range"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center justify-center px-[32px] py-[14px] rounded-[10px] cursor-pointer mt-[16px] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-white relative z-10"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span
              className="text-[18px] tracking-[0.36px] whitespace-nowrap"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, color: "#1a1a1a" }}
            >
              Buy Now
            </span>
          </a>
        </ComingSoonTooltip>
      </div>
    </div>
  );
}
