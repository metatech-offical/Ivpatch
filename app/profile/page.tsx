"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import SocialsSection from "@/components/sections/SocialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Footer from "@/components/layout/Footer";

export default function ProfilePage() {
  const { user, logout, isLoggedIn } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("My Orders");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!user) return null;

  const orders = [
    {
      id: "#33268",
      date: "13 Dec, 2025",
      total: "$323.40",
      status: "In Transit",
      products: ["/product4.svg", "/product3.svg"],
    },
    {
      id: "#33267",
      date: "13 Sept, 2025",
      total: "$323.40",
      status: "Delivered",
      products: ["/product2.svg"],
      extraProducts: 2
    },
    {
      id: "#30250",
      date: "12 Sept, 2025",
      total: "$323.40",
      status: "Delivered",
      products: ["/product5.svg"],
    },
    {
      id: "#25358",
      date: "13 July, 2025",
      total: "$323.40",
      status: "Delivered",
      products: ["/product2.svg"],
      extraProducts: 5
    },
    {
      id: "#24268",
      date: "13 April, 2025",
      total: "$323.40",
      status: "Delivered",
      products: ["/product2.svg"],
      extraProducts: 2
    }
  ];

  const sidebarLinks = [
    "My profile",
    "My Orders",
    "My Wishlist",
    "My Subscriptions",
    "Shipping & Return policy",
    "Help",
    "Logout"
  ];

  return (
    <main className="bg-[#f2f2f2] min-h-screen p-[20px] md:p-[22px]">
      <div className="max-w-[1252px] mx-auto flex flex-col gap-10 items-center">
        <Navbar />

        {/* Profile Header Banner */}
        <div className="w-full h-[225px] bg-[#9FB0A5] rounded-[16px] flex items-center px-12 relative overflow-hidden">
           <div className="flex items-center gap-8 z-10">
              <div className="w-[155px] h-[155px] bg-white/30 rounded-full flex items-center justify-center text-white text-[64px] font-['Satoshi:Medium',sans-serif] border-[6px] border-white/40">
                SW
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-[42px] font-['Satoshi:Medium',sans-serif]">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90 text-[20px] font-['Satoshi:Regular',sans-serif]">
                   <span className="flex items-center gap-2">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                     </svg>
                     {user.phone}
                   </span>
                   <span className="flex items-center gap-2">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                       <polyline points="22,6 12,13 2,6" />
                     </svg>
                     {user.email}
                   </span>
                </div>
              </div>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full flex flex-col lg:flex-row gap-8 items-start mb-[100px]">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[350px] bg-white rounded-[16px] p-8 flex flex-col gap-2 shadow-sm">
            {sidebarLinks.map((link) => (
              <button
                key={link}
                onClick={() => {
                  if (link === "Logout") {
                    logout();
                  } else {
                    setActiveTab(link);
                  }
                }}
                className={`w-full text-left px-4 py-4 rounded-[8px] text-[24px] font-['Satoshi:Regular',sans-serif] transition-all relative flex items-center ${
                  activeTab === link 
                    ? "text-black" 
                    : "text-[#B2B2B2] hover:text-[#1a1a1a] hover:bg-[#f9f9f9]"
                }`}
              >
                {activeTab === link && (
                  <div className="absolute left-0 w-[4px] h-[34px] bg-black rounded-full" />
                )}
                {link}
              </button>
            ))}
          </div>

          {/* Orders Section */}
          <div className="flex-1 bg-white rounded-[16px] p-10 shadow-sm flex flex-col gap-10">
            <h2 className="text-[#1A1A1A] text-[30px] font-['Satoshi:Medium',sans-serif]">My Orders</h2>
            
            <div className="flex flex-col gap-6">
               {/* Table Header Wrapper (Visual only) */}
               <div className="grid grid-cols-5 px-6 py-4 bg-[#f2f2f2] rounded-[8px] text-[#4d4d4d] text-[18px] font-['Satoshi:Regular',sans-serif] items-center">
                  <div>Products</div>
                  <div className="text-center">Order No.</div>
                  <div className="text-center">Order Date</div>
                  <div className="text-center">Total</div>
                  <div className="text-right">Status</div>
               </div>

               {/* Order Items */}
               {orders.map((order) => (
                 <div key={order.id} className="grid grid-cols-5 px-6 py-8 border-b border-[#f2f2f2] last:border-none items-center">
                    <div className="flex items-center gap-2">
                      {order.products.map((p, idx) => (
                        <div key={idx} className="w-[70px] h-[70px] bg-[#f2f2f2] rounded-[8px] overflow-hidden p-2 flex items-center justify-center">
                          <img src={p} alt="Product" className="w-full h-full object-contain" />
                        </div>
                      ))}
                      {order.extraProducts && (
                        <div className="w-[70px] h-[70px] bg-black rounded-[8px] flex items-center justify-center text-white text-[18px] font-['Satoshi:Medium',sans-serif]">
                          +{order.extraProducts}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center text-[#1a1a1a] text-[20px] font-['Satoshi:Medium',sans-serif] underline decoration-1 underline-offset-4 cursor-pointer">
                      {order.id}
                    </div>

                    <div className="text-center text-[#1a1a1a] text-[18px] font-['Satoshi:Regular',sans-serif]">
                      {order.date}
                    </div>

                    <div className="text-center text-[#1a1a1a] text-[18px] font-['Satoshi:Regular',sans-serif]">
                      {order.total}
                    </div>

                    <div className="text-right text-[#1a1a1a] text-[18px] font-['Satoshi:Regular',sans-serif]">
                      {order.status}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <SocialsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  );
}
