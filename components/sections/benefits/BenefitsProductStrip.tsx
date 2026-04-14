"use client";

import Link from "next/link";

export default function BenefitsProductStrip() {
  const products = Array.from({ length: 7 }).map((_, idx) => ({
    id: idx + 1,
    activeImg: `/active-${idx + 1}.svg`,
    inactiveImg: "/inactive.svg"
  }));

  return (
    <section
      className="w-full max-w-[1252px] py-10 overflow-hidden"
      data-name="Product display"
    >
      {/* Mobile: Auto-scroll Carousel (Visible on mobile only) */}
      <div className="flex md:hidden w-full overflow-hidden">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[...products, ...products].map((p, idx) => (
            <div
              key={`mobile-${idx}`}
              className="flex-shrink-0 w-[140px] aspect-[1.1] bg-white border border-black/10 rounded-[20px] shadow-sm overflow-hidden flex items-center justify-center"
            >
              <img
                src={p.activeImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Hover Grid (Visible on md and up) */}
      <div className="hidden md:grid grid-cols-7 gap-4 w-full">
        {products.map((p, idx) => (
          <Link
            key={`desktop-${idx}`}
            href="/range"
            className="relative h-[147px] bg-white border border-black/10 rounded-[20px] shadow-sm overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
          >
            {/* Inactive Image (Default) */}
            <img
              src={p.inactiveImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            />
            {/* Active Image (Hover) */}
            <img
              src={p.activeImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
