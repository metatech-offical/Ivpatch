"use client";

import Link from "next/link";
import { useState } from "react";

export default function RangeSection() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const products = [
    { name: "Collagen Formula", img: "/brown.svg", mobileImg: "/mobile-1.svg" },
    { name: "Muscle Fuel", img: "/red.svg", mobileImg: "/mobile-2.svg" },
    { name: "Energy Release", img: "/green.svg", mobileImg: "/mobile-3.svg" },
    { name: "Immunity", img: "/yellow.svg", mobileImg: "/mobile-4.svg" },
    { name: "ED", img: "/blue.svg", mobileImg: "/mobile-5.svg" },
    { name: "NMN-NAD+", img: "/black.svg", mobileImg: "/mobile-6.svg" },
    { name: "Neuro", img: "/lemon.svg", mobileImg: "/mobile-7.svg" },
  ];

  const handleCardClick = (index: number) => {
    setActiveCardIndex(prev => prev === index ? null : index);
  };

  const CardContent = ({ product, isActive, index }: { product: typeof products[0], isActive: boolean, index: number }) => (
    <div 
      className={`relative w-full h-full overflow-hidden rounded-[16px] group cursor-pointer ${isActive ? 'active-mobile' : ''}`}
      onClick={() => handleCardClick(index)}
    >
      <Link href="/range" className="absolute inset-0 z-0" onClick={(e) => { if (window.innerWidth < 768) e.preventDefault(); }}>
        {/* Desktop Image */}
        <img
          src={product.img}
          alt={product.name}
          className={`hidden md:block w-full h-full object-cover transition-all duration-500 md:group-hover:blur-[4px]`}
        />
        {/* Mobile Specific Image */}
        <img
          src={product.mobileImg}
          alt={product.name}
          className={`md:hidden w-full h-full object-cover transition-all duration-500 ${isActive ? 'blur-[4px]' : ''}`}
        />
      </Link>

      {/* Product Name Box - Top Right */}
      <div className={`absolute top-4 right-4 min-w-[106px] w-fit h-[48px] bg-black/40 backdrop-blur-md rounded-[10px] flex items-center justify-center transition-opacity duration-300 pointer-events-none px-4 md:opacity-0 md:group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-white text-[16px] md:text-[20px] font-['Satoshi:Medium',sans-serif] whitespace-nowrap leading-none">
          {product.name}
        </span>
      </div>

      {/* Buy Now Button - Bottom Right */}
      <Link
        href="/range#products"
        className={`absolute bottom-4 right-4 w-[110px] md:w-[138px] h-[38px] md:h-[44px] bg-white/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center z-10 hover:bg-white transition-all shadow-sm md:opacity-0 md:group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-black text-[16px] md:text-[20px] font-['Satoshi:Medium',sans-serif]">Buy Now</span>
      </Link>
    </div>
  );

  return (
    <section
      className="bg-white py-12 md:py-16 px-4 md:px-10 rounded-[16px] w-full max-w-[1252px]"
      data-name="Range Section"
    >
      <div className="flex flex-col gap-10 md:gap-12 items-center">
        {/* Headline */}
        <div className="text-center flex flex-col gap-4 max-w-[800px]">
          <h2 className="text-[#190f0d] text-[32px] sm:text-[40px] md:text-[50px] font-['Satoshi:Medium',sans-serif] leading-tight tracking-[-1px]">
            View our Range
          </h2>
          <p className="text-[#333333] text-[16px] md:text-[22px] font-['Satoshi:Regular',sans-serif] leading-relaxed">
            Discover our targeted wellness patches designed for your unique needs
          </p>
        </div>

        {/* Desktop Product Grid (Unchanged Layout) */}
        <div className="hidden md:flex w-full flex-col gap-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#cfcfcf] h-[398px]"><CardContent product={products[2]} isActive={false} index={2} /></div>
            <div className="bg-[#cfcfcf] h-[398px]"><CardContent product={products[1]} isActive={false} index={1} /></div>
            <div className="flex flex-col gap-5 md:col-span-2">
              <div className="bg-[#cfcfcf] h-[190px]"><CardContent product={products[3]} isActive={false} index={3} /></div>
              <div className="bg-[#cfcfcf] h-[190px]"><CardContent product={products[0]} isActive={false} index={0} /></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-[#cfcfcf] h-[220px]"><CardContent product={products[6]} isActive={false} index={6} /></div>
            <div className="bg-[#cfcfcf] h-[220px]"><CardContent product={products[4]} isActive={false} index={4} /></div>
            <div className="bg-[#cfcfcf] h-[220px]"><CardContent product={products[5]} isActive={false} index={5} /></div>
          </div>
        </div>

        {/* Mobile Product Grid (Pixel Perfect asymmetric layout) */}
        <div className="md:hidden flex flex-col gap-4 w-full">
          {/* Row 1: wide-l (3:2 split) */}
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-3 h-[280px]"><CardContent product={products[0]} isActive={activeCardIndex === 0} index={0} /></div>
            <div className="col-span-2 h-[280px]"><CardContent product={products[1]} isActive={activeCardIndex === 1} index={1} /></div>
          </div>
          {/* Row 2: small-l (2:3 split) */}
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-2 h-[230px]"><CardContent product={products[2]} isActive={activeCardIndex === 2} index={2} /></div>
            <div className="col-span-3 h-[230px]"><CardContent product={products[3]} isActive={activeCardIndex === 3} index={3} /></div>
          </div>
          {/* Row 3: two equals */}
          <div className="grid grid-cols-2 gap-3">
            <div className="h-[230px]"><CardContent product={products[4]} isActive={activeCardIndex === 4} index={4} /></div>
            <div className="h-[230px]"><CardContent product={products[5]} isActive={activeCardIndex === 5} index={5} /></div>
          </div>
          {/* Row 4: full width */}
          <div className="w-full h-[210px]">
            <CardContent product={products[6]} isActive={activeCardIndex === 6} index={6} />
          </div>
        </div>
      </div>
    </section>
  );
}
