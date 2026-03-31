"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import SocialsSection from "@/components/sections/SocialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser) {
        if (loggedInUser.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/profile");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f2f2f2] min-h-screen p-[20px] md:p-[22px]">
      <div className="max-w-[1252px] mx-auto flex flex-col gap-10 items-center">
        <Navbar />

        <div className="w-full flex justify-center py-[30px] md:py-[60px]">
          <div className="w-full max-w-[500px] bg-white rounded-[24px] p-10 shadow-sm">
            <h1 className="text-[#1a1a1a] text-[42px] font-['Satoshi:Medium',sans-serif] mb-2 leading-tight">Welcome Back</h1>
            <p className="text-[#808080] text-[20px] font-['Satoshi:Regular',sans-serif] mb-8">Sign in to your IVPATCH account</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                  required
                  disabled={loading}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[60px] bg-[#f2f2f2] rounded-[12px] px-6 text-[20px] font-['Satoshi:Regular',sans-serif] text-black placeholder-[#999999] outline-none border border-transparent focus:border-black/10 transition-all"
                  required
                  disabled={loading}
                />
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
                    Signing in…
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="flex items-center justify-between text-[14px] font-['Satoshi:Regular',sans-serif]">
                <span className="text-[#999999]">Don&apos;t have an account?</span>
                <Link href="/register" className="text-[#1a1a1a] cursor-pointer hover:underline font-medium">Create One</Link>
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
