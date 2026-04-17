"use client";

import Image from "next/image";
import { useState } from "react";

export default function AffiliatesStepsSection() {
  const [activeCards, setActiveCards] = useState<number[]>([]);

  const cards = [
    {
      id: 1,
      image: "/aff-1.svg",
      hoverImage: "/affh-1.svg",
      alt: "Affiliates Step 1",
    },
    {
      id: 2,
      image: "/aff-2.svg",
      hoverImage: "/affh-2.svg",
      alt: "Affiliates Step 2",
    },
    {
      id: 3,
      image: "/aff-3.svg",
      hoverImage: "/affh-3.svg",
      alt: "Affiliates Step 3",
    },
  ];

  const toggleCard = (id: number) => {
    setActiveCards(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section
      className="bg-white rounded-[16px] w-[1252px] max-w-full h-auto md:h-[463px] shrink-0 flex flex-col items-center justify-center py-10 md:py-0"
      data-name="Affiliates Steps Section"
    >
      {/* Title & Subtitle */}
      <div className="flex flex-col items-center text-center px-4 mb-[32px] md:mb-[40px]">
        <h2 className="text-[32px] md:text-[50px] font-['Satoshi:Medium',sans-serif] font-medium text-[#190F0D] leading-[1.2]">
          Why Partner With IVPatch
        </h2>
        <p className="text-[16px] md:text-[22px] font-['Satoshi:Medium',sans-serif] font-medium text-[#333333] leading-[1.4] mt-[12px] max-w-[320px] md:max-w-full">
          Join a premium wellness brand built to reward every recommendation you make.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full px-6 md:px-0">
        {cards.map((card) => {
          const isActive = activeCards.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className="relative w-full max-w-[381px] aspect-[16/9] md:h-[220px] rounded-[24px] overflow-hidden group cursor-pointer shrink-0 border border-black/5 bg-white"
            >
              {/* Base Image */}
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out z-10 ${isActive ? 'opacity-0' : 'opacity-100 md:group-hover:opacity-0'}`}
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Hover/Active Image */}
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out z-20 ${isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}
              >
                <Image
                  src={card.hoverImage}
                  alt={`${card.alt} Hover`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
