"use client";

import React from "react";

export default function VitaminsSplashSection() {
  return (
    <section className="w-full h-auto md:h-[559px] rounded-[16px] overflow-hidden flex flex-col md:flex-row bg-white shadow-sm mt-[30px]">
      {/* Left side Image */}
      <div className="w-full md:w-1/2 h-[350px] md:h-full overflow-hidden">
        <img 
          src="/honey.svg" 
          alt="Natural Ingredients" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side content */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-[30px] md:px-[60px] py-[40px] md:py-0">
        <h2 className="text-[#1a1a1a] text-[32px] md:text-[36px] font-['Satoshi:Bold',sans-serif] leading-[1.15] tracking-[-1px] max-w-[450px]">
          Vitamins on the go, tablet free and hassle-free.
        </h2>
        <p className="mt-6 text-[#1a1a1a]/70 text-[18px] md:text-[22px] font-['Satoshi:Medium',sans-serif] leading-relaxed max-w-[440px]">
          Rooted in principles of trust and elegance, we prioritise sustainability, inclusivity, and enhancing your daily well-being.
        </p>
      </div>
    </section>
  );
}
