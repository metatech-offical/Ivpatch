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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const newUser = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (newUser) {
        router.push("/profile");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      if (message.includes("already registered")) {
        setError("This email is already registered. Please sign in instead.");
      } else {
        setError(message);
      }
      setLoading(false);
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
                  disabled={loading}
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                  required
                  disabled={loading}
                />
              </div>

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                required
                disabled={loading}
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                required
                disabled={loading}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min. 8 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 pr-12 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                    required
                    minLength={8}
                    disabled={loading}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-[#999999] hover:text-[#1a1a1a] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPassword ? (
                         <>
                           <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                           <line x1="1" y1="1" x2="23" y2="23"></line>
                         </>
                      ) : (
                         <>
                           <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                           <circle cx="12" cy="12" r="3"></circle>
                         </>
                      )}
                    </svg>
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 pr-12 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                    required
                    disabled={loading}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-[#999999] hover:text-[#1a1a1a] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showConfirmPassword ? (
                         <>
                           <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                           <line x1="1" y1="1" x2="23" y2="23"></line>
                         </>
                      ) : (
                         <>
                           <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                           <circle cx="12" cy="12" r="3"></circle>
                         </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-[#B12422] text-[14px] font-['Satoshi:Regular',sans-serif]">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[60px] bg-[#1A1A1A] text-white rounded-[12px] text-[20px] font-['Satoshi:Regular',sans-serif] hover:bg-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating account…
                  </div>
                ) : (
                  "Create Account"
                )}
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
