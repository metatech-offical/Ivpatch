"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import SocialsSection from "@/components/sections/SocialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      });
      router.push("/profile");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <main className="bg-[#f2f2f2] min-h-screen p-[20px] md:p-[22px]">
      <div className="max-w-[1252px] mx-auto flex flex-col gap-10 items-center">
        <Navbar />

        <div className="w-full flex justify-center py-[10px] md:py-[40px]">
          <div className="w-full max-w-[600px] bg-white rounded-[24px] p-10 shadow-sm">
            <h1 className="text-[#1a1a1a] text-[42px] font-['Satoshi:Medium',sans-serif] mb-2 leading-tight">Create Account</h1>
            <p className="text-[#808080] text-[20px] font-['Satoshi:Regular',sans-serif] mb-8">Join the IVPATCH community today</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                  required
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                  required
                />
              </div>

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                  required
                />
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                  required
                />
              </div>

              {error && (
                <p className="text-[#B12422] text-[14px] font-['Satoshi:Regular',sans-serif]">{error}</p>
              )}

              <button
                type="submit"
                className="w-full h-[60px] bg-[#1A1A1A] text-white rounded-[12px] text-[20px] font-['Satoshi:Regular',sans-serif] hover:bg-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center"
              >
                Create Account
              </button>

              <div className="flex items-center justify-between text-[14px] font-['Satoshi:Regular',sans-serif]">
                <span className="text-[#999999]">Already have an account?</span>
                <Link href="/login" className="text-[#1a1a1a] cursor-pointer hover:underline font-medium">Sign In</Link>
              </div>
            </form>
          </div>
        </div>

        <SocialsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  );
}
