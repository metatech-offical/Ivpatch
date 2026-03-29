"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slides = [
    {
      image: "/hero-1.svg",
      headline: "Elevate\nYour Skin",
      description: "An elite marine collagen formula designed to firm, plump, and revive, delivering transformative results.",
      layout: "product-focus",
    },
    {
      image: "/hero-2.svg",
      headline: "Care That\nFits Life",
      description: "Empower your journey to optimal health,\none patch at a time.",
      layout: "lifestyle",
    },
    {
      image: "/hero-3.svg",
      headline: "Find Your\nFormula",
      description: "Explore our complete range of\nperformance-driven patches, crafted to\nsupport your unique journey.",
      layout: "range-focus",
    },
  ];

  const displaySlides = [...slides, slides[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentImageIndex === slides.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentImageIndex(0);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentImageIndex, slides.length]);

  const activeSlideIndex = currentImageIndex % slides.length;

  return (
    <div
      className="h-[400px] sm:h-[500px] md:h-[731px] overflow-hidden relative rounded-[16px] shrink-0 w-full max-w-[1252px]"
      data-name="Hero Slider"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-content {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Main Sliding Container */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          className={`flex w-full h-full ${isTransitioning ? "transition-transform duration-1000 cubic-bezier(0.65, 0, 0.35, 1)" : ""
            }`}
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {displaySlides.map((slide, index) => (
            <div key={index} className="w-full h-full shrink-0 relative overflow-hidden">
              <img
                alt={`Hero slide ${index}`}
                className="w-full h-full object-cover object-center pointer-events-none"
                src={slide.image}
              />
              <div className="absolute inset-0 bg-black/10 md:bg-black/5 pointer-events-none" />

              {/* Layout Content */}
              <div className="absolute inset-0 flex items-center z-10 px-6 md:px-0">
                {slide.layout === "product-focus" && (
                  <div className="w-full flex justify-center md:justify-end md:pr-[120px] pt-10 md:pt-[80px]">
                    <div className={`flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-[24px] max-w-[500px] ${activeSlideIndex === (index % slides.length) ? "animate-content" : "opacity-0"}`}>
                      <div className="flex flex-col gap-4 md:gap-[16px]">
                        <h5 className="font-['Satoshi:Bold',sans-serif] font-bold leading-[1.1] text-[48px] sm:text-[52px] md:text-[60px] text-white tracking-[-0.02em] whitespace-pre-line">
                          {slide.headline}
                        </h5>
                        <p className="font-['Satoshi:Regular',sans-serif] text-[18px] md:text-[22px] leading-[1.3] text-[#CCCCCC] tracking-[0.01em] max-w-[440px]">
                          {slide.description}
                        </p>
                      </div>
            <Link href="/range" className="inline-flex items-center justify-center w-[147px] h-[52px] rounded-[8px] cursor-pointer transition-all duration-300 hover:opacity-80 active:scale-95 bg-[#A2845E]/30 backdrop-blur-md border border-white/15">
              <span className="text-[20px] md:text-[24px] font-bold text-white tracking-[0.02em] whitespace-nowrap">
                Buy Now
              </span>
            </Link>
          </div>
        </div>
      )}

      {slide.layout === "lifestyle" && (
        <div className="w-full h-full relative flex flex-col items-center md:block">
          <div className="absolute left-6 md:left-[80px] top-[40%] md:top-[45%] -translate-y-1/2 flex flex-col gap-5 md:gap-[32px] max-w-full md:max-w-[500px] text-center md:text-left w-full pr-12 md:pr-0">
            <div className={`flex flex-col gap-3 md:gap-[16px] ${activeSlideIndex === (index % slides.length) ? "animate-content" : "opacity-0"}`}>
              <h5 className="font-['Satoshi:Bold',sans-serif] font-bold leading-[1.1] text-[48px] sm:text-[54px] md:text-[60px] text-white tracking-[-0.01em] whitespace-pre-line">
                {slide.headline}
              </h5>
              <p className="font-['Satoshi:Regular',sans-serif] text-[18px] md:text-[22px] leading-[1.3] text-[#CCCCCC] tracking-[0.01em] max-w-[400px] mx-auto md:mx-0">
                {slide.description}
              </p>
            </div>
            <div className={`${activeSlideIndex === (index % slides.length) ? "animate-content" : "opacity-0"}`}>
              <Link href="/range" className="inline-flex items-center justify-center w-[147px] h-[52px] rounded-[8px] cursor-pointer transition-all duration-300 hover:opacity-90 active:scale-95 bg-[#A2845E]/30 backdrop-blur-md border border-white/15">
                <span className="text-[20px] md:text-[24px] font-bold text-white tracking-[0.02em] whitespace-nowrap">
                  Buy Now
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {slide.layout === "range-focus" && (
        <div className="w-full flex justify-center md:justify-start md:pl-[100px]">
          <div className={`flex flex-col items-center md:items-start text-center md:text-left gap-8 md:gap-[32px] max-w-[550px] ${activeSlideIndex === (index % slides.length) ? "animate-content" : "opacity-0"}`}>
            <div className="flex flex-col gap-5 md:gap-[20px]">
              <h5 className="font-['Satoshi:Bold',sans-serif] font-bold leading-[1.1] text-[48px] sm:text-[54px] md:text-[60px] text-[#1a1a1a] tracking-[-0.02em] whitespace-pre-line">
                {slide.headline}
              </h5>
              <p className="font-['Satoshi:Regular',sans-serif] text-[18px] md:text-[22px] leading-[1.3] text-[#1A1A1A] tracking-[0.01em] max-w-[480px]">
                {slide.description}
              </p>
            </div>
            <Link href="/range" className="inline-flex items-center justify-center w-[225px] h-[52px] rounded-[8px] cursor-pointer transition-all duration-300 hover:opacity-80 active:scale-95 bg-[#DCDAD8]/50 backdrop-blur-md border border-black/5">
              <span className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] tracking-[0.02em] whitespace-nowrap">
                View the Range
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>

            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-8 md:bottom-[40px] left-1/2 -translate-x-1/2 flex gap-[12px] z-20">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-[4px] rounded-full transition-all duration-300 ${activeSlideIndex === idx ? "w-[24px] bg-white" : "w-[8px] bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
