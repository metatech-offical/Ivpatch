"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex justify-end">
      {/* 10% Transparency Overlay */}
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Drawer Panel */}
      <div className="relative w-full md:w-[634px] bg-[#f2f2f2] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-8 py-10 flex items-center justify-between">
          <h2 className="text-black text-[28px] font-['Satoshi:Medium',sans-serif]">
            Cart ({totalItems})
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto px-[30px] flex flex-col gap-4 scrollbar-hide">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="w-full md:w-[573.95px] h-[148px] bg-white rounded-[19.25px] flex items-center p-3 relative group"
            >
              {/* Product Preview box */}
              <div className="w-[123.93px] h-[129.95px] rounded-[14.22px] bg-[#F5F5F5] flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 ml-5 flex flex-col justify-start h-full py-2">
                <div>
                  <h3 className="text-[#4D4D4D] text-[22px] md:text-[24px] font-['Satoshi:Medium',sans-serif] tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-[#4D4D4D] text-[16px] font-['Satoshi:Regular',sans-serif] opacity-80 mt-0.5">
                    {item.plan}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="mt-auto flex items-center w-[100px] h-[34px] rounded-[19.25px] border border-black/[0.08] px-3 justify-between">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-black hover:text-black/60 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <span className="text-[#4D4D4D] text-[14px] font-['Satoshi:Medium',sans-serif]">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-black hover:text-black/60 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Price & Remove */}
              <div className="flex flex-col items-end justify-between h-full py-4 pr-4">
                <p className="text-black text-[24px] md:text-[30px] font-['Satoshi:Medium',sans-serif] tracking-tight">
                  ${item.price * item.quantity}
                </p>
                
                {/* Remove button */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="w-[32px] h-[32px] rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors group/remove"
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                    className="text-black"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-black/40 gap-4">
              <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="text-[20px] font-['Satoshi:Medium',sans-serif]">Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="bg-white px-8 h-[145px] flex flex-col justify-center gap-4 border-t border-black/5 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-black text-[20px] font-['Satoshi:Medium',sans-serif]">Subtotal</p>
              <p className="text-[#4D4D4D] text-[14px] font-['Satoshi:Regular',sans-serif]">
                *Shipping, taxes and discounts calculated at checkout
              </p>
            </div>
            <p className="text-black text-[24px] font-['Satoshi:Medium',sans-serif]">
              ${subtotal}
            </p>
          </div>

          <Link 
            href="/checkout" 
            onClick={() => setIsOpen(false)}
            className="w-full"
          >
            <button className="w-full md:w-[568px] h-[46px] bg-[#1A1A1A] text-white rounded-[16px] text-[18px] font-['Satoshi:Bold',sans-serif] hover:bg-black transition-all active:scale-[0.98]">
              Proceed to checkout
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
