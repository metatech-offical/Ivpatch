"use client";

import Link from "next/link";
import { useState } from "react";

export default function RangeSection() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const products = [
    { name: "Collagen Formula", img: "/desktop-4.svg", mobileImg: "/mobile-1.svg" },
    { name: "Muscle Fuel", img: "/desktop-2.svg", mobileImg: "/mobile-2.svg" },
    { name: "ER", img: "/desktop-1.svg", mobileImg: "/mobile-3.svg" },
    { name: "Immunity", img: "/desktop-3.svg", mobileImg: "/mobile-4.svg" },
    { name: "ED", img: "/desktop-5.svg", mobileImg: "/mobile-5.svg" },
    { name: "NMN-NAD+", img: "/desktop-6.svg", mobileImg: "/mobile-6.svg" },
    { name: "Neuro", img: "/desktop-7.svg", mobileImg: "/mobile-7.svg" },
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
      <div className={`absolute top-3 md:top-4 right-3 md:right-4 min-w-[106px] w-fit h-[40px] md:h-[48px] bg-black/40 backdrop-blur-md rounded-[10px] flex items-center justify-center transition-opacity duration-300 pointer-events-none px-4 md:opacity-0 md:group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-white text-[13px] md:text-[20px] font-['Satoshi:Medium',sans-serif] whitespace-nowrap leading-none">
          {product.name}
        </span>
      </div>

      {/* Buy Now Button - Bottom Right */}
      <Link
        href="/range#products"
        className={`absolute bottom-3 md:bottom-4 right-3 md:right-4 w-[100px] md:w-[138px] h-[34px] md:h-[44px] bg-white/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center z-10 hover:bg-white transition-all shadow-sm md:opacity-0 md:group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-black text-[13px] md:text-[20px] font-['Satoshi:Medium',sans-serif]">Buy Now</span>
      </Link>
    </div>
  );

  return (
    <section
      className="bg-white pt-12 pb-4 md:py-16 px-5 md:px-10 rounded-[16px] w-full max-w-[1252px] mx-auto overflow-hidden"
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
            <div className="bg-[#cfcfcf] h-[398px] rounded-[16px] overflow-hidden"><CardContent product={products[2]} isActive={false} index={2} /></div>
            <div className="bg-[#cfcfcf] h-[398px] rounded-[16px] overflow-hidden"><CardContent product={products[1]} isActive={false} index={1} /></div>
            <div className="flex flex-col gap-5 md:col-span-2">
              <div className="bg-[#cfcfcf] h-[190px] rounded-[16px] overflow-hidden"><CardContent product={products[3]} isActive={false} index={3} /></div>
              <div className="bg-[#cfcfcf] h-[190px] rounded-[16px] overflow-hidden"><CardContent product={products[0]} isActive={false} index={0} /></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-[#cfcfcf] h-[220px] rounded-[16px] overflow-hidden"><CardContent product={products[6]} isActive={false} index={6} /></div>
            <div className="bg-[#cfcfcf] h-[220px] rounded-[16px] overflow-hidden"><CardContent product={products[4]} isActive={false} index={4} /></div>
            <div className="bg-[#cfcfcf] h-[220px] rounded-[16px] overflow-hidden"><CardContent product={products[5]} isActive={false} index={5} /></div>
          </div>
        </div>

        {/* Mobile Product Grid (Pixel Perfect exact dimensions with responsive scaling and padding) */}
        <div className="md:hidden w-full flex justify-center py-2">
          <div className="flex flex-col items-center gap-[10px] w-max scale-[0.8] min-[375px]:scale-[0.85] min-[414px]:scale-[0.95] min-[440px]:scale-100 origin-top">
            {/* Row 1 */}
            <div className="flex gap-[8px] justify-center">
              <div className="w-[230px] h-[170px] shrink-0">
                <CardContent product={products[0]} isActive={activeCardIndex === 0} index={0} />
              </div>
              <div className="w-[138px] h-[170px] shrink-0">
                <CardContent product={products[1]} isActive={activeCardIndex === 1} index={1} />
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex gap-[8px] justify-center">
              <div className="w-[138px] h-[175px] shrink-0">
                <CardContent product={products[2]} isActive={activeCardIndex === 2} index={2} />
              </div>
              <div className="w-[230px] h-[175px] shrink-0">
                <CardContent product={products[3]} isActive={activeCardIndex === 3} index={3} />
              </div>
            </div>
            {/* Row 3 */}
            <div className="flex gap-[8px] justify-center">
              <div className="w-[184px] h-[162px] shrink-0">
                <CardContent product={products[4]} isActive={activeCardIndex === 4} index={4} />
              </div>
              <div className="w-[184px] h-[162px] shrink-0">
                <CardContent product={products[5]} isActive={activeCardIndex === 5} index={5} />
              </div>
            </div>
            {/* Row 4 */}
            <div className="w-[376px] h-[190px] shrink-0">
              <CardContent product={products[6]} isActive={activeCardIndex === 6} index={6} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
