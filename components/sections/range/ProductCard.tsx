"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  id: string;
  name: string;
  price: string;
  image: string;
  bg: string;
  buttonText?: string;
};

export default function ProductCard({ id, name, price, image, bg, buttonText = "Add to Cart" }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem({
      id,
      name,
      price: parseInt(price.replace('$', '')),
      image,
      plan: "Monthly"
    });
  };

  return (
    <Link
      href={`/range/${id}`}
      className="group cursor-pointer block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${bg} h-[380px] md:h-[450px] rounded-[16px] overflow-hidden border border-black/5 transition-all duration-300`}>
        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute right-4 top-4 z-20 group/heart"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#E11066" : "none"}
            stroke={isFavorite ? "#E11066" : "#999999"}
            strokeWidth="1.5"
            className="transition-colors duration-200"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* Product Image */}
        <div className="absolute inset-0">
          <img
            alt={name}
            src={image}
            className="w-full h-full object-cover drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)] transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Add to Cart Button (Hover) */}
        <div
          className={`absolute inset-x-4 bottom-5 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
        >
          <button
            onClick={handleAddToCart}
            className="w-full h-[50px] rounded-[12px] bg-white text-[#1a1a1a] text-[18px] font-['Satoshi:Bold',sans-serif] shadow-lg hover:bg-white/90 active:scale-95 transition-all"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex items-center justify-between font-['Satoshi:Medium',sans-serif] px-2">
        <p className="text-[16px] text-[#333333] tracking-[-0.1px]">{name}</p>
        <p className="text-[22px] text-[#1a1a1a] tracking-[-0.2px]">{price}</p>
      </div>
    </Link>
  );
}
