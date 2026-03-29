"use client";

import React from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Selena Miller",
    comment: "Reliable and Easy to use. Made my life so much easier",
  },
  {
    id: 2,
    name: "Michael Chen",
    comment: "This product is exceptionally good, at first I was skeptical but tbh, a very good purchase.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    comment: "The convenience this product offers is what tempted me to buy it and honestly no regrets...",
  },
  {
    id: 4,
    name: "David Smith",
    comment: "Finally a wellness patch that actually stays on! Great results and fits perfectly in my routine.",
  },
  {
    id: 5,
    name: "Emma Davis",
    comment: "I've tried many supplements but these patches are a game changer. Highly recommend to everyone.",
  },
  {
    id: 6,
    name: "James Wilson",
    comment: "Superior absorption and effortless results. The patches are discreet and very effective.",
  },
];

export default function TestimonialsSection() {
  // Duplicate the list to create a seamless infinite scroll
  const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="w-full flex flex-col gap-10 mt-[80px] overflow-hidden">
      <div className="px-2">
        <h3 className="text-black text-[24px] font-['Satoshi:Medium',sans-serif]">
          Transformative Client Experiences
        </h3>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll hover:[animation-play-state:paused] gap-[24px] w-max">
          {doubledTestimonials.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[387px] h-[290px] bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-[40px] flex flex-col relative overflow-hidden"
            >
              {/* Quote Icon at the very top */}
              <div className="absolute top-[-10px] left-[40px]">
                <img src="/quote.svg" alt="Quote" className="w-[60px] h-auto opacity-70" />
              </div>

              {/* Centered Comment */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-black text-[20px] font-['Satoshi:Medium',sans-serif] leading-[28px] tracking-[-0.2px] text-left">
                  {item.comment}
                </p>
              </div>

              {/* Name at the bottom */}
              <p className="text-[#1a1a1a] text-[18px] font-['Satoshi:Medium',sans-serif]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-387px * 6 - 24px * 6));
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
