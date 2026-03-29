"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialsSection from "@/components/sections/SocialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ProductCard from "@/components/sections/range/ProductCard";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import VitaminsSplashSection from "@/components/sections/range/VitaminsSplashSection";
import { useCart } from "@/context/CartContext";

const TOP_PICKS = [
  { id: "collagen-formula", name: "Collagen Formula", price: "$94", image: "/product1.svg", bg: "bg-white" },
  { id: "energy-release", name: "Energy Release", price: "$94", image: "/product6.svg", bg: "bg-white" },
  { id: "immunity", name: "Immunity", price: "$94", image: "/product3.svg", bg: "bg-white" },
  { id: "nmn-nad", name: "NMN/NAD+", price: "$94", image: "/product4.svg", bg: "bg-white" },
];

const PRODUCTS_DETAIL = {
  "neuro-boost": {
    name: "Neuro Boost",
    description: "Powered by Lion’s Mane, Ginkgo Biloba, and L-Theanine, this patch helps improve mental clarity, memory recall, and stress resilience. Perfect for work, studying, and high-performance tasks.",
    price: "$102",
    discount: "Save 20%",
    images: ["/product2.svg", "/product4.svg", "/product1.svg"],
    color: "#fcdb59",
  },
  "collagen-formula": {
    name: "Collagen Formula",
    description: "Support your skin's natural elasticity and glow with our Collagen Formula patch. Designed to fit seamlessly into your beauty routine.",
    price: "$94",
    discount: "Save 15%",
    images: ["/product1.svg", "/product3.svg", "/product5.svg"],
    color: "#ffffff",
  },
  "immunity": {
    name: "Immunity",
    description: "Stay strong and resilient with our Immunity patch, packed with essential vitamins and natural extracts to support your body's defenses.",
    price: "$94",
    discount: "Save 10%",
    images: ["/product3.svg", "/product2.svg", "/product4.svg"],
    color: "#ffffff",
  },
  "nmn-nad": {
    name: "NMN/NAD+",
    description: "Advanced cellular support for longevity and energy. Our NMN/NAD+ patch provides a steady release of age-defying nutrients.",
    price: "$94",
    discount: "Save 25%",
    images: ["/product4.svg", "/product6.svg", "/product1.svg"],
    color: "#ffffff",
  },
  "muscle-fuel": {
    name: "Muscle Fuel",
    description: "Optimize your recovery and performance. Muscle Fuel provides essential amino acids and energy boosters for your fitness journey.",
    price: "$94",
    discount: "Save 20%",
    images: ["/product5.svg", "/product7.svg", "/product2.svg"],
    color: "#ffffff",
  },
  "energy-release": {
    name: "Energy Release",
    description: "A natural, steady energy boost without the crash. Perfect for long days and active lifestyles.",
    price: "$94",
    discount: "Save 10%",
    images: ["/product6.svg", "/product1.svg", "/product3.svg"],
    color: "#ffffff",
  },
  "erectile-dysfunction": {
    name: "Erectile Dysfunction",
    description: "Discreet and effective support for male vitality and performance. Designed for confidence and wellness.",
    price: "$94",
    discount: "Save 30%",
    images: ["/product7.svg", "/product5.svg", "/product2.svg"],
    color: "#ffffff",
  }
};

type ProductId = keyof typeof PRODUCTS_DETAIL;

export default function ProductDetailPage() {
  const params = useParams();
  const id = (params.id as string) || "neuro-boost";
  const product = PRODUCTS_DETAIL[id as ProductId] || PRODUCTS_DETAIL["neuro-boost"];

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: id as string,
      name: product.name,
      price: parseInt(product.price.replace('$', '')),
      image: product.images[0],
      plan: selectedPlan
    });
  };

  const plans = ["Monthly", "Quarterly", "Yearly"];
  const accordions = [
    { id: "description", title: "Description", content: "Neuro Boost is a next-generation nootropic patch designed to elevate focus, memory, and mental clarity, without the crashes of traditional stimulants. Formulated with powerful, science-backed ingredients like Lion's Mane, Ginkgo Biloba, and L-Theanine, it delivers sustained cognitive support directly through the skin for steady, long-lasting performance. Whether you're working. studying, or navigating a high-performance lifestyle, Neuro Boost helps reduce brain fog, enhance concentration, and support overall cognitive health, so you stay sharp, calm, and in control throughout the day." },
    {
      id: "how-to-use", title: "How To Use", content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "/icon1.svg", title: "Peel & Place", sub: "Gently remove the patch from its backing and apply it to clean, dry, hair-free skin." },
            { icon: "/icon2.svg", title: "Wear & Absorb", sub: "Leave the patch on for 8 hours to allow steady absorption of active ingredients." },
            { icon: "/icon3.svg", title: "Replace Daily", sub: "Remove and apply a fresh patch daily for optimal, continuous benefits." }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#FAF9F0] h-[240px] rounded-[12px] p-5 flex flex-col items-center text-center">
              <div className="h-[80px] flex items-center justify-center">
                <img src={item.icon} alt={item.title} className="max-h-full" />
              </div>
              <h4 className="mt-4 text-black text-[16px] md:text-[18px] font-bold font-['Satoshi:Bold',sans-serif]">
                {item.title}
              </h4>
              <p className="mt-2 text-[#6F6F6F] text-[9px] md:text-[10px] font-['Satoshi:Regular',sans-serif] leading-tight px-2">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: "ingredients", title: "Ingredients", content: (
        <ul className="flex flex-col gap-3 list-disc pl-5 text-[#4D4D4D]">
          <li><strong className="text-[#4D4D4D]">Lion’s Mane Mushroom:</strong> Memory enhancement, neuroprotection, Supports cognitive function.</li>
          <li><strong className="text-[#4D4D4D]">Ginkgo Biloba:</strong> Increased blood flow, mental clarity.</li>
          <li><strong className="text-[#4D4D4D]">Ginseng:</strong> Energy boost, stress reduction, combats fatigue.</li>
          <li><strong className="text-[#4D4D4D]">Phosphatidylserine:</strong> Brain cell health and cognitive performance.</li>
          <li><strong className="text-[#4D4D4D]">B-Complex Vitamins:</strong> Mental clarity, energy production.</li>
          <li><strong className="text-[#4D4D4D]">Ashwagandha:</strong> Stress and anxiety reduction.</li>
          <li><strong className="text-[#4D4D4D]">L-Theanine:</strong> Focus without jitters, calm alertness.</li>
          <li><strong className="text-[#4D4D4D]">Gotu Kola:</strong> Improves circulation, supports cognitive function.</li>
          <li><strong className="text-[#4D4D4D]">Glutathione:</strong> Tissue building and repair, immune system function support.</li>
        </ul>
      )
    },
    {
      id: "shipping", title: "Shipping & Return", content: (
        <ul className="flex flex-col gap-3 list-disc pl-5 text-[#4D4D4D]">
          <li>Orders are processed within 1—3 business days, with delivery in 3—7 days (domestic) and 7—14 days (international)</li>
          <li>Returns are accepted within 7 days of delivery for items that are unused, unopened, and in original packaging</li>
          <li>Due to hygiene standards, opened or used products are not eligible for return</li>
          <li>Refunds are processed within 5—10 business days after inspection.</li>
          <li>Return shipping costs are borne by the customer unless the product is defective or incorrect.</li>
          <li>Orders can be cancelled within 12 hours of placement.</li>
        </ul>
      )
    }
  ];

  return (
    <main className="bg-[#f2f2f2] min-h-screen px-[20px] py-[22px]">
      <div className="w-full max-w-[1252px] mx-auto flex flex-col gap-[30px]">
        <Navbar active="range" />

        {/* Breadcrumb */}
        <div className="px-2">
          <p className="text-[#1a1a1a] text-[18px] md:text-[20px] font-['Satoshi:Medium',sans-serif] opacity-80">
            <Link href="/range#products" className="hover:text-black hover:opacity-100 hover:font-bold transition-all duration-300">Range</Link> / <span className="opacity-100 font-['Satoshi:Medium',sans-serif]">{product.name}</span>
          </p>
        </div>

        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-[40px] items-start">

          {/* Left Section - Gallery */}
          <div
            className="w-full lg:w-[618px] h-[600px] md:h-[835px] rounded-[30.51px] relative overflow-hidden flex flex-col items-center justify-center shadow-sm"
            style={{ backgroundColor: product.color === "#ffffff" ? "#ECEBE3" : product.color }}
          >
            <div className="w-full h-full p-0 flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500 transform hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-[30px] flex gap-[20px] z-10">
              {product.images.slice(0, 2).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-[130px] md:w-[172.82px] h-[80px] md:h-[110.06px] rounded-[14.55px] overflow-hidden border-2 transition-all flex items-center justify-center p-0 bg-white/20 backdrop-blur-md shadow-lg ${selectedImage === img ? 'border-[#FFFFFF] scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Section - Info & Details */}
          <div className="flex-1 flex flex-col gap-[20px]">
            {/* Product Card */}
            <div className="bg-white w-full lg:w-[561px] h-auto lg:h-[646px] rounded-[24px] p-[30px] md:p-[40px] shadow-sm relative flex flex-col">
              {/* Heart icon placeholder */}
              <div className="absolute top-[30px] right-[30px] w-[40px] h-[40px] rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer hover:bg-[#eee] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <h1 className="mt-8 text-[#1a1a1a] text-[36px] md:text-[42px] font-['Satoshi:Bold',sans-serif] tracking-tight leading-tight capitalize">
                {product.name}
              </h1>

              <p className="mt-4 text-[#666] text-[16px] font-['Satoshi:Regular',sans-serif] leading-relaxed">
                {product.description}
              </p>

              <div className="my-[40px] flex items-baseline gap-4">
                <span className="text-[#1a1a1a] text-[36px] md:text-[42px] font-['Satoshi:Medium',sans-serif]">{product.price}</span>
                <span className="text-[#E11066] text-[16px] font-['Satoshi:Regular',sans-serif]">{product.discount}</span>
              </div>

              <div className="mt-8">
                <p className="text-[#1a1a1a] text-[16px] font-['Satoshi:Regular',sans-serif] mb-4">Plan</p>
                <div className="flex gap-[12px]">
                  {plans.map(plan => (
                    <button
                      key={plan}
                      onClick={() => setSelectedPlan(plan)}
                      className={`w-[100px] md:w-[151px] h-[47px] rounded-[16px] border flex items-center justify-center text-[16px] font-['Satoshi:Regular',sans-serif] transition-all ${selectedPlan === plan ? 'border-black text-black' : 'border-transparent bg-[#F5F5F5] text-[#4D4D4D]'}`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-10 flex flex-col gap-[12px]">
                <button
                  onClick={handleAddToCart}
                  className="w-full lg:w-[479px] h-[44px] rounded-[14.91px] bg-[#333333] text-white text-[20px] md:text-[24px] font-['Satoshi:Medium',sans-serif] hover:bg-[#222] transition-all active:scale-[0.98]"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="w-full lg:w-[479px] h-[44px] rounded-[14.91px] border border-[#808080] text-[#4D4D4D] text-[20px] md:text-[24px] font-['Satoshi:Medium',sans-serif] hover:bg-gray-50 transition-all active:scale-[0.98]">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Accordion Section */}
            <div className="flex flex-col gap-[12px]">
              {accordions.map(acc => (
                <div key={acc.id} className="w-full lg:w-[561px] bg-white rounded-[12px] overflow-hidden shadow-sm transition-all duration-300">
                  <button
                    onClick={() => setExpandedAccordion(expandedAccordion === acc.id ? null : acc.id)}
                    className="w-full h-[68px] px-[24px] flex items-center justify-between group"
                  >
                    <span className="text-black text-[18px] md:text-[20px] font-['Satoshi:Bold',sans-serif]">
                      {acc.title}
                    </span>
                    <span className="text-[#4D4D4D] text-[24px] font-light transition-transform duration-300">
                      {expandedAccordion === acc.id ? "−" : "+"}
                    </span>
                  </button>
                  {expandedAccordion === acc.id && (
                    <div className="px-[24px] pb-[24px] animate-in slide-in-from-top-2 fade-in">
                      <p className="text-[#666666] text-[16px] font-['Satoshi:Medium',sans-serif] leading-relaxed">
                        {acc.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Picks Section */}
        <section className="mt-[40px] md:mt-[60px] flex flex-col gap-8">
          <h2 className="text-black text-[24px] font-['Satoshi:Medium',sans-serif]">
            Top Picks for you
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {TOP_PICKS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        <TestimonialsSection />

        <VitaminsSplashSection />

        <SocialsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  );
}
