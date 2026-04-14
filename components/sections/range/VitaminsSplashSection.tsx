"use client";

import React from "react";

interface VitaminsSplashSectionProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
}

export default function VitaminsSplashSection({
  imageUrl = "/honey.svg",
  title = "Vitamins on the go, tablet free and hassle-free.",
  subtitle = "Rooted in principles of trust and elegance, we prioritise sustainability, inclusivity, and enhancing your daily well-being."
}: VitaminsSplashSectionProps) {
  // If explicitly passed empty strings to override default, handle gracefully.
  const displayTitle = title || "Vitamins on the go, tablet free and hassle-free.";
  const displaySubtitle = subtitle || "Rooted in principles of trust and elegance, we prioritise sustainability, inclusivity, and enhancing your daily well-being.";
  const displayImage = imageUrl || "/honey.svg";

  return (
    <section className="w-full h-auto md:h-[559px] rounded-[16px] overflow-hidden flex flex-col md:flex-row bg-white shadow-sm mt-[30px]">
      {/* Left side Image */}
      <div className="w-full md:w-1/2 h-[350px] md:h-full overflow-hidden">
        <img 
          src={displayImage} 
          alt={displayTitle} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side content */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-[30px] md:px-[60px] py-[40px] md:py-0">
        <h2 className="text-[#1a1a1a] text-[32px] md:text-[36px] font-['Satoshi:Bold',sans-serif] leading-[1.15] tracking-[-1px] max-w-[450px]">
          {displayTitle}
        </h2>
        <p className="mt-6 text-[#1a1a1a]/70 text-[18px] md:text-[22px] font-['Satoshi:Medium',sans-serif] leading-relaxed max-w-[440px]">
          {displaySubtitle}
        </p>
      </div>
    </section>
  );
}
