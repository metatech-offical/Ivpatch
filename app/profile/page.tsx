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
  const [activeTab, setActiveTab] = useState("My Orders");
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
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
      const [firstName, ...lastParts] = user.name.split(" ");
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
      await supabase
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
      await supabase.from("user_addresses").insert({
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
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sidebarLinks = [
    "My profile",
    "My Orders",
    "My Addresses",
    "Shipping & Return policy",
    "Help",
    "Logout"
  ];

  return (
    <main className="bg-[#f2f2f2] min-h-screen p-[20px] md:p-[22px]">
      <div className="max-w-[1252px] mx-auto flex flex-col gap-10 items-center">
        <Navbar />

        {/* Profile Header Banner */}
        <div className="w-full h-[225px] bg-[#9FB0A5] rounded-[16px] flex items-center px-6 md:px-12 relative overflow-hidden">
           <div className="flex items-center gap-4 md:gap-8 z-10">
              <div className="w-[80px] md:w-[155px] h-[80px] md:h-[155px] bg-white/30 rounded-full flex items-center justify-center text-white text-[32px] md:text-[64px] font-['Satoshi:Medium',sans-serif] border-[4px] md:border-[6px] border-white/40 shrink-0">
                {initials}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-[24px] md:text-[42px] font-['Satoshi:Medium',sans-serif]">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-3 md:gap-6 text-white/90 text-[14px] md:text-[20px] font-['Satoshi:Regular',sans-serif]">
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
                className={`w-full text-left px-4 py-4 rounded-[8px] text-[20px] md:text-[24px] font-['Satoshi:Regular',sans-serif] transition-all relative flex items-center ${
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

          {/* Content */}
          <div className="flex-1 bg-white rounded-[16px] p-6 md:p-10 shadow-sm flex flex-col gap-10">
            
            {/* My Profile Tab */}
            {activeTab === "My profile" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[#1A1A1A] text-[30px] font-['Satoshi:Medium',sans-serif]">My Profile</h2>
                  <button
                    onClick={() => editingProfile ? handleSaveProfile() : setEditingProfile(true)}
                    className="px-6 py-2 rounded-[12px] text-[16px] font-['Satoshi:Medium',sans-serif] transition-all"
                    style={{ background: editingProfile ? "#1A1A1A" : "#f2f2f2", color: editingProfile ? "white" : "#1A1A1A" }}
                  >
                    {editingProfile ? "Save" : "Edit"}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#808080] text-[14px] font-['Satoshi:Regular',sans-serif] mb-1 block">First Name</label>
                    <input
                      value={profileForm.first_name}
                      onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                      disabled={!editingProfile}
                      className="w-full h-[50px] bg-[#f2f2f2] rounded-[12px] px-4 text-[18px] font-['Satoshi:Regular',sans-serif] text-black outline-none disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="text-[#808080] text-[14px] font-['Satoshi:Regular',sans-serif] mb-1 block">Last Name</label>
                    <input
                      value={profileForm.last_name}
                      onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                      disabled={!editingProfile}
                      className="w-full h-[50px] bg-[#f2f2f2] rounded-[12px] px-4 text-[18px] font-['Satoshi:Regular',sans-serif] text-black outline-none disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="text-[#808080] text-[14px] font-['Satoshi:Regular',sans-serif] mb-1 block">Phone</label>
                    <input
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      disabled={!editingProfile}
                      className="w-full h-[50px] bg-[#f2f2f2] rounded-[12px] px-4 text-[18px] font-['Satoshi:Regular',sans-serif] text-black outline-none disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="text-[#808080] text-[14px] font-['Satoshi:Regular',sans-serif] mb-1 block">Email</label>
                    <input
                      value={user.email}
                      disabled
                      className="w-full h-[50px] bg-[#f2f2f2] rounded-[12px] px-4 text-[18px] font-['Satoshi:Regular',sans-serif] text-black outline-none opacity-60"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* My Orders Tab */}
            {activeTab === "My Orders" && (
              <div className="flex flex-col gap-6">
                <h2 className="text-[#1A1A1A] text-[30px] font-['Satoshi:Medium',sans-serif]">My Orders</h2>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
                    <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <p className="mt-4 text-[#999] text-[20px] font-['Satoshi:Medium',sans-serif]">No orders yet</p>
                  <p className="text-[#bbb] text-[16px] font-['Satoshi:Regular',sans-serif] mt-2">Your order history will appear here</p>
                </div>
              </div>
            )}

            {/* My Addresses Tab */}
            {activeTab === "My Addresses" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[#1A1A1A] text-[30px] font-['Satoshi:Medium',sans-serif]">My Addresses</h2>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="px-6 py-2 rounded-[12px] bg-[#1A1A1A] text-white text-[16px] font-['Satoshi:Medium',sans-serif]"
                  >
                    + Add Address
                  </button>
                </div>

                {/* Add Address Form */}
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
                      <button
                        onClick={handleAddAddress}
                        className="px-6 py-2 rounded-[12px] bg-[#1A1A1A] text-white text-[16px] font-['Satoshi:Medium',sans-serif]"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-6 py-2 rounded-[12px] bg-[#f2f2f2] text-[#666] text-[16px] font-['Satoshi:Medium',sans-serif]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Address List */}
                <div className="flex flex-col gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="bg-[#f9f9f9] rounded-[12px] p-5 flex items-start justify-between">
                      <div>
                        <p className="text-[#1a1a1a] text-[18px] font-['Satoshi:Medium',sans-serif]">
                          {addr.address_line1}
                          {addr.address_line2 && `, ${addr.address_line2}`}
                        </p>
                        <p className="text-[#808080] text-[16px] font-['Satoshi:Regular',sans-serif] mt-1">
                          {addr.city}, {addr.state && `${addr.state}, `}{addr.country} {addr.postal_code}
                        </p>
                        {addr.is_default && (
                          <span className="inline-block mt-2 px-3 py-1 bg-black/5 rounded-full text-[12px] text-[#666] font-['Satoshi:Medium',sans-serif]">
                            Default
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-[#dc2626] text-[14px] font-['Satoshi:Medium',sans-serif] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {addresses.length === 0 && !showAddressForm && (
                    <p className="text-center text-[#999] text-[18px] py-10 font-['Satoshi:Regular',sans-serif]">
                      No addresses saved yet
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Other tabs */}
            {(activeTab === "Shipping & Return policy" || activeTab === "Help") && (
              <div className="flex flex-col gap-4">
                <h2 className="text-[#1A1A1A] text-[30px] font-['Satoshi:Medium',sans-serif]">{activeTab}</h2>
                <p className="text-[#808080] text-[18px] font-['Satoshi:Regular',sans-serif]">
                  Content coming soon.
                </p>
              </div>
            )}
          </div>
        </div>

        <SocialsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  );
}
