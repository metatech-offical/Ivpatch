"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const PRODUCTS = [
  { id: "collagen-formula", name: "Collagen Formula", price: "$94", image: "/product1.svg", bg: "bg-white" },
  { id: "neuro-boost", name: "Neuro Boost", price: "$94", image: "/product2.svg", bg: "bg-gradient-to-b from-[#fcdb59] to-[#dcbe3c]", featured: true },
  { id: "immunity", name: "Immunity", price: "$94", image: "/product3.svg", bg: "bg-white" },
  { id: "nmn-nad", name: "NMN/NAD+", price: "$94", image: "/product4.svg", bg: "bg-white" },
  { id: "muscle-fuel", name: "Muscle Fuel", price: "$94", image: "/product5.svg", bg: "bg-white" },
  { id: "energy-release", name: "Energy Release", price: "$94", image: "/product6.svg", bg: "bg-white" },
  { id: "erectile-dysfunction", name: "Erectile Dysfunction", price: "$94", image: "/product7.svg", bg: "bg-white" },
];

export default function RangeProductsGrid() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Relevance");

  const sortOptions = ["Relevance", "New arrivals", "Price High to Low", "Price Low to High"];

  return (
    <div id="products" className="w-full flex flex-col gap-6" data-name="Range Products Grid">
      {/* Header Bar */}
      <div className="bg-white rounded-[12px] h-[55px] px-6 flex items-center justify-between border border-black/5 relative z-50">
        <div className="flex-1"></div>
        <h2 className="text-[20px] md:text-[24px] text-[#1a1a1a] font-['Satoshi:Medium',sans-serif] tracking-[-0.5px]">
          All Products
        </h2>
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 text-[#808080] text-[18px] md:text-[20px] font-['Satoshi:Medium',sans-serif] hover:text-[#1a1a1a] transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transform transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            <span>Sort</span>
          </button>
        </div>

        {/* Pixel Perfect Dropdown */}
        {isSortOpen && (
          <div
            className="absolute top-[65px] right-0 w-[360px] bg-white/62 backdrop-blur-[20px] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/40 p-6 flex flex-col gap-6 z-50 animate-in fade-in slide-in-from-top-2"
          >
            <p className="text-[14px] font-['Satoshi:Bold',sans-serif] text-black tracking-tight">
              Sort by
            </p>

            <div className="flex flex-col gap-5">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedSort(option)}
                  className="flex items-center justify-between group"
                >
                  <span className={`text-[18px] font-['Satoshi:Medium',sans-serif] transition-colors ${selectedSort === option ? 'text-black' : 'text-black/60 group-hover:text-black/80'}`}>
                    {option}
                  </span>
                  <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all ${selectedSort === option ? 'border-black' : 'border-black/20'}`}>
                    {selectedSort === option && (
                      <div className="w-[12px] h-[12px] rounded-full bg-black shadow-sm" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex-1 flex justify-center">
                <button
                  onClick={() => setIsSortOpen(false)}
                  className="text-[#808080] text-[18px] font-['Satoshi:Medium',sans-serif] hover:text-black/80 transition-colors"
                >
                  Reset
                </button>
              </div>
              <button
                onClick={() => setIsSortOpen(false)}
                className="bg-white w-[227px] h-[48px] flex items-center justify-center rounded-[12px] text-black text-[18px] font-['Satoshi:Bold',sans-serif] border border-black/5 hover:bg-white/90 active:scale-95 transition-all shadow-sm"
              >
                Apply filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
