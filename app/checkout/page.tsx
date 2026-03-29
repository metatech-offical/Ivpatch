"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/sections/range/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialsSection from "@/components/sections/SocialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ComingSoonTooltip from "@/components/ui/ComingSoonTooltip";

export default function CheckoutPage() {
  const { items, subtotal, setIsOpen } = useCart();
  const [selectedShipping, setSelectedShipping] = useState("prepaid");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSaveDetails, setIsSaveDetails] = useState(false);
  const [useBillingSameAsShipping, setUseBillingSameAsShipping] = useState(true);
  
  const taxes = 6.66;
  const shippingCharge = selectedShipping === "prepaid" ? 0 : 0.60;
  const total = subtotal + taxes + shippingCharge;

  // Split items into main and miniatures
  const mainProduct = items[0];
  const otherProducts = items.slice(1);

  return (
    <main className="bg-[#f2f2f2] min-h-screen p-[20px] md:p-[22px]">
      <div className="max-w-[1252px] mx-auto flex flex-col gap-10 items-center">
        <Navbar />

        <div className="w-full flex flex-col gap-10">
          {/* Header - Back to Cart */}
          <Link 
            href="/range" 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-[#333333] text-[20px] font-['Satoshi:Medium',sans-serif] hover:opacity-70 transition-all w-max pt-6"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Edit Order
          </Link>

          {/* Main Content Split */}
          <div className="flex flex-col lg:flex-row gap-[40px] items-start w-full">
            
            {/* LEFT SECTION - Order Details */}
            <div className="w-full lg:w-[587px] flex flex-col gap-6">
              
              {/* Main Product Image */}
              <div className="w-full lg:w-[587px] h-[300px] md:h-[468px] bg-white rounded-[24px] shadow-sm flex items-center justify-center overflow-hidden">
                {mainProduct ? (
                  <img 
                    src={mainProduct.image} 
                    alt={mainProduct.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-black/20 text-[18px] md:text-[20px] font-['Satoshi:Medium',sans-serif]">No items selected</div>
                )}
              </div>

              {/* Thumbnails if > 1 product */}
              {otherProducts.length > 0 && (
                <div className="grid grid-cols-3 gap-[7.5px] w-full lg:w-[587px]">
                  {otherProducts.map((item, idx) => (
                    <div key={idx} className="h-24 md:h-[152px] bg-white rounded-[16px] overflow-hidden shadow-sm flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Summary Card */}
              <div className="w-full lg:w-[587px] bg-white rounded-[24px] p-6 md:p-10 shadow-sm flex flex-col gap-6">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[#1a1a1a] text-[28px] md:text-[42px] font-['Satoshi:Regular',sans-serif]">
                        {item.name}
                      </h2>
                      <p className="text-black text-[22px] md:text-[30px] font-['Satoshi:Medium',sans-serif]">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <p className="text-black text-[18px] md:text-[24px] font-['Satoshi:Regular',sans-serif]">
                        {item.plan} Subscription
                      </p>
                      <span className="text-[#B12422] text-[14px] font-['Satoshi:Regular',sans-serif]">
                        Saves 20%
                      </span>
                    </div>
                  </div>
                ))}

                {/* Discount Input */}
                <div className="w-full min-h-[60px] md:h-[75px] bg-[#f2f2f2] rounded-[16px] px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <input 
                    type="text" 
                    placeholder="Discount Code/Gift Card"
                    className="bg-transparent border-none outline-none text-[#999999] text-[18px] md:text-[20px] font-['Satoshi:Regular',sans-serif] w-full"
                  />
                  <button className="text-black text-[20px] md:text-[24px] font-['Satoshi:Regular',sans-serif] px-4 py-1 hover:opacity-70 transition-all">
                    Apply
                  </button>
                </div>

                {/* Totals */}
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex items-center justify-between text-[#4D4D4D] text-[18px] md:text-[22px] font-['Satoshi:Regular',sans-serif]">
                    <p>Subtotal</p>
                    <p className="text-black text-[20px] md:text-[24px]">${subtotal}</p>
                  </div>
                  <div className="flex items-center justify-between text-[#4D4D4D] text-[18px] md:text-[22px] font-['Satoshi:Regular',sans-serif]">
                    <p>Taxes</p>
                    <p className="text-black text-[20px] md:text-[24px]">${taxes}</p>
                  </div>
                  <div className="flex items-center justify-between text-[#4D4D4D] text-[18px] md:text-[22px] font-['Satoshi:Regular',sans-serif]">
                    <p>Shipping</p>
                    <p className="text-black text-[20px] md:text-[24px]">${shippingCharge}</p>
                  </div>
                  <div className="flex items-center justify-between text-black text-[20px] md:text-[24px] font-['Satoshi:Medium',sans-serif]">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - Contact Form */}
            <div className="w-full lg:w-[575px] flex flex-col gap-10">
              
              <div className="flex flex-col gap-6">
                <h2 className="text-black text-[30px] font-['Satoshi:Medium',sans-serif]">Contact</h2>
                
                <div className="flex flex-col gap-4">
                  <input 
                    placeholder="Email" 
                    className="w-full h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] shadow-sm outline-none border border-transparent focus:border-black/10" 
                  />
                  
                  <div 
                    className="flex flex-row items-center gap-2 cursor-pointer group"
                    onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                     <div className={`w-[18px] h-[18px] rounded-full border transition-colors flex items-center justify-center p-[2px] ${isSubscribed ? 'border-black' : 'border-[#808080]'}`}>
                        {isSubscribed && <div className="w-full h-full bg-black rounded-full animate-in zoom-in-50 duration-200" />}
                     </div>
                     <p className={`text-[14px] font-['Satoshi:Regular',sans-serif] transition-colors ${isSubscribed ? 'text-black' : 'text-[#808080]'}`}>
                      Stay committed! Receive tips, inspiration and community news via email
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="First Name" className="h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                    <input placeholder="Last Name" className="h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                  </div>

                  <input placeholder="Address" className="w-full h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                  <input placeholder="Apartment, Suite, etc" className="w-full h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="City" className="h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                    <input placeholder="Postcode" className="h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                  </div>

                  <input placeholder="Phone" className="w-full h-auto min-h-[60px] md:h-[60px] bg-white rounded-[12px] px-6 py-4 md:py-0 text-[18px] md:text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                  
                  <div 
                    className="flex flex-row items-center gap-2 cursor-pointer group"
                    onClick={() => setIsSaveDetails(!isSaveDetails)}
                  >
                     <div className={`w-[18px] h-[18px] rounded-full border transition-colors flex items-center justify-center p-[2px] ${isSaveDetails ? 'border-black' : 'border-[#808080]'}`}>
                        {isSaveDetails && <div className="w-full h-full bg-black rounded-full animate-in zoom-in-50 duration-200" />}
                     </div>
                     <p className={`text-[14px] font-['Satoshi:Regular',sans-serif] transition-colors ${isSaveDetails ? 'text-black' : 'text-[#808080]'}`}>
                      Save details for the next purchase
                     </p>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="flex flex-col gap-6">
                <h2 className="text-black text-[24px] md:text-[30px] font-['Satoshi:Medium',sans-serif]">Shipping Method</h2>
                
                <div className="w-full lg:w-[575px] h-auto md:h-[222px] bg-white rounded-[16px] shadow-sm flex flex-col border border-black/5 divide-y divide-black/5">
                  {[
                    { id: "prepaid", title: "Prepaid", sub: "3-7 Business Days", price: "FREE" },
                    { id: "cod", title: "Cash on Delivery (COD)", sub: "3-7 Business Days", price: "$0.60" },
                    { id: "express", title: "Express", sub: "1-4 Business Days", price: "$0.60" },
                  ].map((method) => (
                    <button 
                      key={method.id}
                      onClick={() => setSelectedShipping(method.id)}
                      className="flex-1 px-6 md:px-8 py-4 md:py-0 flex items-center justify-between group hover:bg-[#f9fafb] first:rounded-t-[16px] last:rounded-b-[16px] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Custom Radio */}
                        <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center p-[2px] transition-colors ${selectedShipping === method.id ? 'border-black' : 'border-[#808080]'}`}>
                          {selectedShipping === method.id && <div className="w-full h-full bg-black rounded-full" />}
                        </div>
                        <div className="text-left">
                          <p className="text-black text-[18px] md:text-[20px] font-['Satoshi:Regular',sans-serif] capitalize">{method.title}</p>
                          <p className="text-black/40 text-[14px] md:text-[16px] font-['Satoshi:Regular',sans-serif]">{method.sub}</p>
                        </div>
                      </div>
                      <p className="text-black text-[14px] md:text-[16px] font-['Satoshi:Regular',sans-serif]">{method.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Section */}
              <div className="flex flex-col gap-6">
                <h2 className="text-black text-[30px] font-['Satoshi:Medium',sans-serif]">Payment</h2>
                
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="text-[#808080] text-[20px] font-['Satoshi:Regular',sans-serif] mb-6">Express Checkout</p>
                    <img src="/pay1.svg" alt="Express Payment Options" className="w-full h-auto cursor-pointer" />
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Credit Card Title Row */}
                    <div className="w-full h-auto min-h-[60px] bg-white rounded-[12px] px-6 py-4 md:py-0 flex items-center justify-between shadow-sm border border-black/5">
                      <span className="text-black text-[18px] md:text-[20px] font-['Satoshi:Medium',sans-serif]">Credit Card</span>
                      <img src="/pay2.svg" alt="Accepted Cards" className="h-[20px] md:h-[24px] w-auto" />
                    </div>

                    {/* Card Details Inputs */}
                    <input placeholder="Card Number" className="w-full h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Expiration (MM/YY)" className="h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                      <input placeholder="Security Code" className="h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                    </div>

                    <input placeholder="Cardholder Name" className="w-full h-[60px] bg-white rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black shadow-sm outline-none" />
                  </div>

                  {/* Billing Address Option */}
                  <div 
                    className="flex flex-row items-center gap-2 cursor-pointer group"
                    onClick={() => setUseBillingSameAsShipping(!useBillingSameAsShipping)}
                  >
                     <div className={`w-[18px] h-[18px] rounded-full border transition-colors flex items-center justify-center p-[2px] ${useBillingSameAsShipping ? 'border-black' : 'border-[#808080]'}`}>
                        {useBillingSameAsShipping && <div className="w-full h-full bg-black rounded-full animate-in zoom-in-50 duration-200" />}
                     </div>
                     <p className={`text-[14px] font-['Satoshi:Regular',sans-serif] transition-colors ${useBillingSameAsShipping ? 'text-black' : 'text-[#808080]'}`}>
                      Use shipping address same as the billing address
                     </p>
                  </div>

                  {/* Terms and Policy */}
                  <div className="text-[#999999] text-[14px] font-['Satoshi:Regular',sans-serif] leading-relaxed">
                    By placing this order you agree to the <span className="underline cursor-pointer hover:text-black transition-colors">Terms of service</span> & <span className="underline cursor-pointer hover:text-black transition-colors">Privacy Policy</span>
                  </div>

                  <ComingSoonTooltip>
                    <button className="w-full h-[60px] bg-[#1A1A1A] text-white rounded-[12px] text-[20px] font-['Satoshi:Regular',sans-serif] hover:bg-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center">
                      Place Order
                    </button>
                  </ComingSoonTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pairs well with Section */}
        <div className="flex flex-col gap-6 md:gap-10 mt-[40px] md:mt-[60px] pb-[60px] md:pb-[100px] w-full items-center md:items-start text-center md:text-left">
          <h2 className="text-[#1A1A1A] text-[28px] md:text-[42px] font-['Satoshi:Medium',sans-serif]">Pairs well with</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] w-full max-w-[350px] md:max-w-none">
             <ProductCard 
                id="energy-release"
                name="Energy Release"
                price="$94"
                image="/product4.svg"
                bg="bg-white"
                buttonText="Buy Now"
             />
             <ProductCard 
                id="neuro-boost"
                name="Neuro Boost"
                price="$102"
                image="/product3.svg"
                bg="bg-white"
                buttonText="Buy Now"
             />
             <ProductCard 
                id="collagen-formula"
                name="Collagen Formula"
                price="$94"
                image="/product2.svg"
                bg="bg-white"
                buttonText="Buy Now"
             />
             <ProductCard 
                id="ed"
                name="ED"
                price="$94"
                image="/product5.svg"
                bg="bg-white"
                buttonText="Buy Now"
             />
          </div>
        </div>

        <SocialsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  );
}
