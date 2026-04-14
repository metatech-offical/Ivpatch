
"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import SocialsSection from "@/components/sections/SocialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase/client";
import type { UserAddress } from "@/lib/supabase/types";

export default function ProfilePage() {
  const { user, logout, isLoggedIn, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("My profile");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    { question: "My order hasn't arrived. What should I do?", answer: "Check your tracking link for the latest status. If your order is delayed beyond the estimated timeframe, contact our support team with your order details." },
    { question: "I received a damaged or incorrect product.", answer: "Please contact our support team immediately with your order number and photos of the defective item." },
    { question: "My patch isn't sticking properly.", answer: "Ensure your skin is clean, dry, and free of lotions before application. Press firmly for 10 seconds." },
    { question: "I'm experiencing skin irritation. What should I do?", answer: "Remove the patch immediately and wash the area with soap and water. Contact support if irritation persists." },
    { question: "I didn't feel any effects. Is something wrong?", answer: "Results can vary heavily based on individual metabolism and hydration levels. Consistent use is recommended." },
    { question: "Can I change or cancel my order?", answer: "You can change or cancel your order within 1 hour of placing it. After that, it may have already been processed." },
    { question: "How do I manage or cancel my subscription?", answer: "Log into your account, navigate to Subscriptions, and click 'Cancel' or 'Pause'. You can modify it anytime." }
  ];
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [addressForm, setAddressForm] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "UAE",
    postal_code: "",
    is_default: false,
  });

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, authLoading, router]);

  useEffect(() => {
    if (user) {
      const parts = user.name ? user.name.split(" ") : [""];
      const firstName = parts[0];
      const lastParts = parts.slice(1);
      setProfileForm({
        first_name: firstName || "",
        last_name: lastParts.join(" ") || "",
        phone: user.phone || "",
      });
      loadAddresses();
    }
  }, [user]);

  const loadAddresses = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from("user_addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false });
      setAddresses((data as UserAddress[]) || []);
    } catch (err) {
      console.error("Failed to load addresses:", err);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      await (supabase as any)
        .from("profiles")
        .update({
          first_name: profileForm.first_name,
          last_name: profileForm.last_name,
          phone: profileForm.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      setEditingProfile(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleAddAddress = async () => {
    if (!user || !addressForm.address_line1 || !addressForm.city) return;
    try {
      await (supabase as any).from("user_addresses").insert({
        user_id: user.id,
        ...addressForm,
      });
      setShowAddressForm(false);
      setAddressForm({
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        country: "UAE",
        postal_code: "",
        is_default: false,
      });
      loadAddresses();
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await supabase.from("user_addresses").delete().eq("id", id);
      loadAddresses();
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  if (authLoading || !user) {
    return (
      <main className="bg-[#f2f2f2] min-h-screen p-[20px] md:p-[22px]">
        <div className="max-w-[1252px] mx-auto flex flex-col gap-10 items-center">
          <Navbar />
          <div className="w-full animate-pulse">
            <div className="h-[225px] bg-gray-200 rounded-[16px]" />
            <div className="mt-8 flex gap-8">
              <div className="w-[350px] h-[400px] bg-gray-200 rounded-[16px]" />
              <div className="flex-1 h-[500px] bg-gray-200 rounded-[16px]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  const initials = user.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const sidebarLinks = [
    "My profile",
    "My Orders",
    "Shipping & Return policy",
    "Help",
    "Logout"
  ];

  return (
    <main className="bg-[#f2f2f2] min-h-screen p-[20px] md:p-[22px]">
      <div className="max-w-[1252px] mx-auto flex flex-col gap-10 items-center">
        <Navbar />

        {/* Profile Header Banner */}
        <div className="w-full h-[257px] max-w-[1252px] bg-[#9CA89E] rounded-[16px] flex items-center justify-center relative overflow-hidden">
           <div className="flex items-center gap-[60px] z-10 w-fit">
             {/* Initials Circle */}
             <div className="w-[138px] h-[138px] bg-white/20 rounded-full flex items-center justify-center text-white text-[48px] font-['Satoshi:Medium',sans-serif] shrink-0">
               {initials}
             </div>
             {/* Info Block */}
             <div className="flex flex-col gap-[20px] items-start">
               <h1 className="text-white text-[30px] font-['Satoshi:Bold',sans-serif] leading-none">
                 {user.name}
               </h1>
               <div className="flex items-center gap-[40px] text-white/90 text-[20px] font-['Satoshi:Regular',sans-serif] leading-none">
                  <span className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {user.phone || "No phone"}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
          <div className="w-full lg:w-[350px] bg-white rounded-[16px] p-2 md:p-8 flex flex-row lg:flex-col gap-2 shadow-sm overflow-x-auto no-scrollbar items-center lg:items-stretch">
            {sidebarLinks.map((link) => (
              <button
                key={link}
                onClick={() => {
                  if (link === "Logout") {
                    setShowLogoutModal(true);
                  } else {
                    setActiveTab(link);
                  }
                }}
                className={"flex-shrink-0 text-center lg:text-left px-5 py-3 md:py-4 rounded-[8px] text-[16px] md:text-[24px] font-['Satoshi:Regular',sans-serif] transition-all relative flex flex-col lg:flex-row items-center justify-center lg:justify-start " + (
                  activeTab === link
                    ? "text-black bg-[#f2f2f2] lg:bg-transparent"
                    : "text-[#B2B2B2] hover:text-[#1a1a1a] hover:bg-[#f9f9f9]"
                )}
              >
                {activeTab === link && (
                  <div className="absolute left-0 w-[4px] h-[34px] bg-black rounded-full hidden lg:block" />
                )}
                {link}
              </button>
            ))}
          </div>
          {/* Content */}
          <div className="flex-1 w-full bg-white rounded-[16px] p-5 md:p-10 shadow-sm flex flex-col gap-6 md:gap-10">
            {/* My Profile Tab (Combined Info & Addresses) */}
            {activeTab === "My profile" && (
              <div className="flex flex-col w-full">
                <h2 className="text-[#1A1A1A] text-[20px] font-['Satoshi:Medium',sans-serif] pb-5 border-b border-[#E5E5E5] w-full">
                  My Profile
                </h2>

                {/* Info Block */}
                <div className="flex flex-col gap-4 py-8 border-b border-[#E5E5E5] w-full">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-[#1A1A1A] text-[30px] font-['Satoshi:Bold',sans-serif]">{user.name}</h3>
                    <button onClick={() => setEditingProfile(true)} className="flex items-center gap-2 text-[#808080] text-[14px] bg-[#f9f9f9] px-4 py-2 rounded-[8px] hover:bg-[#eee] transition-colors">
                      Edit <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 text-[#808080] text-[16px] font-['Satoshi:Regular',sans-serif] mt-2">
                    <span className="flex items-center gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      {user.phone || "+971 4 XXX XXXXX"}
                    </span>
                    <span className="flex items-center gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      {user.email}
                    </span>
                  </div>
                </div>

                {/* Addresses Section */}
                <div className="flex flex-col py-6 w-full gap-6">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="text-[#808080] text-[20px] font-['Satoshi:Medium',sans-serif]">Addresses</h2>
                    <button onClick={() => setShowAddressForm(true)} className="flex items-center gap-2 text-[#808080] text-[14px] bg-[#f9f9f9] px-4 py-2 rounded-[8px] hover:bg-[#eee] transition-colors">
                      Add <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </button>
                  </div>

                  {/* Address Form inline for UX */}
                  {showAddressForm && (
                     <div className="bg-[#f9f9f9] rounded-[16px] p-6 flex flex-col gap-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <input
                           placeholder="Address Line 1"
                           value={addressForm.address_line1}
                           onChange={(e) => setAddressForm({ ...addressForm, address_line1: e.target.value })}
                           className="h-[50px] bg-white rounded-[12px] px-4 text-[16px] outline-none border border-black/5"
                         />
                         <input
                           placeholder="Address Line 2"
                           value={addressForm.address_line2}
                           onChange={(e) => setAddressForm({ ...addressForm, address_line2: e.target.value })}
                           className="h-[50px] bg-white rounded-[12px] px-4 text-[16px] outline-none border border-black/5"
                         />
                         <input
                           placeholder="City"
                           value={addressForm.city}
                           onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                           className="h-[50px] bg-white rounded-[12px] px-4 text-[16px] outline-none border border-black/5"
                         />
                         <input
                           placeholder="State"
                           value={addressForm.state}
                           onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                           className="h-[50px] bg-white rounded-[12px] px-4 text-[16px] outline-none border border-black/5"
                         />
                         <input
                           placeholder="Country"
                           value={addressForm.country}
                           onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                           className="h-[50px] bg-white rounded-[12px] px-4 text-[16px] outline-none border border-black/5"
                         />
                         <input
                           placeholder="Postal Code"
                           value={addressForm.postal_code}
                           onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })}
                           className="h-[50px] bg-white rounded-[12px] px-4 text-[16px] outline-none border border-black/5"
                         />
                       </div>
                       <div className="flex gap-3">
                         <button onClick={handleAddAddress} className="px-6 py-2 rounded-[12px] bg-[#1A1A1A] text-white text-[16px] font-['Satoshi:Medium',sans-serif]">Save Address</button>
                         <button onClick={() => setShowAddressForm(false)} className="px-6 py-2 rounded-[12px] bg-[#f2f2f2] text-[#666] text-[16px] font-['Satoshi:Medium',sans-serif]">Cancel</button>
                       </div>
                     </div>
                  )}

                  {/* List of addresses */}
                  <div className="flex flex-col gap-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="bg-[#F5F5F5] rounded-[12px] p-6 flex flex-col relative w-full group">
                         {addr.is_default && (
                           <span className="absolute top-6 right-6 bg-white px-3 py-1 rounded-[8px] text-[12px] text-[#A0A0A0] font-['Satoshi:Medium',sans-serif]">Default</span>
                         )}
                         <p className="text-[#4D4D4D] text-[18px] font-['Satoshi:Medium',sans-serif] mb-1">
                           Serene Williams
                         </p>
                         <p className="text-[#4D4D4D] text-[16px] font-['Satoshi:Regular',sans-serif] max-w-[80%]">
                           {addr.address_line1} {addr.address_line2 && `, ${addr.address_line2}`}, {addr.city}, {addr.state && `${addr.state}, `}{addr.country}, {addr.postal_code}
                         </p>
                         <p className="text-[#4D4D4D] text-[16px] font-['Satoshi:Regular',sans-serif] mt-1">
                           {user.phone || "+1 416-555-7832"}
                         </p>
                         <button onClick={() => handleDeleteAddress(addr.id)} className="absolute bottom-6 right-6 text-[#dc2626] text-[14px] font-['Satoshi:Medium',sans-serif] opacity-0 group-hover:opacity-100 transition-opacity">
                           Delete
                         </button>
                      </div>
                    ))}
                    {addresses.length === 0 && !showAddressForm && (
                      <p className="text-[#999] text-[16px] font-['Satoshi:Regular',sans-serif]">No addresses defined yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* My Orders Tab */}
            {activeTab === "My Orders" && (
              <div className="flex flex-col w-full">
                <h2 className="text-[#1A1A1A] text-[20px] font-['Satoshi:Medium',sans-serif] pb-5 border-b border-[#E5E5E5] w-full">My Orders</h2>
                <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center bg-[#f2f2f2] rounded-[16px] mt-6">
                  <img src="/empty-cart.svg" alt="Empty orders" className="w-[120px] h-auto object-contain mx-auto mb-4" />
                  <p className="text-[#1a1a1a] text-[20px] font-['Satoshi:Medium',sans-serif]">No orders yet</p>
                </div>
              </div>
            )}

            {/* Shipping & Return policy Tab */}
            {activeTab === "Shipping & Return policy" && (
              <div className="flex flex-col w-full">
                <h2 className="text-[#1A1A1A] text-[24px] font-['Satoshi:Medium',sans-serif] pb-6 border-b border-[#E5E5E5] w-full">Shipping & Return policy</h2>
                
                <div className="flex flex-col gap-4 py-8 border-b border-[#E5E5E5]">
                  <h3 className="text-[#4D4D4D] text-[18px] font-['Satoshi:Medium',sans-serif] mb-1">Shipping</h3>
                  <ul className="list-disc pl-5 flex flex-col gap-3 text-[#4D4D4D] text-[16px] font-['Satoshi:Regular',sans-serif] marker:text-[#666]">
                    <li>Orders are processed within 1—3 business days, with delivery in 3—7 days (domestic) and 7—14 days (international)</li>
                    <li>A tracking link is shared once your order is shipped</li>
                    <li>Customs duties or import taxes (if applicable) are the customer's responsibility</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 py-8">
                  <h3 className="text-[#4D4D4D] text-[18px] font-['Satoshi:Medium',sans-serif] mb-1">Returns & Refunds</h3>
                  <ul className="list-disc pl-5 flex flex-col gap-3 text-[#4D4D4D] text-[16px] font-['Satoshi:Regular',sans-serif] marker:text-[#666]">
                    <li>Returns are accepted within 7 days of delivery for items that are unused, unopened, and in original packaging</li>
                    <li>Due to hygiene standards, opened or used products are not eligible for return</li>
                    <li>Refunds are processed within 5—10 business days after inspection.</li>
                    <li>Return shipping costs are borne by the customer unless the product is defective or incorrect.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Help Tab */}
            {activeTab === "Help" && (
              <div className="flex flex-col w-full">
                <h2 className="text-[#1A1A1A] text-[24px] font-['Satoshi:Medium',sans-serif] pb-6 border-b border-[#E5E5E5] w-full">Help</h2>
                
                <div className="flex flex-col md:flex-row gap-4 py-8 border-b border-[#E5E5E5]">
                   <div className="flex-1 bg-[#f4f4f4] rounded-[16px] p-6 flex flex-col items-start min-h-[140px]">
                     <svg className="mb-auto" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line></svg>
                     <div className="flex flex-col mt-4">
                       <h4 className="text-[#1a1a1a] text-[16px] font-['Satoshi:Bold',sans-serif] leading-tight">Chat to Support</h4>
                       <p className="text-[#666] text-[14px] font-['Satoshi:Regular',sans-serif] mb-1">We're here to help</p>
                       <a href="mailto:Support@lvpatch.com" className="text-[#1a1a1a] text-[15px] font-['Satoshi:Medium',sans-serif] underline decoration-1 underline-offset-2">Support@lvpatch.com</a>
                     </div>
                   </div>
                   <div className="flex-1 bg-[#f4f4f4] rounded-[16px] p-6 flex flex-col items-start min-h-[140px]">
                     <svg className="mb-auto" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                     <div className="flex flex-col mt-4">
                       <h4 className="text-[#1a1a1a] text-[16px] font-['Satoshi:Bold',sans-serif] leading-tight">Call Us</h4>
                       <p className="text-[#666] text-[14px] font-['Satoshi:Regular',sans-serif] mb-1">Mon-Fri from 8am- 5pm</p>
                       <a href="tel:+15550000000" className="text-[#1a1a1a] text-[15px] font-['Satoshi:Medium',sans-serif] underline decoration-1 underline-offset-2">+1 (555) 000 0000</a>
                     </div>
                   </div>
                </div>

                <div className="flex flex-col w-full py-6">
                  <h3 className="text-[#1a1a1a] text-[20px] font-['Satoshi:Regular',sans-serif] mb-5">FAQ's</h3>
                  <div className="flex flex-col gap-3">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className={`border rounded-[10px] overflow-hidden transition-all duration-200 ` + (openFaq === idx ? 'border-[#E5E5E5] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'border-transparent bg-[#f4f4f4]')}>
                        <button 
                          onClick={() => setOpenFaq(openFaq === idx ? null : idx)} 
                          className="w-full flex items-center justify-between p-5 text-left transition-colors"
                        >
                          <span className="text-[#1a1a1a] text-[15px] font-['Satoshi:Bold',sans-serif] pr-4 leading-snug">
                            {faq.question}
                          </span>
                          <svg className={`transform transition-transform shrink-0 ` + (openFaq === idx ? "rotate-180" : "")} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                        {openFaq === idx && (
                          <div className="px-5 pb-5 pt-1 text-[#4D4D4D] text-[15px] font-['Satoshi:Regular',sans-serif] leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <SocialsSection />
        <NewsletterSection />
        <Footer />
      </div>

      {/* Edit Profile Pop-up Modal */}
      {editingProfile && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#333333]/95 backdrop-blur-md w-full max-w-[500px] rounded-[16px] p-8 flex flex-col relative shadow-2xl">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-white text-[24px] font-['Satoshi:Medium',sans-serif]">Edit Profile</h2>
               <button onClick={() => setEditingProfile(false)} className="text-white/60 hover:text-white p-2">✕</button>
             </div>

             <div className="flex flex-col gap-5">
               <input
                 placeholder="First Name"
                 value={profileForm.first_name}
                 onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                 className="w-full h-[52px] bg-white rounded-[12px] px-4 text-[16px] font-['Satoshi:Regular',sans-serif] text-black outline-none placeholder:text-[#A0A0A0]"
               />
               <input
                 placeholder="Last Name"
                 value={profileForm.last_name}
                 onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                 className="w-full h-[52px] bg-white rounded-[12px] px-4 text-[16px] font-['Satoshi:Regular',sans-serif] text-black outline-none placeholder:text-[#A0A0A0]"
               />
               <input
                 placeholder="Phone Number"
                 value={profileForm.phone}
                 onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                 className="w-full h-[52px] bg-white rounded-[12px] px-4 text-[16px] font-['Satoshi:Regular',sans-serif] text-black outline-none placeholder:text-[#A0A0A0]"
               />
             </div>

             <button
               onClick={handleSaveProfile}
               className="mt-8 w-full h-[52px] bg-white text-black rounded-[12px] text-[18px] font-['Satoshi:Bold',sans-serif] hover:bg-gray-200 transition-colors"
             >
               Save Details
             </button>
          </div>
        </div>
      )}

      {/* Logout Pop-up Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[484px] h-[219px] bg-[#555555] rounded-[26px] p-6 flex flex-col relative shadow-2xl">
            <h2 className="text-white text-[20px] font-['Satoshi:Medium',sans-serif] mb-4">Logout</h2>
            <div className="w-full h-[1px] bg-white/10 absolute left-0 top-[60px]" />
            <p className="text-[#EAEAEA] text-[16px] font-['Satoshi:Regular',sans-serif] mt-3">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-between items-center w-full gap-4 mt-auto">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 h-[52px] bg-[#3B3B3B] hover:bg-[#2A2A2A] text-white rounded-[16px] text-[16px] font-['Satoshi:Medium',sans-serif] transition-colors"
              >
                No, Stay logged In
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="flex-1 h-[52px] bg-[#3B3B3B] hover:bg-[#2A2A2A] text-white rounded-[16px] text-[16px] font-['Satoshi:Medium',sans-serif] transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


